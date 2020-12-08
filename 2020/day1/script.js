import Solution from './solution'

new (class Setup {
  constructor() {
    this.input = document.getElementById('input')
    this.startButton = document.getElementById('start')
    this.output = document.getElementById('output')

    this.startButton.addEventListener('click', () => this.start())
  }

  start() {
    this.solution = new Solution(this.input.value)
    const result = this.solution.processData({ numbers: 3, target: 2020 })
    this.output.innerHTML = result
  }
})()
