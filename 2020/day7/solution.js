export default class Solution {
  constructor(data) {
    this.data = data.split('\n')
    this.targetColor = 'shiny gold'
  }

  start() {
    // part 1
    // const containers = this.findContainers(this.data)
    // return containers.size

    // part 2
    const contents = this.findContents(this.data)
    const total = this.countContents(contents, this.targetColor)
    return total
  }

  findContainers(data) {
    let containers = []
    let x = -1
    while (x === -1 || x < containers.length) {
      const target = x === -1 ? this.targetColor : containers[x]
      const candidates = data.filter((item) => item.indexOf(target) > 0)
      containers = containers.concat(
        candidates.map((item) => item.split(' bags ')[0])
      )
      console.log(JSON.stringify(containers))
      x++
    }
    return new Set(containers)
  }

  findContents(data) {
    const obj = {}
    let color = this.targetColor
    let x = 0
    obj[color] = this.getChildren(color)
    while (x === 0 || x < Object.keys(obj).length) {
      const topColor = obj[Object.keys(obj)[x]]
      Object.keys(topColor).forEach((col) => {
        obj[col] = this.getChildren(col)
      })
      x++
    }
    console.log(obj)
    return obj
  }

  getChildren(color) {
    const rule = this.data.find((item) => item.indexOf(color) === 0)
    const segments = rule.split(' contain ')
    const obj = {}
    const innerBags = segments[1].replace('.', '').split(', ')
    innerBags.forEach((entry) => {
      const matches = /(\d)\s([\s\w]+)\sbag/g.exec(entry)
      if (matches === null) return
      obj[matches[2]] = Number(matches[1])
    })
    return obj
  }

  countContents(contents, color) {
    let total = 0
    const childColors = Object.keys(contents[color])
    childColors.forEach((col) => {
      const count = this.countContents(contents, col)
      const num =
        count === 0
          ? contents[color][col]
          : count * contents[color][col] + contents[color][col]
      total += num
    })
    return total
  }
}
