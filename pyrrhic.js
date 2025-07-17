let track = 0;
const min_c = 0, max_c = 5;

(() => {

let tmr = undefined

const xo = 325, yo = 225, ratio = (35/30)

const _fx = (_a,_b,_g) => {

	let sa = Math.sin(_a), sb = Math.sin(_b), sg = Math.sin(_g), 
	    ca = Math.cos(_a), cb = Math.cos(_b), cg = Math.cos(_g)

	const fx = (_x, _y, _z) => ((_x * cb * cg) - (_y * cb * sg) + (_z * sb)) * ratio; 	
	return fx

}

const _fy = (_a,_b,_g) => {

	let sa = Math.sin(_a), sb = Math.sin(_b), sg = Math.sin(_g), 
	    ca = Math.cos(_a), cb = Math.cos(_b), cg = Math.cos(_g),
            sasb = sa * sb
	
	const fy = (_x, _y, _z) => ((_x * sasb * cg) + (_x * ca * sg) + (_y * ca * cg) - (_y * sasb * sg) - (_z * sa * cb)) * ratio;
	return fy

}

const draw_line = (x0, y0, x1, y1, d, ctx) => {
			
	let v = x1 - x0 == 0
	let m = v ? 0 : ( y1 - y0 ) / (x1 - x0),
            b = y0 - (m * x0), 
	    i = (x1 - x0) / d, j = (y1 - y0) / d,
	    xj = x0, yj = v ? y0 : 0 

 	for (let k = 0; k < d; k++){
		yj = v ? yj : ( m * xj ) + b
		ctx.fillRect(xj, yj, 1.5, 1.5)	
		xj += i
		if (v) yj += j;
	}
}

const sqr = {
	f1 : [[-50, -50, 0], [50, -50, 0], [50, 50, 0], [-50, 50, 0], [-50, -50, 0]],
	f2 : [[-50, -50, -100], [50, -50, -100], [50, 50, -100], [-50, 50, -100], [-50, -50, -100]],
	p1 : [[0,0],[0,0],[0,0],[0,0],[0,0]],
	p2 : [[0,0],[0,0],[0,0],[0,0],[0,0]],
	a :  [0, 0, 0], 
	ad : [0.01, 0.02, 0.11],
	d : 7
}

const pyr = {
	f1 : [[50, 50, 0], [-50, 50, 0], [-50, 50, -100], [50, 50, -100], [50, 50, 0], [0,-50,-50]],
	p1 : [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
	ad : [0.005, 0.13, 0.01],
	a :  [0, 0, 0],
	d : 12
}

const nut = {

	r1 : 50,
	r2 : 20,
	a : [0, 0, 0],
	ad : [-0.008, -0.12, -0.03],
	d: [30, 90] // (dt, du)
}

const sph = {

	r: 60,
	a : [0, 0, 0],
	ad : [0.07, -0.09, 0.06],
	d : [50, 50],
	rd : 1

}

const hyb = {
	a : [0,0,0],
	ad : [0.01,0.02,0.03],
	vd : 0.1,
	vb : 5
}

const mhyb = {
	r : 50,
	ad : [0.03, 0.06, 0.9],
	a : [0,0,0],
	oz : 75,
	u : 0,
	ud : 0.15,
	d : 75
}

const nctx = () => {

	let canvas = document.getElementById("c")
	let ctx = canvas.getContext("2d")
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = '#07ef7b'

	return ctx

}

const r_mhyb = (myhb) => {


	let ctx = nctx()
	for (let i = 0; i < mhyb["a"].length; i++){	
		mhyb["a"][i] += mhyb["ad"][i];

		if (mhyb["a"][i] > 720 || mhyb["a"][i] <  -720) mhyb["a"][i] = 0;
	}

	let _a = mhyb["a"][0], _b = mhyb["a"][1], _g = mhyb["a"][2]

	const fx = _fx(_a,_b,_g) 
	const fy = _fy(_a,_b,_g)  

	let m = 2 * Math.PI, d = mhyb["d"], dt = m / d,
		r = mhyb["r"], u = mhyb["u"]

	for (let t = 0; t < m; t += dt){
		
		let x = Math.cos(t) * r
		let y = Math.sin(t) * r
		let z = mhyb["oz"]


		let x_ = fx(x,y,z) + xo
		let y_ = fy(x,y,z) + yo
		ctx.fillRect(x_, y_, 1.5, 1.5)	

		z *= -1
		let __x = x*Math.cos(u) - y*Math.sin(u)
		let __y = x*Math.sin(u) + y*Math.cos(u)
		
		let _x = fx(__x,__y,z) + xo
		let _y = fy(__x,__y,z) + yo
		ctx.fillRect(_x, _y, 1.5, 1.5)	
		draw_line(x_, y_, _x, _y, d, ctx)
	}

	mhyb["u"] += mhyb["ud"]
	if (mhyb["u"] > 360) mhyb["u"] = 0
}

const r_hyb = (hyb) => {


	let ctx = nctx()
	for (let i = 0; i < hyb["a"].length; i++){	
		hyb["a"][i] += hyb["ad"][i];

		if (hyb["a"][i] > 100 || hyb["a"][i] <  -100) hyb["a"][i] = 0;
	}

	let _a = hyb["a"][0], _b = hyb["a"][1], _g = hyb["a"][2]

	const fx = _fx(_a,_b,_g) 
	const fy = _fy(_a,_b,_g)  

	let m = 2 * Math.PI 
	let x = 0, y = 0, z = 0, _x = 0, _y = 0
	    dt = m / 50,
      	    vb = hyb["vb"], 
	    _vd = hyb["vd"]

	for ( let v = vb * -1; v <= vb; v += _vd){

		for (let t = 0; t < m; t += dt){
			
			x = Math.cosh(v)*Math.cos(t)
			y = Math.cosh(v)*Math.sin(t) 
			z = Math.sinh(v) 
			ctx.fillRect(fx(x,y,z) + xo, fy(x,y,z) + yo, 1.5, 1.5)	

		}
		
	}

}

const r_sph = (sph) => {

	let ctx = nctx()
	for (let i = 0; i < sph["a"].length; i++){	
		sph["a"][i] += sph["ad"][i];

		if (sph["a"][i] > 100 || sph["a"][i] <  -100) sph["a"][i] = 0;
	}

	let _a = sph["a"][0], _b = sph["a"][1], _g = sph["a"][2]

	const fx = _fx(_a,_b,_g)  
	const fy = _fy(_a,_b,_g)  

	let m = 2 * Math.PI
	let dt = m / sph["d"][0], du = m / sph["d"][1]
	let x = 0, y = 0, z = 0, _r = sph["r"], _x = 0, _y = 0

	for (let t = 0; t < m; t += dt){
		for (let u = 0; u < m; u += du){
			x = (_r * Math.sin(t) * Math.cos(u))
			y = (_r * Math.sin(t) * Math.sin(u))
			z = _r * Math.cos(t)

			_x = xo + fx(x,y,z)
			_y = yo + fy(x,y,z)

			ctx.fillRect(_x, _y, 1.5, 1.5)	

		}
	}
	sph["r"] -= sph["rd"]
	if (sph["r"] < 25 || sph["r"] > 190) 
		sph["rd"] *= -1
}

const r_sqr = (sqr) => {

	let ctx = nctx()
	let origin = [xo, yo]
	let i = null, x = 0, y = 0, z = 0

	for (i = 0; i < sqr["a"].length; i++){	
		sqr["a"][i] += sqr["ad"][i];

		if (sqr["a"][i] > 100 || sqr["a"][i] <  -100) sqr["a"][i] = 0;
	}

	let _a = sqr["a"][0], _b = sqr["a"][1], _g = sqr["a"][2]

	const fx = _fx(_a,_b,_g)  
	const fy = _fy(_a,_b,_g)  

	let ps_f1 = sqr["f1"], ps_f2 = sqr["f2"],
	    ps_p1 = sqr["p1"], ps_p2 = sqr["p2"]

	for (i = 0; i < ps_f1.length; i++){

		x = ps_f1[i][0]; y = ps_f1[i][1]; z = ps_f1[i][2] 

		ps_p1[i][0] = fx(x,y,z)
		ps_p1[i][1] = fy(x,y,z)

		x = ps_f2[i][0]; y = ps_f2[i][1]; z = ps_f2[i][2] 

		ps_p2[i][0] = fx(x,y,z)
		ps_p2[i][1] = fy(x,y,z)
	}

	let dis = sqr["d"]	
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

const r_pyr = (pyr) => {

	let ctx = nctx()
	let origin = [xo, yo]
	let i = null, x = 0, y = 0, z = 0

	for (i = 0; i < pyr["a"].length; i++){	
		if ( i != 1){
			pyr["ad"][i] = pyr["a"][i] > 0.35 ? -1 * pyr["ad"][i] : pyr["a"][i] < -0.35 ? -1 * pyr["ad"][i] : pyr["ad"][i] 
			pyr["a"][i] += pyr["ad"][i]

		} else {

			pyr["a"][i] += pyr["ad"][i];
			if (pyr["a"][i] > 100 || pyr["a"][i] <  -100) pyr["a"][i] = 0;
		}
	}

	let _a = pyr["a"][0], _b = pyr["a"][1], _g = pyr["a"][2]

	const fx = _fx(_a,_b,_g)  
	const fy = _fy(_a,_b,_g)  

	let ps_f1 = pyr["f1"], ps_p1 = pyr["p1"]
	for (i = 0; i < ps_f1.length; i++){

		x = ps_f1[i][0]; y = ps_f1[i][1]; z = ps_f1[i][2] 

		ps_p1[i][0] = fx(x,y,z)
		ps_p1[i][1] = fy(x,y,z)

	}
	let pi = ps_p1[ps_p1.length - 1]
	let dis = pyr["d"]	

	for (i = 1; i < ps_p1.length - 1; i++){

		x = origin[0] + ps_p1[i-1][0]; y = origin[1] + ps_p1[i-1][1]	
		_x = origin[0] + ps_p1[i][0]; _y = origin[1] + ps_p1[i][1]
		
		draw_line(x, y, _x, _y, dis, ctx)

		_x = origin[0] + pi[0]; _y = origin[1] + pi[1]	
		draw_line(x, y, _x, _y, dis ,ctx)
	}
	ctx.fillRect(_x, _y, 1.5, 1.5)	
}

const r_nut = (nut) => {

	let ctx = nctx()
	let x = 0, y = 0, z = 0, _x = 0, _y = 0

	let _a = nut["a"][0], _b = nut["a"][1], _g = nut["a"][2]

	const fx = _fx(_a,_b,_g)  
	const fy = _fy(_a,_b,_g)  

	
	for (let i = 0; i < nut["a"].length; i++){	
		nut["a"][i] += nut["ad"][i];

		if (nut["a"][i] > 100 || nut["a"][i] <  -100) nut["a"][i] = 0;
	}
	let R = nut["r1"], r = nut["r2"]

	let m = 2 * Math.PI
	let dr1 = m / nut["d"][0], dr2 = m / nut["d"][1]

	for(let t = 0; t < m; t += dr1){

		for(let u = 0; u < m; u += dr2){
			x = (Math.cos(u) * R) + (r * Math.sin(t) * Math.cos(u)) 
			y = (Math.sin(u) * R) + (r * Math.sin(t) * Math.sin(u)) 
			z = (r * Math.cos(t))

			_x = fx(x,y,z) + xo
			_y = fy(x,y,z) + yo
			ctx.fillRect(_x, _y, 1.5, 1.5)	
		}
	}
}

const select_view = () => {
	
	if (tmr !== undefined){
		clearInterval(tmr)
	}
	
	switch(track){
		
		case 5: 
			tmr = setInterval(r_mhyb, 65, mhyb)
			break;
		case 2: 
			tmr = setInterval(r_hyb, 65, hyb)
			break;
		case 0: 
			tmr = setInterval(r_sqr, 65, sqr)
			break;
		case 1:
			tmr = setInterval(r_pyr, 65, pyr)
			break;
		case 4: 
			tmr = setInterval(r_nut, 65, nut)
			break;
		case 3: 
			tmr = setInterval(r_sph, 65, sph)
			break;
	}
}

const move_left = (event) => {

	track = track - 1 >= min_c ? track - 1 : max_c
	select_view()
}

const  move_right = (event) => {
	track = track + 1 <= max_c ? track + 1 : min_c
	select_view()
}

select_view()
document.getElementById("b1").addEventListener("click", move_left, false)
document.getElementById("b2").addEventListener("click", move_right, false)

})();

