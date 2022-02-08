import * as fs from "fs"
import * as glob from "glob"
import * as path from "path"
import * as types from "@babel/types"
import generate from "@babel/generator"
import { parse } from "@babel/parser"
import traverse from "@babel/traverse"
import * as prettier from "prettier"

const files = glob.sync("../flash-cards/src/components/**/*.js")

files.forEach((file) => {
  const contents = fs.readFileSync(file).toString()

  // console.log(contents)

  const ast = parse(contents, { sourceType: "module", plugins: ["jsx"] })

  let fileContainsButton = false

  traverse(ast, {
    JSXElement({ node }) {
      const { openingElement, closingElement } = node

      if (
        openingElement.name.type === "JSXIdentifier" &&
        openingElement.name.name === "button"
      ) {
        // console.log(node)

        const hasButtonClassName = openingElement.attributes.find(
          (attribute) =>
            attribute.type === "JSXAttribute" &&
            attribute.name.type === "JSXIdentifier" &&
            attribute.name.name === "className" &&
            attribute.value?.type === "StringLiteral" &&
            attribute.value.value.split(" ").includes("button")
        )

        if (!hasButtonClassName) return

        fileContainsButton = true

        const newProps: types.JSXAttribute[] = []
        openingElement.attributes.forEach((attribute) => {
          if (
            attribute.type === "JSXAttribute" &&
            attribute.name.type === "JSXIdentifier"
          ) {
            switch (attribute.name.name) {
              case "type":
                if (
                  attribute?.value?.type !== "StringLiteral" ||
                  attribute.value.value !== "button"
                ) {
                  newProps.push(attribute)
                }
                break
              case "className":
                if (attribute?.value?.type === "StringLiteral") {
                  const classNames = attribute.value.value.split(" ")

                  const variant = classNames
                    .find(
                      (className) =>
                        className.startsWith("button--") &&
                        className !== "button--block"
                    )
                    ?.replace("button--", "")

                  if (variant && variant !== "primary") {
                    newProps.push(
                      types.jsxAttribute(
                        types.jsxIdentifier("variant"),
                        types.stringLiteral(variant)
                      )
                    )
                  }

                  if (classNames.includes("button--block")) {
                    newProps.push(
                      types.jsxAttribute(types.jsxIdentifier("block"))
                    )
                  }
                  break
                }
              case "onClick":
                newProps.push(attribute)
                break
            }
          }
        })

        // uppercase to a React component
        openingElement.name.name = "Button"

        openingElement.attributes = newProps

        if (closingElement?.name?.type === "JSXIdentifier") {
          closingElement.name.name = "Button"
        }
      }
    },
  })

  // add the import statement
  if (fileContainsButton) {
    const relativePathToButtonComponent = path.relative(
      path.dirname(file),
      "../flash-cards/src/components/Button/Button.js"
    )

    const buttonComponentImport = types.importDeclaration(
      [
        types.importSpecifier(
          types.identifier("Button"),
          types.identifier("Button")
        ),
      ],
      types.stringLiteral(relativePathToButtonComponent)
    )

    ast.program.body.unshift(buttonComponentImport)
  }

  // from ast to code
  const { code } = generate(ast)

  const formattedCode = prettier.format(code, { filepath: file })

  fs.writeFileSync(file, formattedCode)
})
