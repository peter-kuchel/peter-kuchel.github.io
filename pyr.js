
(() => {
	
	let canvas = document.getElementById("c")
	let tmr = undefined
	let origin = [325, 225]
	let a = [-50, -50], b = [50, -50], c = [50, 50], d = [-50, 50],
	    e = [0, -100], f = [100, -100], g = [100, 0], h = [0,0]
	let ps_f1 = [a, b, c, d, a]
	let ps_f2 = [e,f,g,h,e]
	let ps_p1 = [[0,0],[0,0],[0,0],[0,0],[0,0]]
	let ps_p2 = [[0,0],[0,0],[0,0],[0,0],[0,0]]
	let t = 0
	const dis = 10	

	const rotate = () => {
		
		let ctx = canvas.getContext("2d")
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		t += 0.06
		let st = Math.sin(t) 
		let ct = Math.cos(t)
		
		const draw_line = (x0, y0, x1, y1, ctx) => {

			let m = ( y1 - y0 ) / (x1 - x0)
			let b = y0 - (m * x0) 

			let i = (x1 - x0) / dis 
			
			let xj = x0	
			let yj = 0
			for (let k = 0; k < dis; k++){
				yj = ( m * xj ) + b
				ctx.fillRect(xj, yj, 1.5, 1.5)	
				xj += i
			}
		}

		let i = null
		for (i = 0; i < ps_f1.length; i++){
			ps_p1[i][0] = (ps_f1[i][0] * ct ) - (ps_f1[i][1] * st)
			ps_p1[i][1] = (ps_f1[i][0] * st ) + (ps_f1[i][1] * ct) 

			ps_p2[i][0] = (ps_f2[i][0] * ct ) - (ps_f2[i][1] * st)
			ps_p2[i][1] = (ps_f2[i][0] * st ) + (ps_f2[i][1] * ct) 
		}
		
		ctx.strokeStyle = '#07ef7b'
		ctx.fillStyle = '#07ef7b'
		//console.log(ps_p1, ps_p2)
		for (i = 1; i < ps_f1.length; i++){
			ctx.beginPath()


			draw_line(origin[0] + ps_p2[i-1][0], origin[1] + ps_p2[i-1][1], origin[0] + ps_p2[i][0], origin[1] + ps_p2[i][1], ctx)
			draw_line(origin[0] + ps_p1[i-1][0], origin[1] + ps_p1[i-1][1], origin[0] + ps_p2[i-1][0], origin[1] + ps_p2[i-1][1], ctx) 
			draw_line(origin[0] + ps_p1[i-1][0], origin[1] + ps_p1[i-1][1], origin[0] + ps_p1[i][0], origin[1] + ps_p1[i][1], ctx)
		}

	}
	tmr = setInterval(rotate, 45)

})()

/*


			ctx.beginPath()
			ctx.moveTo(origin[0] + ps_p1[i-1][0], origin[1] + ps_p1[i-1][1])
			ctx.lineTo(origin[0] + ps_p1[i][0], origin[1] + ps_p1[i][1])
			ctx.stroke()

			ctx.moveTo(origin[0] + ps_p2[i-1][0], origin[1] + ps_p2[i-1][1])
			ctx.lineTo(origin[0] + ps_p2[i][0], origin[1] + ps_p2[i][1])
			ctx.stroke()

			ctx.moveTo(origin[0] + ps_p1[i-1][0], origin[1] + ps_p1[i-1][1])
			ctx.lineTo(origin[0] + ps_p2[i-1][0], origin[1] + ps_p2[i-1][1])
			ctx.stroke()

			ctx.closePath()
		for (i = 1; i < ps_f2.length; i++){
			ctx.beginPath()
			ctx.moveTo(origin[0] + ps_p2[i-1][0], origin[1] + ps_p2[i-1][1])
			ctx.lineTo(origin[0] + ps_p2[i][0], origin[1] + ps_p2[i][1])
			ctx.stroke()
			ctx.closePath()
		}


*/
