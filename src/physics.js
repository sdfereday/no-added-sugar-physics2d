/*
    Physics is built from the following tutorial:
    https://gamedevelopment.tutsplus.com/tutorials/basic-2d-platformer-physics-part-1--cms-25799

    Also have a look at:
    https://eloquentjavascript.net/16_game.html

    And:
    https://github.com/jobtalle/PlatformerPhysics/blob/master/js/game.js

    It requires kontra to work (uses vectors, etc).

    Some vector functions used:
    https://gist.github.com/winduptoy/a1aa09c3499e09edbd33
*/
import { Vector } from "kontra";

const between = (v, a, b) => v > a && v < b;

const multiply = (vec, v) => {
  let x = 0;
  let y = 0;
  if (typeof v === "object") {
    x = vec.x * v.x;
    y = vec.y * v.y;
  } else {
    x = vec.x * v;
    y = vec.y * v;
  }
  return Vector(x, y);
};

export const overlaps = other => {
  if (Math.Abs(center.x - other.center.x) > halfSize.x + other.halfSize.x) {
    return false;
  }
  if (Math.Abs(center.y - other.center.y) > halfSize.y + other.halfSize.y) {
    return false;
  }
  return true;
};

/* Your characters and sprites will either inherit or use this
as part of their movement in 2D space. */
export const MovingObject = () => {
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

  let touchesWall = false;
  let touchesGround = true;

  const moveX = dir =>
    dir > 0
      ? (xVelocity += playerXSpeed)
      : dir < 0 ? (xVelocity -= playerXSpeed) : 0;

  const jump = () => {
    if (onGround && !jumped) {
      yVelocity = -246.0;
      onGround = false;
      jumped = true;
    }

    // You need velocities for this kind of stuff.
    // Perhaps take a look at: https://gamemechanicexplorer.com/#platformer-4
    /*
    And:
    http://jsfiddle.net/LyM87/
    https://gamedev.stackexchange.com/questions/29617/how-to-make-a-character-jump
    */
    // yVelocity -= jumpSpeed;
    // landing = true
    // fired = true
    // y > 0 ? (yVelocity -= jumpSpeed) : y < 0 ? (yVelocity += jumpSpeed) : y;
  };

  return {
    moveX: dir => moveX(dir),
    jump: () => jump(),
    onGround: () => onGround,
    fixedUpdate: deltaTime => {
      /// X
      // xVelocityset prior by call before fixedUpdate
      // No walls touched on x axis, so carry on moving
      // if (!state.level.touches(movedX, this.size, "wall")) {
      // pos = pos.add(Vector(xVelocity * deltaTime, 0));
      // }

      /// Y
      // Always add gravity
      yVelocity += gravity;
      // const movedY = pos.add(Vector(0, yVelocity * deltaTime));

      // This is all a little messy, needs tidying
      if (pos.y >= 175) {
        // TODO: Look at epsilon
        yVelocity = jumped ? yVelocity : 0;
        onGround = true;

        if (jumped) {
          jumped = false;
        }
      }

      pos = pos.add(Vector(xVelocity * deltaTime, yVelocity * deltaTime));

      // No walls touched on y axis, so keep falling
      // if (!state.level.touches(movedY, size, "wall")) {
      // if (touchesGround) {
      // if (movedY.y < 200) {
      //   pos = movedY;

      //   // Quick velocity test for falling?
      //   //speed.y += 10;

      //   // } else if (keys.ArrowUp && yVelocity > 0) {
      //   //   yVelocity = -jumpSpeed;
      // } else {
      //   // Reset velocities now you're not falling?
      //   speed.y = 0;
      // }

      /// RETURN
      // Returns current pos AND new heading (may need this)
      // return new Player(pos, new Vec(xSpeed, yVelocity));
      // Reset speed values for next tick test
      // yVelocity = speed.y + deltaTime * gravity;
      xVelocity = 0;

      return pos;
    }
  };
};

export default () => {
  return {};
};
