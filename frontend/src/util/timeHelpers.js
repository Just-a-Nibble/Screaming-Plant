
export function currentTime() {
  return milliseconds(Date.now())
}

export function milliseconds(milliseconds) {
  return milliseconds
}

export function seconds(seconds) {
  return milliseconds(seconds * 1000)
}
