import { init, GameLoop } from "kontra";
import { Sprite } from "./Sprite";
import { onKeyEvent, onKeyPressed, initKeys } from "./keys";

const { canvas } = init();

const p = Sprite();

// Must fire before any keyboard use
initKeys();

// Bindings (fire once)
let jumpPressed = false;

onKeyEvent("keyup", key => {
  switch (key) {
    case "w":
      jumpPressed = false;
      break;
  }
});

onKeyEvent("keydown", key => {
  switch (key) {
    case "w":
      if (!jumpPressed) {
        p.jump();
        jumpPressed = true;
      }
      break;
  }
});

const loop = GameLoop({
  update: delta => {
    // Fires continuously
    if (onKeyPressed("a")) p.moveLeft();
    if (onKeyPressed("d")) p.moveRight();

    /* Make sure this happens after keyPress or it won't register
    on the sprite body. */
    p.update(delta);
  },
  render: () => {
    p.render();
  }
});

loop.start(); // start the game
