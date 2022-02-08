import * as fs from "fs"
import * as glob from "glob"
import { parse } from "@babel/parser"
import traverse from "@babel/traverse"

const files = glob.sync("../flash-cards/src/components/**/*.js")

const propsAndValues: Record<string, string[]> = {}

files.forEach((file) => {
  const contents = fs.readFileSync(file).toString()

  // console.log(contents)

  const ast = parse(contents, { sourceType: "module", plugins: ["jsx"] })

  traverse(ast, {
    JSXOpeningElement({ node }) {
      if (node.name.type === "JSXIdentifier" && node.name.name === "button") {
        // console.log(node)

        const hasButtonClassName = node.attributes.find(
          (attribute) =>
            attribute.type === "JSXAttribute" &&
            attribute.name.type === "JSXIdentifier" &&
            attribute.name.name === "className" &&
            attribute.value?.type === "StringLiteral" &&
            attribute.value.value.split(" ").includes("button")
        )

        if (!hasButtonClassName) return

        node.attributes.forEach((attribute) => {
          if (
            attribute.type === "JSXAttribute" &&
            attribute.name.type == "JSXIdentifier"
          ) {
            const propName = attribute.name.name

            if (attribute.value === null) return

            let value
            if (attribute.value.type === "StringLiteral") {
              value = attribute.value.value
            } else {
              value = attribute.value.type
            }

            if (propsAndValues[propName]) {
              propsAndValues[propName].push(value)
            } else {
              propsAndValues[propName] = [value]
            }
          }
        })
      }
    },
  })
})

for (let propName in propsAndValues) {
  console.group()
  console.log(`${propName} (${propsAndValues[propName].length})`)

  console.group()

  for (let value in propsAndValues[propName].sort()) {
    console.log(propsAndValues[propName][value])
  }

  console.groupEnd()

  console.groupEnd()
}
