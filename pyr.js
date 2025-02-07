
(() => {
	
	let canvas = document.getElementById("c")
	let tmr = undefined

	const xo = 325, yo = 225, zo = 0, so = 0, Z1 = 25, Z2 = 25
	let origin = [(xo + (so / 2) + (so / 2)), (yo + (so / 2) + (so / 2))]

	let a = [-50, -50, 0], b = [50, -50, 0], c = [50, 50, 0], d = [-50, 50, 0],
	    e = [0, -100, -50], f = [100, -100, -50], g = [100, 0, -50], h = [0,0, -50]

	let ps_f1 = [a, b, c, d, a]
	let ps_f2 = [e, f, g, h, e]
	let ps_p1 = [[0,0],[0,0],[0,0],[0,0],[0,0]]
	let ps_p2 = [[0,0],[0,0],[0,0],[0,0],[0,0]]

	let t = 0, p = 0, om = 0
	const dis = 7	

	const rotate = () => {
		
		let ctx = canvas.getContext("2d")
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		t += -0.01
		p += 0.02
		om += -0.07

		let st = Math.sin(t), sp = Math.sin(p), som = Math.sin(om) 
		let ct = Math.cos(t), cp = Math.cos(p), com = Math.cos(om)
		
		const draw_line = (x0, y0, x1, y1, ctx) => {

			let m = ( y1 - y0 ) / (x1 - x0),
			    b = y0 - (m * x0), 
			    i = (x1 - x0) / dis,
			    xj = x0, yj = 0

			for (let k = 0; k < dis; k++){
				yj = ( m * xj ) + b
				ctx.fillRect(xj, yj, 1.0, 1.0)	
				xj += i
			}
		}

		let i = null
		/*
			x*cos(b)*cos(g) + y*(sin(a)*sin(b)*cos(g) - sin(g)*cos(a)) + z*(sin(a)*sin(g) + sin(b)*cos(a)*cos(g)),
			x*cos(b)*cos(g) + y*(sin(a)*sin(b)*sin(g) + cos(a)*cos(g)) - z*(sin(a)*cos(g) - sin(b)*sin(g)*cos(a)),
			-x*sin(b) + y*sin(a)*cos(b) + z*cos(a)*cos(b)
		*/

		let cpcom = cp * com, stsp = st * sp, spct = sp * ct
		let _x = 0, _y = 0, _z = 0
		for (i = 0; i < ps_f1.length; i++){
			
			_x = ps_f1[i][0], _y = ps_f1[i][1], _z = ps_f1[i][2] 
			ps_p1[i][0] = (_x * cpcom) + (_y * stsp * com) - (_y * som * ct) + (_z * st * som) + (_z * spct * com) 
			ps_p1[i][1] = (_x * cpcom) + (_y * stsp * som) - (_y * com * ct) + (_z * st * com) + (_z * spct * som)   

			_x = ps_f2[i][0], _y = ps_f2[i][1], _z = ps_f2[i][2] 
			ps_p2[i][0] = (_x * cpcom) + (_y * stsp * com) - (_y * som * ct) + (_z * st * som) + (_z * spct * com) 
			ps_p2[i][1] = (_x * cpcom) + (_y * stsp * som) - (_y * com * ct) + (_z * st * com) + (_z * spct * som)   

		}
		
		ctx.strokeStyle = '#07ef7b'
		ctx.fillStyle = '#07ef7b'
		for (i = 1; i < ps_f1.length; i++){

			draw_line(origin[0] + ps_p2[i-1][0], origin[1] + ps_p2[i-1][1], origin[0] + ps_p2[i][0], origin[1] + ps_p2[i][1], ctx)
			draw_line(origin[0] + ps_p1[i-1][0], origin[1] + ps_p1[i-1][1], origin[0] + ps_p2[i-1][0], origin[1] + ps_p2[i-1][1], ctx) 
			draw_line(origin[0] + ps_p1[i-1][0], origin[1] + ps_p1[i-1][1], origin[0] + ps_p1[i][0], origin[1] + ps_p1[i][1], ctx)
		}
	}
	tmr = setInterval(rotate, 60)
})()

