var sun = new Image();
var moon = new Image();
var earth = new Image();
var scale = 800/300;
function init(){
	sun.src = 'assets/images/big_sun.png';
	moon.src = 'assets/images/big_moon.png';
	earth.src = 'assets/images/big_earth.png';
	window.requestAnimationFrame(draw);
}

function angle(time){
	// returns some percent of 2pi based on the time given
	var second_ratio = time.getSeconds()/60;
	var millisecond_ratio = time.getMilliseconds()/60000;
	return (second_ratio+millisecond_ratio)*2*Math.PI;
}

function draw(){
	var ctx = document.getElementById('canvas').getContext('2d');

	ctx.globalCompositeOperation = 'destination-over';
	ctx.clearRect(0,0,300*scale,300*scale); // clear canvas

	ctx.fillStyle = 'rgba(0,0,0,0.4)';
	ctx.strokeStyle = 'rgba(0,153,255,0.4)';
	ctx.save();  //saves coordinate system for future reversion
	ctx.translate(150*scale,150*scale); //transforms coordinate system so that 0,0 is center of the canvas

	// Earth
	var time = new Date();
	var rot_factor = angle(time);

	ctx.rotate(rot_factor);
	ctx.translate(105*scale,0); //transforms coordinate system so that 0,0 is center of earth
	ctx.fillRect(0,-12*scale,50*scale,24*scale); // Shadow
	ctx.drawImage(earth,-12*scale,-12*scale);

	// Moon
	ctx.rotate(rot_factor*10);
	ctx.translate(0,28.5*scale); //transforms coordinate system so that 0,0 is center of moon
	ctx.drawImage(moon,-3.5*scale,-3.5*scale);

	ctx.restore(); // transforms coordinate system back to the saved one

	ctx.beginPath();
	ctx.arc(150*scale,150*scale,105*scale,0,Math.PI*2,false); // Earth orbit
	ctx.stroke();

	ctx.drawImage(sun,0,0,300*scale,300*scale);
	window.requestAnimationFrame(draw);
}

init();