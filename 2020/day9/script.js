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
    const result = this.solution.start()
    this.output.innerHTML = result
  }
})()
