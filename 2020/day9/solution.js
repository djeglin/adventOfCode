export default class Solution {
  constructor(data) {
    this.data = data.split('\n').map((val) => Number(val))
  }

  start() {
    const error = this.findError()
    const sub = this.findSubarrayWithSum(error).sort((a, b) => a - b)
    return this.getSum([sub.shift(), sub.pop()])
  }

  findError() {
    const data = [...this.data]
    let index = 24
    const error = {
      index: 0,
      value: null,
    }
    while (!error.index) {
      index++
      const range = data.slice(index - 25, index)
      const sum = this.findSummers(data[index], range)
      if (!sum) {
        error.index = index
        error.value = this.data[index]
      }
    }
    return error
  }

  findSummers(target, range) {
    const sum = []
    const arr = range.sort((a, b) => a - b)
    let l = 0
    let r = range.length - 1
    while (l < r) {
      if (arr[l] + arr[r] === target) {
        sum[0] = arr[l]
        sum[1] = arr[r]
        break
      } else if (arr[l] + arr[r] < target) {
        l++
      } else {
        r--
      }
    }
    const result = sum.length ? sum : false
    return result
  }

  findSubarrayWithSum(obj) {
    const { index, value } = obj
    const data = [...this.data].slice(0, index)
    let l = 0
    let r = 1
    let sum = 0
    let slice = []
    while (sum !== value) {
      if (!slice.length) {
        slice = data.slice(l, r)
      }
      slice.push(data[r])
      sum = this.getSum(slice)
      if (sum === value) break
      if (sum < value && r < data.length - 1) {
        r++
      } else {
        l++
        r = l + 1
        sum = 0
        slice = []
      }
    }
    return slice
  }

  getSum(nums) {
    return nums.reduce((a, b) => a + b)
  }
}
