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
    scale("0.15"),
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

  onClick(() => smiley.jump())

  // onClick(() => addKaboom(mousePos()))

  // spawn a tree at a random interval
  function spawnTree() {
    const treeHeight = Math.floor(Math.random() * (height() - 300))
    const oppositeTreeHeight = height() - treeHeight - 300

    add([
      rect(48, rand(24, treeHeight)),
      area(),
      outline(4),
      pos(width(), height() - 48),
      anchor("botleft"), // bottom left
      color(rand(255), rand(255), rand(255)),
      move(LEFT, 240),
      "tree", // tag name to use for collision detection
    ])

    add([
      rect(48, rand(24, oppositeTreeHeight)),
      area(),
      outline(4),
      pos(width(), 0),
      anchor("topleft"),
      color(rand(255), rand(255), rand(255)),
      move(LEFT, 240),
      "tree", // tag name to use for collision detection
    ])

    wait(rand(1, 3), spawnTree)
  }

  spawnTree()

  // loop(0.5, () => {
  //   spawnTree()
  // })

  // have "trees" come continuously
  // loop(rand(0.75, 2), () => {
  //   const treeHeight = Math.floor(Math.random() * (height() - 180))

  //   add([
  //     rect(48, treeHeight),
  //     area(),
  //     outline(4),
  //     pos(width(), height() - 48),
  //     anchor("botleft"), // bottom left
  //     color(255, 180, 255),
  //     move(LEFT, 240),
  //     "tree", // tag name to use for collision detection
  //   ])
  // })

  // keep track of the time/score of the player
  let score = 0
  const scoreLabel = add([
    text("SCORE: 0"),
    pos(24, 24)
  ])

  onUpdate(() => {
    score++
    scoreLabel.text = `SCORE: ${Math.floor(score / 10)}`
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
    text("You lost!\nGreat game!"),
    pos(center()),
    anchor("center"),
  ]);

  add([
    text(`Final score: ${Math.floor(score / 10)} points.`),
    pos(width() / 2, height() / 2 + 80),
    scale(2),
    anchor("center")
  ])

  onKeyPress("space", () => go("game"))
  onClick(() => go("game"))
});

go("game");

// const bg = new Image()
// bg.src = "sprites/pexels-ersinizan-23408706.jpg"
// bg.onload = function() {
//   document.querySelector("canvas").getContext("2d").drawImage(bg, 0, 0)
// }
