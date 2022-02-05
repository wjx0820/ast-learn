const {parse} = require("@babel/parser")

// const code = "2 + (4 * 10)"
// 修改源代码后，以下ast操作会在runtime报错，因为节点顺序改变导致找不到相应的节点
const code = "(2 + 4) * 10"

const ast = parse(code)

console.log(ast.program.body[0].expression.left.value) // 2
console.log(ast.program.body[0].expression.right.left.value) // 4
console.log(ast.program.body[0].expression.right.right.value) // 10

