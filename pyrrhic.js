
let track = 0;

(() => {


//const canvas = document.getElementById("c")
let tmr = undefined

const xo = 325, yo = 225, r = (35/30)

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

const r_sqr = (sqr) => {

	let canvas = document.getElementById("c")
	let ctx = canvas.getContext("2d")
	let origin = [xo, yo]
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = '#07ef7b'

	let i = null, x = 0, y = 0, z = 0

	for (i = 0; i < sqr["a"].length; i++){	
		sqr["a"][i] += sqr["ad"][i];

		if (sqr["a"][i] > 100 || sqr["a"][i] <  -100) sqr["a"][i] = 0;
	}

	let _a = sqr["a"][0], _b = sqr["a"][1], _g = sqr["a"][2]

	let sa = Math.sin(_a), sb = Math.sin(_b), sg = Math.sin(_g), 
	    ca = Math.cos(_a), cb = Math.cos(_b), cg = Math.cos(_g),
	    sasb = sa * sb
	
	const fx = (_x, _y, _z) => ((_x * cb * cg) - (_y * cb * sg) + (_z * sb)) * r; 
	const fy = (_x, _y, _z) => ((_x * sasb * cg) + (_x * ca * sg) + (_y * ca * cg) - (_y * sasb * sg) - (_z * sa * cb)) * r;

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
	//console.log(ps_p1)
}

const r_pyr = (pyr) => {

	let canvas = document.getElementById("c")
	let ctx = canvas.getContext("2d")
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = '#07ef7b'

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

	let sa = Math.sin(_a), sb = Math.sin(_b), sg = Math.sin(_g), 
	    ca = Math.cos(_a), cb = Math.cos(_b), cg = Math.cos(_g),
            sasb = sa * sb
	
	const fx = (_x, _y, _z) => ((_x * cb * cg) - (_y * cb * sg) + (_z * sb)) * r; 
	const fy = (_x, _y, _z) => ((_x * sasb * cg) + (_x * ca * sg) + (_y * ca * cg) - (_y * sasb * sg) - (_z * sa * cb)) * r;


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

const select_view = () => {
	
	if (tmr !== undefined){
		clearInterval(tmr)
	}
	
	if (track == 0){
		tmr = setInterval(r_sqr, 65, sqr)

	} else if (track == 1){
		tmr = setInterval(r_pyr, 65, pyr)
	}
}

const move_left = (event) => {

	track = track - 1 >= 0 ? track - 1 : 1
	select_view()

}

const  move_right = (event) => {
	track = track + 1 <= 1 ? track + 1 : 0
	select_view()
}

select_view()
document.getElementById("b1").addEventListener("click", move_left, false)
document.getElementById("b2").addEventListener("click", move_right, false)

})();

/*

*/
