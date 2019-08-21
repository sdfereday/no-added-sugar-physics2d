import { init, GameLoop } from 'kontra'
import { Sprite } from './Sprite'
import { initKeys, keyPressed } from './keys'

const { canvas } = init()

const p = Sprite()

let jumpReleased = true

const loop = GameLoop({
  // create the main game loop
  update: delta => {
    if (keyPressed('a')) p.moveLeft()
    
    if (keyPressed('d')) p.moveRight()
    
    if (keyPressed('w') && !p.isJumping() && jumpReleased) {
      p.jump()
      jumpReleased = false
    }
    
    /* Make sure this happens after keyPress or it won't register
    on the sprite body. */
    p.update(delta)
  },
  render: () => {
    p.render()
  }
})

initKeys()
loop.start() // start the game
