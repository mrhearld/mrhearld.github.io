'use strict';

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d'); 

var Path = function(){
    //an object to store a series of Point objects.
    this.points = [];
}
Path.prototype.draw = function() {
    //draw the bezier curve formed by the points in the Path
    var vectorPoints = []
    for (var i = 0; i < this.points.length; i++){
        vectorPoints.push(this.points[i].vec); //need the vector object from each point
    }
    var steps = 100;
    for (var i = 0; i < steps; i++) {
        //current shit way to draw these as tight series of straight lines
        //should really just implement 
        var t = i/steps;
        var pt1 = bezier(t, vectorPoints).coords();
        var pt2 = bezier(t+(1/steps), vectorPoints).coords();

        context.beginPath();
        context.moveTo(pt1[0], pt1[1]);
        context.lineTo(pt2[0], pt2[1]);
        context.stroke();
        context.strokeStyle = '#000000';
    }
}


var Point = function(x,y) {
    this.vec = new Vector(x,y);
}
Point.prototype.draw = function(){
    context.beginPath();
    context.arc(this.vec.coords()[0],this.vec.coords()[1], 5, 0, 2 * Math.PI, false);
    context.fillStyle = 'blue';
    context.fill();
}

function makePoint(evt) {
    var pos = mousePos(evt);
    if ((pos[0] > 0 && pos[0] < canvas.width) && (pos[1] > 0 && pos[1] < canvas.height)) {
        var a = new Point(pos[0],pos[1]);
        testPath.points.push(a);
    } else {
        return;
    }
}

function mousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var x,y;
    x = Math.round((evt.clientX-rect.left)/(rect.right-rect.left)*canvas.width);
    y = Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height);
    return [x,y];
}

var clearCanvas = function() {
    testPath.points = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function init() {
    var p = new Point(10,390);
    var r = new Point(10,10);
    var s = new Point(590,10);
    var q = new Point(590,390);
    testPath.points.push(p);
    testPath.points.push(r);
    testPath.points.push(s);
    testPath.points.push(q);
}

function update() {
    return;
}

function draw() {
    context.clearRect(0,0,canvas.width,canvas.height);
    context.save();

    for (var i = 0; i < testPath.points.length; i++) {
        testPath.points[i].draw();
    }

    if (testPath.points.length > 1){
        testPath.draw();
    }

    context.restore();
}


var testPath = new Path();

function main() {
    document.addEventListener('click', makePoint, false);
    document.getElementById('clearButton').addEventListener('click', clearCanvas, false);

    init();

    var loop = function () {
        update();
        draw();

        window.requestAnimationFrame(loop, canvas);
    };
    window.requestAnimationFrame(loop, canvas);
}

main();