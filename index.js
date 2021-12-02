import Grid from "./Grid.js"
import config from "./config.js"
import Snake from "./Snake.js"
import Food from "./Food.js"

const ctx = config.ctx
const canvas = config.canvas

const grid = new Grid(10, 10, 30, 1, 1, "rgb(255, 255, 200)")

let snake = new Snake(4, 4, grid)

let food = new Food(Math.floor(Math.random() * grid.width), Math.floor(Math.random()*grid.height), grid)

let moved = false

food.color = "rgb(255, 0, 0)"

snake.headColor = "rgb(0, 0, 255)"
snake.bodyColor = "rgb(0, 255, 0)"

let direction = (["l", "r", "t", "b"])[Math.floor(Math.random() * 5)], timer = 0;

const moveButtons = [document.getElementById("up"), document.getElementById("bottom"), document.getElementById("left"), document.getElementById("right")]

const moveButtonsActions = [
  e=>{
    direction = (moved ? (direction != "b" ? "t" : "b") : direction)
    
    moved = false
  },
  
  e=>{
    direction = (moved ? (direction != "t" ? "b" : "t") : direction)
    
    moved = false
  },
  
  e=>{
    direction = (moved ? (direction != "r" ? "l" : "r") : direction)
    
    moved = false
  },
  
  e=>{
    direction = (moved ? (direction != "l" ? "r" : "l") : direction)
    
    moved = false
  }
]

for(let x = 0; x < moveButtons.length; x++) {
  moveButtons[x].addEventListener("touchstart", moveButtonsActions[x])
}

document.getElementById("restartButton").addEventListener("touchstart", e=>{
  
  snake = new Snake(4, 4, grid)
  
  snake.headColor = "rgb(0, 0, 255)"
  snake.bodyColor = "rgb(0, 255, 0)"
})

const update = delta=>{
  if (snake.destroyed) {
    document.getElementById("text").style.display = ""
    
    document.getElementById("restartButton").style.display = ""
    
    for(let x = 0; x < moveButtons.length; x++) {
      moveButtons[x].style.display = "none"
    }
    
    canvas.style.display = "none"
    
    setTimeout(update, 0, 1/60);
    
    return
  }
  
  canvas.style.display = ""
  
  for(let x = 0; x < moveButtons.length; x++) {
    moveButtons[x].style.display = ""
  }
  
  document.getElementById("text").style.display = "none"
  
  document.getElementById("restartButton").style.display = "none"
  
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  grid.show()
  
  snake.draw()
  
  food.whileNodeNotEmpty(()=>{
    if(snake.x == food.x && snake.y == food.y) {
      snake.addBody()
    }
    
    food.x = Math.floor(Math.random() * grid.width)
    
    food.y = Math.floor(Math.random() * grid.height)
  })
  
  food.draw()
  
  if(timer > 1) {
    snake.move(direction, 1)
    moved = true
    timer = 0;
  }
  
  timer += delta
  
  setTimeout(update, 0, 1/60)
}

update(1/60)