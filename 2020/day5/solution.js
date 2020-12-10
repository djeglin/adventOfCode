export default class Solution {
  constructor(data) {
    this.data = data.split('\n')
    this.rows = Array.from({ length: 128 }, (v, i) => i)
    this.seats = Array.from({ length: 8 }, (v, i) => i)
    this.actions = new Map([
      ['F', 0],
      ['B', 1],
      ['L', 0],
      ['R', 1],
    ])
  }

  start() {
    const seatIds = this.data.map((pass) => this.getSeatId(pass)).sort()
    console.log(seatIds)
    return seatIds.pop()
  }

  find(mode, pass) {
    const str =
      mode === 'row' ? pass.slice(0, 7).split('') : pass.slice(-3).split('')
    if (!str.length) return false
    const possibles = mode === 'row' ? [...this.rows] : [...this.seats]
    console.log(str)
    return str.reduce(
      (output, input) => {
        // console.log(output)
        const segment = [
          output.slice(0, output.length / 2),
          output.slice(output.length / 2),
        ][this.actions.get(input)]
        const out = segment.length === 1 ? segment[0] : segment
        console.log(out)
        return out
      },
      [...possibles]
    )
  }

  getSeatId(pass) {
    const row = this.find('row', pass)
    const seat = this.find('seat', pass)
    return Number(row) * 8 + Number(seat)
  }
}
