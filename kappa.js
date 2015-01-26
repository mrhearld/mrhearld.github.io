'use strict';

//have to make my own vector object.
var Vector = function(x,y) {
	this.x = x;
	this.y = y;
}

Vector.prototype.coords = function() {
	// console.log(this.x, this.y);
	return [this.x,this.y];
}

Vector.prototype.add = function(vec) {
	return new Vector(this.x+vec.x, this.y+vec.y);
}

Vector.prototype.sub = function(vec) {
	return new Vector(this.x-vec.x, this.y-vec.y);
}

Vector.prototype.mul = function(num) {
	return new Vector(num*this.x, num*this.y);
}


//parameterized line between p1 and p2.
function linearInterp(t, p1, p2) {
	return p1.mul(1-t).add(p2.mul(t));
}

function bezReduce(t, pts) {
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
	while (pts.length > 1) {
		pts = bezReduce(t, pts);
	}
	return pts[0];
}

function newPts(deg) {
	var pts = []
	for (var i = 0; i < deg+1; i++) {
		pts.push(new Vector(Math.random()*500 +50, Math.random()*300 + 50))
	}
	return pts;
}

var p = new Vector(200,50);
var q = new Vector(500, 350);
var r = new Vector(80, 300);
var s = new Vector(300,200);

var pts = [p, r, s, q];

// var bezCoords = [];

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

document.getElementById('magic').addEventListener('click', function() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	pts = newPts(3);
	newCurve(pts);
	}, false);

function newCurve(pts) {
	for (var i = 0; i < pts.length - 1; i++) {
		context.beginPath();
		context.setLineDash([5]);
		context.moveTo(pts[i].coords()[0], pts[i].coords()[1]);
		context.lineTo(pts[i+1].coords()[0], pts[i+1].coords()[1]);
		context.strokeStyle = '#ff0000';
		context.stroke();
	}

	for (var i = 0; i < pts.length; i++) {
		if (i == 0) {
			context.beginPath();
			context.arc(pts[i].coords()[0], pts[i].coords()[1], 5, 0, 2 * Math.PI, false);
			context.fillStyle = 'green';
			context.fill()
		} else if (i == pts.length - 1) {
			context.beginPath();
			context.arc(pts[i].coords()[0], pts[i].coords()[1], 5, 0, 2 * Math.PI, false);
			context.fillStyle = 'blue';
			context.fill()
		} else {
			context.beginPath();
			context.arc(pts[i].coords()[0], pts[i].coords()[1], 5, 0, 2 * Math.PI, false);
			context.fillStyle = 'red';
			context.fill()		
		}
	}


	for (var t = 0; t < 1.00; t += 0.01) {
		var pt1 = bezier(t, pts).coords();
		var pt2 = bezier(t+0.01, pts).coords();

		context.beginPath();
		context.moveTo(pt1[0], pt1[1]);
		context.lineTo(pt2[0], pt2[1]);
		context.stroke();
		context.strokeStyle = '#000000';
	}
}

