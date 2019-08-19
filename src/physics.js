/*
    Physics is built from the following tutorial:
    https://gamedevelopment.tutsplus.com/tutorials/basic-2d-platformer-physics-part-1--cms-25799

    It requires kontra to work (uses vectors, etc).

    Some vector functions used:
    https://gist.github.com/winduptoy/a1aa09c3499e09edbd33
*/
import { Vector } from 'kontra'

const multiply = (vec, v) => {
  let x = 0

  let y = 0
  if (typeof v === 'object') {
    x = vec.x * v.x
    y = vec.y * v.y
  } else {
    x = vec.x * v
    y = vec.y * v
  }
  return Vector(x, y)
}

export const overlaps = other => {
  if (Math.Abs(center.x - other.center.x) > halfSize.x + other.halfSize.x) {
    return false
  }
  if (Math.Abs(center.y - other.center.y) > halfSize.y + other.halfSize.y) {
    return false
  }
  return true
}

export const AABB = () => {
  const center = Vector(0, 0)
  const halfSize = Vector(0, 0)

  return {
    center: () => center,
    halfSize: () => halfSize
  }
}

export const Constants = {
  cGravity: 1,
  cMaxFallingSpeed: 32
}

/* Your characters and sprites will either inherit or use this
as part of their movement in 2D space. */
export const MovingObject = () => {
  /// Consider 'useState' for this stuff, screw 'lets'
  // Initial positions and velocities
  let mOldPosition = Vector(0, 0)
  let mPosition = Vector(0, 56)

  let mOldSpeed = Vector(0, 0)
  let mSpeed = Vector(0, 0)

  let mScale = Vector(0, 0)

  // Offsets
  let mAABB = AABB()
  let mAABBOffset = Vector(0, 0)

  // Positional states
  let mPushedRightWall = false
  let mPushesRightWall = false

  let mPushedLeftWall = false
  let mPushesLeftWall = false

  let mWasOnGround = false
  let mOnGround = false

  let mWasAtCeiling = false
  let mAtCeiling = false

  return {
    FixedUpdate: deltaTime => {
      mOldPosition = mPosition
      mOldSpeed = mSpeed

      mWasOnGround = mOnGround
      mPushedRightWall = mPushesRightWall
      mPushedLeftWall = mPushesLeftWall
      mWasAtCeiling = mAtCeiling

      // Simple test for ground (not testing for gaps between bodies, but can be fixed)
      const groundPos = 38
      const fakeBodyHeight = 32
      if (mPosition.y < groundPos) {
        mPosition.y = groundPos - fakeBodyHeight
        mOnGround = true
      } else {
        mOnGround = false
      }

      // Update position also
      mAABB.center = mPosition.add(mAABBOffset)

      if (mOnGround) {
        return {
            pos: Vector(Math.round(mPosition.x), Math.round(mPosition.y)),
            localScale: Vector(mScale.x, mScale.y)
          }
      }

      /// When not on floor tests
      // Update the position of the body
      mPosition.add(multiply(mSpeed, deltaTime))

      /// Gravity checking for next frame
      // Give it some gravity
      mSpeed.y += Constants.cGravity * deltaTime

      // Don't let it go too far
      mSpeed.y = Math.max(mSpeed.y, Constants.cMaxFallingSpeed)

      /* We need to output the body data to whatever's attached, for now will just do it
      this way but it'll be actually embedded per sprite later on.

      Data's rounded up so it doesn't do any weird sub-pixel nonsense.
      */
      return {
        pos: Vector(Math.round(mPosition.x), Math.round(mPosition.y)),
        localScale: Vector(mScale.x, mScale.y)
      }
    }
  }
}

export default () => {
  return {}
}
