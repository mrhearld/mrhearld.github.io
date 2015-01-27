//points are 2d vectors.
function linearInterp(t, p1, p2) {
	// takes p1 p2, two points, and a value t in [0,1] 
	//returns a point t*100% along the interpolation of p1 to p2.
	return p1.mul(1-t).add(p2.mul(t));
}

function bezReduce(t, pts) {
	//takes a value t in [0,1] and a list of points pts
	//returns a list of points that represent the
	//linear interpolations at val t between each pair of given points in pts
	var interps = [];
	if (pts.length > 1) {
		for (var i = 0; i < pts.length - 1; i++) { 
			var temp_pt = linearInterp(t, pts[i], pts[i+1])
			interps.push(temp_pt);
		}
	}
	return interps;
}

function bezier(t, pts) {
	//recursively linear interpolates a series of points,
	//ending with a final point, a point on our bezier curve.
	//just de Casteljau's algorithm
	while (pts.length > 1) {
		pts = bezReduce(t, pts);
	}
	return pts[0];
}

function newPts(deg) {
	//make some random points, just for testing.
	var pts = []
	for (var i = 0; i < deg+1; i++) {
		pts.push(new Vector(Math.random()*500 +50, Math.random()*300 + 50))
	}
	return pts;
}