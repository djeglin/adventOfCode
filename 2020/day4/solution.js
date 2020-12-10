export default class Solution {
  constructor(data) {
    this.data = data.split('\n\n').map(
      (row) =>
        new Map(
          row
            .trim()
            .split(/\s/g)
            .map((col) => col.split(':'))
        )
    )
  }

  start() {
    const requiredFields = new Map()
    requiredFields.set(
      'byr',
      (val) => val.length === 4 && Number(val) >= 1920 && Number(val) <= 2002
    )
    requiredFields.set(
      'iyr',
      (val) => val.length === 4 && Number(val) >= 2010 && Number(val) <= 2020
    )
    requiredFields.set(
      'eyr',
      (val) => val.length === 4 && Number(val) >= 2020 && Number(val) <= 2030
    )
    requiredFields.set('hgt', (val) => {
      const isCm = val.endsWith('cm')
      const isIn = val.endsWith('in')
      if (!isCm && !isIn) {
        return false
      }
      const num = Number(val.slice(0, -2))
      return isCm ? num >= 150 && num <= 193 : num >= 59 && num <= 76
    })
    requiredFields.set('hcl', (val) => new RegExp('#[0-9,a-f]{6}').test(val))
    requiredFields.set('ecl', (val) =>
      ['amb', 'blu', 'brn', 'grn', 'gry', 'hzl', 'oth'].includes(val)
    )
    requiredFields.set('pid', (val) => val.length === 9 && !isNaN(Number(val)))
    const validDocuments = this.checkPassports(requiredFields)
    return validDocuments.length || 0
  }

  checkPassports(requiredFields) {
    let data = [...this.data]
    const fields = Array.from(requiredFields.keys())
    data = data.filter((item, index) => {
      const keys = Array.from(item.keys())
      const invalidField = fields.find((field) => {
        if (
          !keys.includes(field) ||
          !requiredFields.get(field)(item.get(field))
        ) {
          return true
        }
      })
      return invalidField ? false : true
    })
    return data
  }
}
