const object = {
  canvas: document.getElementById("canvas"),
  ctx: undefined
}

object.ctx = object.canvas.getContext("2d")

object.canvas.width = 300
object.canvas.height = 300

export default object