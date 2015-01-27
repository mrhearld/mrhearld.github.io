'use strict';

//make my own vector object.
//just 2d, n dim support not needed for my little project.
var Vector = function(x,y) {
	this.x = x;
	this.y = y;
}

Vector.prototype.coords = function() {
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