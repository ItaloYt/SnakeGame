export default function Food(x, y, nodeGrid) {
  this.x = x; this.y = y;
  
  this.color = ""
  
  const grid = nodeGrid
  
  this.draw = ()=>{
    const node = grid.nodes[this.x][this.y]
    
    node.color = this.color
    
    node.draw()
  }
  
  this.whileNodeNotEmpty = handler=>{
    while(grid.nodes[this.x][this.y].color != grid.nodeColor) {
      
      handler()
    }
  }
}