export const $ = document.querySelector.bind(document)

export const textSkip = 'Skip (S)'
export const textReset = 'Reset (R)'
export const textStart = 'Start (P)'
export const textPause = 'Pause (P)'
export const focusDuration = 25 * 60
export const restDuration = 5 * 60

export const padNum = (num, digits = 2) => {
  const zeroes = '0'.repeat(digits)
  let result = zeroes + num
  result = result.slice(-digits)
  return result
}

export const playAudioFromStart = (audio) => {
  if (!audio.paused) {
    audio.pause()
  }
  audio.currentTime = 0
  audio.play()
}

export const toOffsetSeconds = (totalSeconds) => totalSeconds % 60
export const toOffsetMinutes = (totalSeconds) => Math.floor(totalSeconds / 60) % 60

export const resetTimer = (ctx) => {
  if (ctx.isFocusTime) {
    ctx.totalSeconds = focusDuration
  } else {
    ctx.totalSeconds = restDuration
  }

  ctx.timerSecs.value = padNum(toOffsetSeconds(ctx.totalSeconds))
  ctx.timerMins.value = padNum(toOffsetMinutes(ctx.totalSeconds))
}

export const skipTimer = (ctx) => {
  stopTimer(ctx)
  resetTimer(ctx)
}

export const timerStarted = (ctx) => {
  playAudioFromStart(ctx.audioTick)
  btnStart.innerText = textPause
}

export const timerFinished = (ctx) => {
  setTimeout(() => {
    playAudioFromStart(ctx.audioAlarm)
    resetTimer(ctx)
  }, 1000);
}

export const stopTimer = (ctx) => {
  ctx.isFocusTime = !ctx.isFocusTime
  clearInterval(ctx.interval)
  ctx.interval = undefined
  btnStart.innerText = textStart
}

export const startTimer = (ctx) => {
  if (ctx.interval) {
    return
  }

  timerStarted(ctx)
  // const timerSecs = $('.timer__secs')
  // const timerMins = $('.timer__mins')

  ctx.interval = setInterval(() => {
    playAudioFromStart(ctx.audioTick)
    ctx.totalSeconds--
    ctx.timerSecs.value = padNum(toOffsetSeconds(ctx.totalSeconds))
    ctx.timerMins.value = padNum(toOffsetMinutes(ctx.totalSeconds))

    if (ctx.totalSeconds == 0) {
      stopTimer(ctx)
      timerFinished(ctx)
    }
  }, 1000)
}

export const toggleTimer = (ctx) => {
  if (ctx.interval) {
    stopTimer(ctx)
  } else {
    startTimer(ctx)
  }
}
