export default class Solution {
  constructor(data) {
    this.data = data.split('\n').map((val) => Number(val))
  }

  start() {
    const chain = this.getAdapterChain()
    console.log(chain)
    const singleGaps = this.getGaps(1, chain)
    const tripleGaps = this.getGaps(3, chain)
    return this.getCombos(chain)
  }

  getAdapterChain() {
    return [...this.data].sort((a, b) => a - b)
  }

  getGaps(gap, chain) {
    let gaps = 0
    let prev = 0
    chain.forEach((current) => {
      if (current - prev === gap) {
        gaps++
      }
      prev = current
    })
    if (gap === 3) gaps++
    return gaps
  }

  getCombos(chain) {
    const maxVal = chain[chain.length - 1]
    const expandedChain = [0, ...chain, maxVal + 3]

    let product = 1
    let current = 1
    for (let val of expandedChain) {
      if (chain.includes(val + 1)) {
        current++
      } else {
        product *= this.getTribonacci(currentRun)
        current = 1
      }
    }
    return multiplier
  }

  getTribonacci(num) {
    const sequence = [1, 1, 2, 4, 7, 13, 24, 44, 81, 149]
    if (num > sequence.length) return false
    return sequence[num - 1]
  }

  getProduct(nums) {
    return nums.reduce((a, b) => a * b)
  }
}
