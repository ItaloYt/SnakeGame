export default function Snake(x, y, nodeGrid) {
  this.x = x; this.y = y;
  
  this.headColor = ""
  this.bodyColor = ""
  
  const grid = nodeGrid
  let bodies = 0
  const lastPos = []
  
  this.destroyed = false
  
  this.draw = ()=>{
    if(this.destroyed) { return; }
    
    for(let x = 0; x < lastPos.length; x++) {
      const body = grid.nodes[lastPos[x].x][lastPos[x].y]
      
      body.color = this.bodyColor
      body.draw()
    }
    
    const node = grid.nodes[this.x][this.y]
        
    node.color = this.headColor
    
    node.draw()
  }
  
  this.move = (direction, speed)=>{
    for(let x = bodies-1; x >= 0; x--) {
      lastPos[x] = (x == 0 ? {x: this.x, y: this.y} : lastPos[x-1])
    }
    
    this.x += (direction == "r" ? speed : (direction == "l" ? -speed : 0))
    
    this.y += (direction == "b" ? speed : (direction == "t" ? -speed : 0))
    
    if(this.x >= grid.width || this.x < 0 || this.y >= grid.height || this.y < 0) {
      
      this.destroyed = true
    }
    else {
      for(let x = 0; x < lastPos.length; x++) {
        const body = grid.nodes[lastPos[x].x][lastPos[x].y]
        
        if(Math.floor(body.x / grid.nodeSize) == this.x && Math.floor(body.y / grid.nodeSize) == this.y) {
          
          this.destroyed = true
          
          break;
        }
      }
    }
  }
  
  this.addBody = ()=>{
    bodies++
  }
}