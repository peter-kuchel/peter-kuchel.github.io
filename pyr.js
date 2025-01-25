



let c = document.getElementById("c")
let ctx = c.getContext("2d")

ctx.fillStyle = "white"
ctx.fillRect(0, 0, c.width, c.height)

ctx.moveTo(0,0)
ctx.lineTo(200,100)

ctx.stroke()


