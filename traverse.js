const {parse} = require("@babel/parser")
const traverse = require("@babel/traverse").default

// const code = "2 + (4 * 10)"
// 修改源代码后，以下ast操作会在runtime报错，因为节点顺序改变导致找不到相应的节点
// @babel/traverse提供了一种更通用的遍历ast的方式
const code = "(2 + 4) * 10"

const ast = parse(code)

// console.log(ast.program.body[0].expression.left.value) // 2
// console.log(ast.program.body[0].expression.right.left.value) // 4
// console.log(ast.program.body[0].expression.right.right.value) // 10

// traverse(node, {visitor})
traverse(ast, {
  // NumericLiteral(path) {
  //   console.log(path.node.value) // 2 4 10
  // }

  // NumericLiteral: {
  //   enter(path) {
  //     console.log(`Entered ${path.node.value}`)
  //   },
  //   exit(path) {
  //     console.log(`Exited ${path.node.value}`)
  //   }
  // } /**
  // Entered 2
  // Exited 2
  // Entered 4
  // Exited 4
  // Entered 10
  // Exited 10 */
  
  // 提取运算符
  BinaryExpression(path) {
    console.log(path.node.operator) // * +
  }
})