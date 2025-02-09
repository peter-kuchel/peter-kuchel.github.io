
const draw_line = (x0, y0, x1, y1, d, ctx) => {
			
	let v = x1 - x0 == 0
	let m = v ? 0 : ( y1 - y0 ) / (x1 - x0),
            b = y0 - (m * x0), 
	    i = (x1 - x0) / d, j = (y1 - y0) / d
	    xj = x0, yj = v ? y0 : 0 

 	for (let k = 0; k < d; k++){
		yj = v ? yj : ( m * xj ) + b
		ctx.fillRect(xj, yj, 1.5, 1.5)	
		xj += i
		if (v) yj += j;
	}
}
const pyramid = () => {


	const xo = 325, yo = 225, r = (35/30)
	let origin = [xo, yo]

	let a = [50, 50, 0], b = [-50, 50, 0],
	    c = [50, 50, -100], d = [-50, 50, -100], p = [0,-50,-50]

	let ps_f1 = [a, b, d, c, a, p] 
	let ps_p1 = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]] 
	let _a = 0, _b = 0, _g = 0
	const dis = 12	

	let _ai = 0.005, _gi = 0.01

	const rotate = () => {
		
		let ctx = canvas.getContext("2d")
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		_ai = _a > 0.25 ? -0.005 : _a < -0.25 ? 0.005 : _ai
		_a += _ai
		_b += 0.13
		_gi = _g > 0.25 ? -0.005 : _g < -0.25 ? 0.005 : _gi
		_g += _gi 

		let sa = Math.sin(_a), sb = Math.sin(_b), sg = Math.sin(_g), 
		    ca = Math.cos(_a), cb = Math.cos(_b), cg = Math.cos(_g),
		    sasb = sa * sb
		
		const fx = (_x, _y, _z) => ((_x * cb * cg) - (_y * cb * sg) + (_z * sb)) * r; 
		const fy = (_x, _y, _z) => ((_x * sasb * cg) + (_x * ca * sg) + (_y * ca * cg) - (_y * sasb * sg) - (_z * sa * cb)) * r;


		let i = null, x = 0, y = 0, z = 0

		for (i = 0; i < ps_f1.length; i++){

			x = ps_f1[i][0]; y = ps_f1[i][1]; z = ps_f1[i][2] 

			ps_p1[i][0] = fx(x,y,z)
			ps_p1[i][1] = fy(x,y,z)


		}
	    		
		ctx.fillStyle = '#07ef7b'
		let pi = ps_p1[ps_p1.length - 1]
		for (i = 1; i < ps_p1.length - 1; i++){

			x = origin[0] + ps_p1[i-1][0]; y = origin[1] + ps_p1[i-1][1]	
			_x = origin[0] + ps_p1[i][0]; _y = origin[1] + ps_p1[i][1]
			
			draw_line(x, y, _x, _y, dis, ctx)

			_x = origin[0] + pi[0]; _y = origin[1] + pi[1]	
			draw_line(x, y, _x, _y, dis ,ctx)

		}

		ctx.fillRect(_x, _y, 1.5, 1.5)	
	}

	tmr = setInterval(rotate, 60)


}

const square = () => {}


(() => {
	
	let canvas = document.getElementById("c")
	let tmr = undefined

	const xo = 325, yo = 225, r = (35/30)
	let origin = [xo, yo]

	let a = [-50, -50, 0], b = [50, -50, 0], c = [50, 50, 0], d = [-50, 50, 0],
	    e = [-50, -50, -100], f = [50, -50, -100], g = [50, 50, -100], h = [-50, 50, -100]

	let ps_f1 = [a, b, c, d, a], ps_f2 = [e, f, g, h, e]
	let ps_p1 = [[0,0],[0,0],[0,0],[0,0],[0,0]], ps_p2 = [[0,0],[0,0],[0,0],[0,0],[0,0]]

	let _a = 0, _b = 0, _g = 0
	const dis = 7	

	const rotate = () => {
		
		let ctx = canvas.getContext("2d")
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		_a += 0.01
		_b += 0.02
		_g += 0.1

		let sa = Math.sin(_a), sb = Math.sin(_b), sg = Math.sin(_g), 
		    ca = Math.cos(_a), cb = Math.cos(_b), cg = Math.cos(_g),
		    sasb = sa * sb
		
		const fx = (_x, _y, _z) => ((_x * cb * cg) - (_y * cb * sg) + (_z * sb)) * r; 
		const fy = (_x, _y, _z) => ((_x * sasb * cg) + (_x * ca * sg) + (_y * ca * cg) - (_y * sasb * sg) - (_z * sa * cb)) * r;


		let i = null, x = 0, y = 0, z = 0

		for (i = 0; i < ps_f1.length; i++){

			x = ps_f1[i][0]; y = ps_f1[i][1]; z = ps_f1[i][2] 

			ps_p1[i][0] = fx(x,y,z)
			ps_p1[i][1] = fy(x,y,z)

			x = ps_f2[i][0]; y = ps_f2[i][1]; z = ps_f2[i][2] 

			ps_p2[i][0] = fx(x,y,z)
			ps_p2[i][1] = fy(x,y,z)

		}
		
		ctx.fillStyle = '#07ef7b'
		for (i = 1; i < ps_f1.length; i++){

			x = origin[0] + ps_p1[i-1][0]; y = origin[1] + ps_p1[i-1][1]	
			_x = origin[0] + ps_p1[i][0]; _y = origin[1] + ps_p1[i][1]
			
			draw_line(x, y, _x, _y, dis, ctx)

			_x = origin[0] + ps_p2[i-1][0]; _y = origin[1] + ps_p2[i-1][1]	
			draw_line(x, y, _x, _y, dis ,ctx)

			x = origin[0] + ps_p2[i][0]; y = origin[1] + ps_p2[i][1]
			draw_line(_x, _y, x, y, dis, ctx)
		}
	}

	tmr = setInterval(rotate, 60)

})()

