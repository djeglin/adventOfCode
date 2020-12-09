export default class Solution {
  constructor(data) {
    this.data = data
      .split('\n')
      .map((row) => row.replace(':', '').trim().split(' '))
  }

  start() {
    const validPasswords = this.checkPasswords('new')
    return validPasswords.length
  }

  checkPasswords(version = 'old') {
    return [...this.data].flatMap((row) => {
      const valid =
        version === 'new'
          ? this.validatePasswordNew(row)
          : this.validatePasswordOld(row)
      return valid || []
    })
  }

  validatePasswordNew(row) {
    if (row.length < 3) return false
    const [rule, character, password] = row
    const [posA, posB] = rule.split('-').map((val) => Number(val) - 1)
    const charA = password.charAt(posA)
    const charB = password.charAt(posB)
    const isValid =
      !(charA === charB) && (charA === character || charB === character)
    console.log(rule, character, password, charA, charB, isValid)
    return isValid ? { rule, character, password, isValid } : false
  }

  validatePasswordOld(row) {
    if (row.length < 3) return false
    const [rule, character, password] = row
    const length = password.length
    const [upper, lower] = rule.split('-').map((val) => length - Number(val))
    const replaced = password.replace(new RegExp(character, 'g'), '')
    const isValid = replaced.length >= lower && replaced.length <= upper
    console.log(rule, character, password, replaced, upper, lower, isValid)
    if (!isValid) return false
    return { rule, character, password, replaced, upper, lower, isValid }
  }
}
