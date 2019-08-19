import { init, Sprite, GameLoop } from 'kontra'
import { MovingObject } from './physics'

const { canvas } = init()

const sprite = Sprite({
  x: 100, // starting x,y position of the sprite
  y: 80,
  color: 'red', // fill color of the sprite rectangle
  width: 20, // width and height of the sprite rectangle
  height: 40,
  dx: 2 // move the sprite 2px to the right every frame
})

const mObj = MovingObject()

const loop = GameLoop({
  // create the main game loop
  update: delta => {
    // update the game state
    sprite.update()

    // wrap the sprites position when it reaches
    // the edge of the screen
    if (sprite.x > canvas.width) {
      sprite.x = -sprite.width
    }

    // Physics tests
    const objData = mObj.FixedUpdate(delta)
  },
  render: () => {
    // render the game state
    sprite.render()
  }
})

loop.start() // start the game
