import Node from "./Node.js"
import config from "./config.js"

export default function Grid(nodeAmountX, nodeAmountY, nodeSize, spaceX, spaceY, nodeColor) {
  
  this.width = nodeAmountX
  this.height = nodeAmountY
  
  config.canvas.width = config.canvas.width + nodeAmountX + spaceX
  
  config.canvas.height = config.canvas.height + nodeAmountY + spaceY
  
  this.nodes = []
  
  this.nodeColor = nodeColor
  
  this.nodeSize = nodeSize
  
  for(let x = 0; x < this.width; x++) {
    this.nodes.push([])
    
    for(let y = 0; y < this.height; y++) {
      const node = new Node(x * (nodeSize + spaceX) + spaceY, y * (nodeSize + spaceY) + spaceY, nodeSize, nodeSize)
      
      node.color = this.nodeColor
      
      this.nodes[x].push(node)
    }
  }
  
  this.show = ()=>{
    for(let x = 0; x < this.width; x++) {
      for(let y = 0; y < this.height; y++) {
        this.nodes[x][y].color = this.nodeColor
        
        this.nodes[x][y].draw()
      }
    }
  }
}