var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
function main(){
	window.requestAnimationFrame(draw);
}
var t = 0;

Thing = {

}

function draw(){
	t++;

	// if (t %60 === 0) {
	// 	ctx.clearRect(0,0,canvas.width,canvas.height);
	// 	console.log(t);
	// };
	window.requestAnimationFrame(draw);

}

main();