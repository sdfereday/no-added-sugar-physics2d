// https://github.com/straker/kontra/blob/master/src/keyboard.js
let keyMap = {}

let callbacks = {}
let pressedKeys = {}

const keydownEventHandler = evt => {
  let key = keyMap[evt.which]
  pressedKeys[key] = true

  if (callbacks[key]) {
    callbacks[key](evt)
  }
}

const keyupEventHandler = evt => {
  pressedKeys[keyMap[evt.which]] = false
}

const blurEventHandler = () => {
  pressedKeys = {}
}

export const initKeys = () => {
  let i

  // alpha keys
  // @see https://stackoverflow.com/a/43095772/2124254
  for (i = 0; i < 26; i++) {
    // rollupjs considers this a side-effect (for now), so we'll do it in the
    // initKeys function
    // @see https://twitter.com/lukastaegert/status/1107011988515893249?s=20
    keyMap[65 + i] = (10 + i).toString(36)
  }

  // numeric keys
  for (i = 0; i < 10; i++) {
    keyMap[48 + i] = '' + i
  }

  window.addEventListener('keydown', keydownEventHandler)
  window.addEventListener('keyup', keyupEventHandler)
  window.addEventListener('blur', blurEventHandler)
}

export const keyPressed = key => {
  return !!pressedKeys[key]
}

export const keyReleased = key => {
  return !!pressedKeys[key]
}
