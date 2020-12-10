export default class Solution {
  constructor(data) {
    this.data = data.split('\n\n').map((group) => group.split('\n'))
  }

  start() {
    const data = [...this.data]
    // const groupTotals = data.map((group) => this.getDeduped(group))
    const commonAnswers = data.map((group) => this.getCommonAnswers(group))
    // console.log(commonAnswers.length)
    return this.getSum(commonAnswers)
  }

  getDeduped(group) {
    let answersArr = []
    group.forEach(
      (person) => (answersArr = answersArr.concat(person.split('')))
    )
    const deduped = new Set(answersArr)
    return deduped.size
  }

  getCommonAnswers(group) {
    // console.log(group)
    if (group.length === 1) return group[0].split('').length
    const groupAnswers = new Map()
    group.forEach((person) => {
      const answers = person.split('')
      answers.forEach((answer) => {
        const current = groupAnswers.has(answer) ? groupAnswers.get(answer) : 0
        groupAnswers.set(answer, current + 1)
      })
    })
    // console.log(groupAnswers.entries())
    let commonAnswers = 0
    groupAnswers.forEach((num, key) => num === group.length && commonAnswers++)
    // console.log(commonAnswers)
    return commonAnswers
  }

  getSum(nums) {
    return nums.reduce((a, b) => a + b)
  }
}
