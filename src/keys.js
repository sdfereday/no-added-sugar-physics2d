import { emitter, on } from "./events";

// https://github.com/straker/kontra/blob/master/src/keyboard.js
let keyMap = {};
let callbacks = {};
let pressedKeys = {};

const keydownEventHandler = evt => {
  let key = keyMap[evt.which];
  pressedKeys[key] = true;

  if (callbacks[key]) {
    callbacks[key](evt);
  }

  emitter.emit("keydown", keyMap[evt.which]);
};

const keyupEventHandler = evt => {
  pressedKeys[keyMap[evt.which]] = false;
  emitter.emit("keyup", keyMap[evt.which]);
};

const blurEventHandler = evt => {
  pressedKeys = {};
  emitter.emit("blur", evt.which);
};

export const initKeys = () => {
  let i;

  // alpha keys
  // @see https://stackoverflow.com/a/43095772/2124254
  for (i = 0; i < 26; i++) {
    // rollupjs considers this a side-effect (for now), so we'll do it in the
    // initKeys function
    // @see https://twitter.com/lukastaegert/status/1107011988515893249?s=20
    keyMap[65 + i] = (10 + i).toString(36);
  }

  // numeric keys
  for (i = 0; i < 10; i++) {
    keyMap[48 + i] = "" + i;
  }

  window.addEventListener("keydown", keydownEventHandler);
  window.addEventListener("keyup", keyupEventHandler);
  window.addEventListener("blur", blurEventHandler);
};

export const onKeyPressed = key => {
  return !!pressedKeys[key];
};

export const onKeyEvent = (e, cb) => on(e, cb);
