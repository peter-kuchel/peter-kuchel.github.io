
(() => {
	
	let canvas = document.getElementById("c")
	let tmr = undefined

	const xo = 325, yo = 225, zo = 0, so = 0, Z1 = 35, Z2 = 20
	let origin = [(xo + (so / 2) + (so / 2)), (yo + (so / 2) + (so / 2))]

	let a = [-50, -50, 0], b = [50, -50, 0], c = [50, 50, 0], d = [-50, 50, 0],
	    e = [-50, -50, -100], f = [50, -50, -100], g = [50, 50, -100], h = [-50, 50, -100]

	let ps_f1 = [a, b, c, d, a]
	let ps_f2 = [e, f, g, h, e]
	let ps_p1 = [[0,0],[0,0],[0,0],[0,0],[0,0]]
	let ps_p2 = [[0,0],[0,0],[0,0],[0,0],[0,0]]

	let _a = 0, _b = 0, _g = 0
	const dis = 7	

	const rotate = () => {
		
		let ctx = canvas.getContext("2d")
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		_a += 0.0
		_b += -0.0
		_g += 0.02

		let sa = Math.sin(_a), sb = Math.sin(_b), sg = Math.sin(_g), 
		    ca = Math.cos(_a), cb = Math.cos(_b), cg = Math.cos(_g)
		
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

		//let cpcom = cp * com, stsp = st * sp, spct = sp * ct
		let cbcg = cb * cg, sasb = sa * sb, sbca = sb * ca
		let _x = 0, _y = 0, _z = 0, xp = 0, yp = 0, zp = 0
		for (i = 0; i < ps_f1.length; i++){
			
			_x = ps_f1[i][0], _y = ps_f1[i][1], _z = ps_f1[i][2] 
			xp = (_x * cbcg) + (_y * sasb * cg) - (_y * sg * ca) + (_z * sa * sg) + (_z * sbca * cg)
			yp = (_x * cbcg) + (_y * sasb * sg) + (_y * ca * cg) - (_z * sa * cg) + (_z * sbca * sg)
			//zp = (-_x * sp) + (_y * st * cp) + (_z * ct * cp)

			ps_p1[i][0] = (Z1 * xp) / ( Z2) 
			ps_p1[i][1] = (Z1 * yp) / ( Z2) 

			_x = ps_f2[i][0], _y = ps_f2[i][1], _z = ps_f2[i][2] 
			xp = (_x * cbcg) + (_y * sasb * cg) - (_y * sg * ca) + (_z * sa * sg) + (_z * sbca * cg)
			yp = (_x * cbcg) + (_y * sasb * sg) + (_y * ca * cg) - (_z * sa * cg) + (_z * sbca * sg)
			//zp = (-_x * sp) + (_y * st * cp) + (_z * ct * cp)


			ps_p2[i][0] = (Z1 * xp) / ( Z2) 
			ps_p2[i][1] = (Z1 * yp) / ( Z2) 
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

