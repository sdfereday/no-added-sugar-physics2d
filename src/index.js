import { init, Sprite as KontraSprite, GameLoop } from 'kontra'
import { MovingObject } from './physics'

const { canvas } = init()

const KSprite = () => KontraSprite({
  x: 100, // starting x,y position of the sprite
  y: 80,
  color: 'red', // fill color of the sprite rectangle
  width: 20, // width and height of the sprite rectangle
  height: 40,
  dx: 2 // move the sprite 2px to the right every frame
})

const Sprite = () => {
  
  const body = MovingObject()
  const sprite = KSprite()

  return {
    move: x => {
      if (x > 0) {
        body.velocity.goRight()
      } else if (x < 0) {
        body.velocity.goLeft()
      }
    },
    update: (delta) => {
      sprite.update()

      const { pos } = body.fixedUpdate(delta)

      sprite.x = pos.x
      sprite.y = pos.y
    },
    render: () => sprite.render()
  }
}

const p = Sprite()

const loop = GameLoop({
  // create the main game loop
  update: delta => {
    p.update(delta)
  },
  render: () => {
    p.render()
  }
})

loop.start() // start the game
