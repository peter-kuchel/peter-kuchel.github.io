
(() => {
	
	let canvas = document.getElementById("c")
	let tmr = undefined
	let origin = [325, 225]
	let a = [-50, -50], b = [50, -50], c = [50, 50], d = [-50, 50]
	let ps = [a, b, c, d, a]
	let ps_p = [[0,0],[0,0],[0,0],[0,0],[0,0]]
	let t = 0

	const rotate = () => {
		
		let ctx = canvas.getContext("2d")
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		t += 0.09
		let st = Math.sin(t) 
		let ct = Math.cos(t)

		let i = null
		for (i = 0; i < ps.length; i++){
			ps_p[i][0] = (ps[i][0] * ct ) - (ps[i][1] * st)
			ps_p[i][1] = (ps[i][0] * st ) + (ps[i][1] * ct) 
		}
		
		ctx.strokeStyle = '#07ef7b'
		for (i = 1; i < ps.length; i++){
			ctx.beginPath()
			ctx.moveTo(origin[0] + ps_p[i-1][0], origin[1] + ps_p[i-1][1])
			ctx.lineTo(origin[0] + ps_p[i][0], origin[1] + ps_p[i][1])
			ctx.stroke()
			ctx.closePath()
		}

	}
	tmr = setInterval(rotate, 45)
	//window.requestAnimationFrame(rotate)
})()


/* 

*/

