import { Sprite as KontraSprite, Vector } from "kontra";

const KSprite = () =>
  KontraSprite({
    x: 100, // starting x,y position of the sprite
    y: 80,
    color: "red", // fill color of the sprite rectangle
    width: 20, // width and height of the sprite rectangle
    height: 40,
    dx: 2 // move the sprite 2px to the right every frame
  });

export const Sprite = () => {
  const sprite = KSprite();

  const playerXSpeed = 168;
  const gravity = 10; // Higher === more force - This is a huge scale, is this correct?
  const jumpSpeed = -12;

  let speed = Vector(0, 0);
  let pos = Vector(32, 32);
  let size = Vector(1, 1.5);

  let xVelocity = 0;
  let yVelocity = 0;
  let onGround = false;
  let jumped = false;

  const moveX = dir =>
    dir > 0
      ? (xVelocity += playerXSpeed)
      : dir < 0 ? (xVelocity -= playerXSpeed) : 0;

  const checkJump = () => {
    if (jumped && onGround) {
      jumped = false;
    }
  };

  const jump = () => {
    if (onGround && !jumped) {
      yVelocity = -246.0;
      onGround = false;
      jumped = true;
    }
  };

  const physicsUpdate = (deltaTime, currentPos) => {
    yVelocity += gravity;

    // Testing if you're at the ground
    if (currentPos.y >= 175 && !jumped) {
      // TODO: Look at epsilon
      yVelocity = 0;
      onGround = true;
    }

    if (currentPos.y >= 175 && jumped) {
      jumped = false;
    }

    // Apply new vectors
    const newPos = currentPos.add(
      Vector(xVelocity * deltaTime, yVelocity * deltaTime)
    );

    // Reset for next tick
    xVelocity = 0;

    return newPos;
  };

  return {
    moveRight: () => moveX(1),
    moveLeft: () => moveX(-1),
    isJumping: () => jumped,
    jump: () => jump(),
    update: delta => {
      sprite.update();

      pos = physicsUpdate(delta, pos);
      sprite.x = pos.x;
      sprite.y = pos.y;

      checkJump();
    },
    render: () => sprite.render()
  };
};
