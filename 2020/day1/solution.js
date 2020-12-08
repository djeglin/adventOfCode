export default class Solution {
  constructor(data) {
    this.data = data.split('\n').map(Number)
    this.numbers = 0
  }

  processData(opts) {
    const { numbers, target } = opts
    this.numbers = numbers

    const result = this.recurse(0, target, [])
    console.log(result)
    const multiplied = this.getProduct(result)
    return multiplied
  }

  recurse(start, remaining, selection) {
    if (remaining < 0) return false
    if (selection.length > this.numbers) return false
    if (remaining === 0 && selection.length === this.numbers) {
      return selection
    }
    for (let i = start; i < this.data.length; i++) {
      let res = this.recurse(
        i + 1,
        remaining - this.data[i],
        selection.concat(this.data[i])
      )
      if (res) return res
    }
  }

  getProduct(nums) {
    return nums.reduce((a, b) => a * b)
  }
}
