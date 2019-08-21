import { Sprite as KontraSprite } from 'kontra'
import { MovingObject } from './physics'

const KSprite = () =>
  KontraSprite({
    x: 100, // starting x,y position of the sprite
    y: 80,
    color: 'red', // fill color of the sprite rectangle
    width: 20, // width and height of the sprite rectangle
    height: 40,
    dx: 2 // move the sprite 2px to the right every frame
  })

export const Sprite = () => {
  const body = MovingObject()
  const sprite = KSprite()

  let isJumping = false

  const checkJump = () => {
    if (isJumping && body.onGround()) {
      isJumping = false
    }
  }

  return {
    isJumping: () => isJumping,
    moveRight: () => body.moveX(1),
    moveLeft: () => body.moveX(-1),
    jump: () => {
      if (isJumping) return

      isJumping = true
      body.jump()
    },
    update: delta => {
      sprite.update()

      const { x, y } = body.fixedUpdate(delta)
      sprite.x = x
      sprite.y = y

      checkJump()
    },
    render: () => sprite.render()
  }
}
