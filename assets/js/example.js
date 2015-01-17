var sun = new Image();
var moon = new Image();
var earth = new Image();
function init(){
	sun.src = 'assets/images/sun.png';
	moon.src = 'assets/images/moon.png';
	earth.src = 'assets/images/earth.png';
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
	ctx.clearRect(0,0,300,300); // clear canvas

	ctx.fillStyle = 'rgba(0,0,0,0.4)';
	ctx.strokeStyle = 'rgba(0,153,255,0.4)';
	ctx.save();  //saves coordinate system for future reversion
	ctx.translate(150,150); //transforms coordinate system so that 0,0 is center of the canvas

	// Earth
	var time = new Date();
	var rot_factor = angle(time);

	ctx.rotate(rot_factor);
	ctx.translate(105,0); //transforms coordinate system so that 0,0 is center of earth
	ctx.fillRect(0,-12,50,24); // Shadow
	ctx.drawImage(earth,-12,-12);

	// Moon
	ctx.rotate(rot_factor*10);
	ctx.translate(0,28.5); //transforms coordinate system so that 0,0 is center of moon
	ctx.drawImage(moon,-3.5,-3.5);

	ctx.restore(); // transforms coordinate system back to the saved one

	ctx.beginPath();
	ctx.arc(150,150,105,0,Math.PI*2,false); // Earth orbit
	ctx.stroke();

	ctx.drawImage(sun,0,0,300,300);
	window.requestAnimationFrame(draw);
}

init();