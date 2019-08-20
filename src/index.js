import {
  init,
  Sprite as KontraSprite,
  GameLoop,
  initKeys,
  keyPressed
} from "kontra";
import { MovingObject } from "./physics";

const { canvas } = init();

// Maybe just do this the once in master file
initKeys();

const KSprite = () =>
  KontraSprite({
    x: 100, // starting x,y position of the sprite
    y: 80,
    color: "red", // fill color of the sprite rectangle
    width: 20, // width and height of the sprite rectangle
    height: 40,
    dx: 2 // move the sprite 2px to the right every frame
  });

const Sprite = () => {
  const body = MovingObject();
  const sprite = KSprite();

  return {
    moveRight: () => body.moveX(1),
    moveLeft: () => body.moveX(-1),
    jump: () => body.jump(),
    update: delta => {
      sprite.update();

      const { x, y } = body.fixedUpdate(delta);
      sprite.x = x;
      sprite.y = y;
    },
    render: () => sprite.render()
  };
};

const p = Sprite();

const loop = GameLoop({
  // create the main game loop
  update: delta => {
    if (keyPressed("a")) p.moveLeft();

    if (keyPressed("d")) p.moveRight();

    if (keyPressed("w")) p.jump();

    /* Make sure this happens after keyPress or it won't register
    on the sprite body. */
    p.update(delta);
  },
  render: () => {
    p.render();
  }
});

loop.start(); // start the game
