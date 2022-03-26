export function secondsToTime(seconds) {
  let time = new Date(1000 * seconds).toISOString().substr(11, 8)
  return time
}

export function percentOf(a, b) {
  // if (b == 0) return '100%'
  if (a == 0 || b == 0) return "0%"

  let p = Math.round((a / b) * 100)
  return p + "%"
}

export function difficultyAdjuster(d) {
  return d == 0 ? 0.8 : d == 1 ? 1 : 1.2
}
