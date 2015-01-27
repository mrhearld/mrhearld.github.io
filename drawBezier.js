'use strict';

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d'); 

var Path = function(){
    //an object to store a series of Point objects.
    this.points = [];
    this.select = null;
}
Path.prototype.draw = function() {
    //draw the bezier curve formed by the points in the Path
    var vectorPoints = []
    var easyRead = []
    for (var i = 0; i < this.points.length; i++){
        vectorPoints.push(this.points[i].vec); //need the vector object from each point
        easyRead.push(this.points[i].vec.coords());
    }

    context.strokeStyle = 'red';
    context.setLineDash([5]);
    context.lineWidth = 1;
    for (var i = 0; i< easyRead.length -1; i++){
        var pt1 = easyRead[i];
        var pt2 = easyRead[i+1]
        context.beginPath();
        context.moveTo(pt1[0], pt1[1]);
        context.lineTo(pt2[0], pt2[1]);
        context.stroke();
    }

    var steps = 100;
    context.strokeStyle = 'black';
    context.setLineDash([0])
    context.lineWidth = 4;
    for (var i = 0; i < steps; i++) {
        //current shit way to draw these as tight series of straight lines
        //should really look into subdividing and redrawing like that.
        var t = i/steps;
        var pt1 = bezier(t, vectorPoints).coords();
        var pt2 = bezier(t+(1/steps), vectorPoints).coords();

        context.beginPath();
        context.moveTo(pt1[0], pt1[1]);
        context.lineTo(pt2[0], pt2[1]);
        context.stroke();
    }

}


var Point = function(x,y) {
    this.vec = new Vector(x,y);
    this.radius = 5;
}
Point.prototype.draw = function(color){
    context.beginPath();
    context.arc(this.vec.coords()[0],this.vec.coords()[1], this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
}
Point.prototype.contains = function(x,y) {
    var fudge = 2;
    var xdif = Math.abs(x - this.vec.coords()[0]);
    var ydif = Math.abs(y - this.vec.coords()[1]);
    if (xdif <= this.radius+fudge && ydif <= this.radius+fudge){
        return true;
    }
}

var num_clicks = 0;
var overlaps = false;
function makePoint(evt) {
    var pos = mousePos(evt);
    var x = pos[0];
    var y = pos[1];
    if ((x > 0 && x < canvas.width) && (y > 0 && y < canvas.height)) {
        if ((x > 0 && x < canvas.width) && (y > 0 && y < canvas.height)) {
            for (var i = 0; i < testPath.points.length; i++){
                if (testPath.points[i].contains(x,y)){
                    overlaps = true;
                    testPath.select = testPath.points[i];
                }
            }
        }
        if (overlaps === false) {
            num_clicks += 1;
            var a = new Point(x,y);
            if (num_clicks <= 2){
                testPath.points.push(a);
            } else {
                a.radius = 2.5;
                testPath.points.splice(num_clicks-2,0,a);
            }
        } else {
            return;
        }
    }
}

function testDrag(evt) {
    if (overlaps) {
        var pos = mousePos(evt);
        testPath.select.vec = new Vector(pos[0], pos[1]);
    }
}

function clearOverlaps(evt){
    overlaps = false;
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
    num_clicks = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function init() {
    // var p = new Point(10,390);
    // var r = new Point(10,10);
    // var s = new Point(590,10);
    // var q = new Point(590,390);
    // testPath.points.push(p);
    // testPath.points.push(r);
    // testPath.points.push(s);
    // testPath.points.push(q);
}


function draw() {
    context.clearRect(0,0,canvas.width,canvas.height);
    // context.save();
    for (var i = 0; i < testPath.points.length; i++) {
        if (i === 0 || i === testPath.points.length -1) {
            testPath.points[i].draw('blue');
        } else {
            testPath.points[i].draw('red');
        }
    }
    if (testPath.points.length > 1){
        testPath.draw();
    }
    // context.restore();
}


var testPath = new Path();

function main() {
    document.addEventListener('mousedown', makePoint, false);
    document.addEventListener('mouseup', clearOverlaps, false);
    document.getElementById('clearButton').addEventListener('click', clearCanvas, false);
    canvas.addEventListener('mousemove', testDrag);

    init();

    var loop = function() {
        draw();
        window.requestAnimationFrame(loop, canvas);
    };
    window.requestAnimationFrame(loop, canvas);
}

main();