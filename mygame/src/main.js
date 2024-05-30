// import startGame from "kaplay"
import kaplay from "kaplay"

kaplay()

// set up the gameplay scene
scene("game", () => {
  setGravity(1600)

  loadSprite("smiley", "sprites/smiley.png")

  // the player is a smiley face icon
  const smiley = add([
    sprite("smiley"),
    pos(250, 300),
    scale("0.2"),
    area(),
    body(),
  ])

  // the floor
  add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    body({ isStatic: true }),
    color(125, 200, 255),
  ])

  onKeyPress("space", () => {
    smiley.jump()
    // if (smiley.isGrounded()) smiley.jump() // conditionally only jump if on ground
  })

  // onClick(() => addKaboom(mousePos()))

  // spawn a tree at a random interval
  // function spawnTree() {

  //   add([
  //     rect(48, rand(24, 148)),
  //     area(),
  //     outline(4),
  //     pos(width(), height() - 48),
  //     anchor("botleft"), // bottom left
  //     color(255, 180, 255),
  //     move(LEFT, 240),
  //     "tree", // tag name to use for collision detection
  //   ])

  //   // spawn them some time between half and one and a half seconds
  //   wait(rand(0.5, 1.5)), () => {
  //     spawnTree()
  //   }
  // }

  // spawnTree()

  // have "trees" come continuously every 0.5-1.5 seconds
  loop(rand(0.5, 1.5), () => {
    const treeHeight = Math.floor(Math.random() * (height() - 180))

    add([
      rect(48, treeHeight),
      area(),
      outline(4),
      pos(width(), height() - 48),
      anchor("botleft"), // bottom left
      color(255, 180, 255),
      move(LEFT, 240),
      "tree", // tag name to use for collision detection
    ])
  })

  // keep track of the time/score of the player
  let score = 0
  const scoreLabel = add([
    text(score),
    pos(24, 24)
  ])

  onUpdate(() => {
    score++
    scoreLabel.text = score
  })

  smiley.onCollide("tree", () => {
    addKaboom(smiley.pos)
    shake()
    burp()
    go("lose", score) // exit the current game scene and move to the losing scene
  })

});

// setup the loss after collision scene
scene("lose", (score) => {
  add([
    text("Game Over"),
    pos(center()),
    anchor("center"),
  ]);

  add([
    text(score),
    pos(width() / 2, height() / 2 + 80),
    scale(2),
    anchor("center")
  ])

  onKeyPress("space", () => go("game"))
  onClick(() => go("game"))
});

go("game");
