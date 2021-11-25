function range_random(gteq, lt) {
	return gteq + Math.random() * (lt - gteq);
}
var TO_RADIAN = Math.PI / 180;
var NUM_OF_PIECES = 50;

var image = new Image();
image.src = "image.png";

function setup() {
	var canvas = document.querySelectorAll("canvas#confetti")[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var context = canvas.getContext("2d");
	var pieces = [];
	var step = 0;
	for (var i = 0; i < NUM_OF_PIECES; i++) {
		pieces.push({
			w: 20,
			h: 10,
			x: range_random(20, canvas.width - 20),
			y: range_random(0, -500),
			vy: range_random(2.5, 3.5),
			ay: range_random(0, 0.1),
			degree: 0,
			vdegree: range_random(-5, 5),
			cyclevsy: range_random(0, 0.4),
			cyclex: range_random(0, 20),
			cyclevx: range_random(0, 0.2),
		});
	}

	interval_id = setInterval(function () {
		var piece;
		context.clearRect(0, 0, canvas.width, canvas.height);
		// if (pieces.length == 0) {
		// 	clearInterval(interval_id);
		// 	setup();
		// 	return;
		// }
		// draw
		for (var i in pieces) {
			piece = pieces[i];
			var scaley = Math.sin(step * piece.cyclevsy);

			context.save();
			context.translate(
				piece.x + Math.sin(step * piece.cyclevx) * piece.cyclex,
				piece.y
			);
			context.scale(1, scaley);
			context.rotate(piece.degree * TO_RADIAN);
			context.drawImage(image, -40, 0, 80, 35);
			context.restore();

			piece.degree += piece.vdegree;
			piece.y += piece.vy;
			piece.vy += piece.ay;
		}
		// remove
		for (var i = pieces.length - 1; i >= 0; i--) {
			piece = pieces[i];
			if (piece.y > canvas.height) {
				pieces.splice(i, 1);
			}
		}
		step++;
	}, 1000 / 60);
}

window.addEventListener("load", () => {
	const button = document.querySelector("#button");

	button.addEventListener("click", () => {
		setup();
	});
});
