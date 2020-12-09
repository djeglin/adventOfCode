export default class Solution {
  constructor(data) {
    this.data = data.split('\n').map((row) => row.trim().split(''))
  }

  start() {
    const movements = [
      [1, 1],
      [3, 1],
      [5, 1],
      [7, 1],
      [1, 2],
    ]
    const trees = movements.map((movement) => this.traverse(movement))
    console.log(trees)
    return this.getProduct(trees)
  }

  traverse(movement) {
    const [right, down] = movement
    let row = 0
    let col = 0
    let trees = 0
    while (row < this.data.length - 1) {
      console.log('row:', row, 'col:', col, this.data[row])
      if (row + down >= this.data.length) break
      if (col + right >= this.data[row].length) {
        col = right - (this.data[row].length - col)
      } else {
        col = col + right
      }
      row = row + down
      const space = this.data[row][col]
      if (space === '#') trees++
    }
    return trees
  }

  getProduct(nums) {
    return nums.reduce((a, b) => a * b)
  }
}
