import NanoEvents from "nanoevents";

export const emitter = new NanoEvents();

export const on = (ev, cb = args => {}) => emitter.on(ev, args => cb(args));
