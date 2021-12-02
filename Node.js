import config from "./config.js"

const ctx = config.ctx

export default function Node(x, y, w, h) {
  this.x = x; this.y = y; this.w = w; this.h = h;
  
  this.color = ""
  
  this.draw = ()=>{
    ctx.fillStyle = this.color
    
    ctx.fillRect(this.x, this.y, this.w, this.h)
  }
}