export default class Solution {
  constructor(data) {
    this.data = data.split('\n')
    this.accumilator = 0
    this.current = 0
    this.executed = []
    this.changedIndexes = []
  }

  start() {
    // part 1
    // return this.findLoopValue()
    // part 2
    return this.fixProgram()
  }

  fixProgram() {
    while (this.current < this.data.length) {
      this.accumilator = 0
      this.current = 0
      this.executed = []
      this.findLoopValue(true)
    }
    return this.accumilator
  }

  findLoopValue(changeInstructions) {
    const data = [...this.data]
    let changed = false
    while (!this.executed.includes(this.current)) {
      if (!data[this.current]) break
      const instruction = this.parseInstruction(data[this.current])
      if (
        changeInstructions &&
        !changed &&
        !this.changedIndexes.includes(this.current) &&
        (instruction.operation === 'jmp' || instruction.operation === 'nop')
      ) {
        instruction.operation = instruction.operation === 'jmp' ? 'nop' : 'jmp'
        this.changedIndexes.push(this.current)
        changed = true
      }
      this.executed.push(this.current)
      this[instruction.operation](instruction.argument)
    }
    return this.accumilator
  }

  parseInstruction(line) {
    const [operation, argument] = line.split(' ')
    return { operation, argument: Number(argument) }
  }

  acc(arg) {
    this.accumilator += arg
    this.current++
  }

  jmp(arg) {
    this.current += arg
  }

  nop(arg) {
    this.current++
  }
}
