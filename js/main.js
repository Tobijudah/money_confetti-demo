function range_random(gteq, lt) {
	return gteq + Math.random() * (lt - gteq);
}
const TO_RADIAN = Math.PI / 180;
const NUM_OF_PIECES = 50;
let isDrawing = false;

const image = new Image();
image.src = "davido-dollar.png";

function setup() {
	if (isDrawing === true) return;
	const canvas = document.querySelector("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const context = canvas.getContext("2d");
	const pieces = [];
	let step = 0;
	for (let i = 0; i < NUM_OF_PIECES; i++) {
		pieces.push({
			w: 20,
			h: 10,
			x: range_random(20, canvas.width - 20),
			y: range_random(0, -500),
			vy: range_random(2.5, 3.5),
			ay: range_random(0, 0.05),
			degree: 0,
			vdegree: range_random(-5, 5),
			cyclevsy: range_random(0, 0.3),
			cyclex: range_random(0, 20),
			cyclevx: range_random(0, 0.2),
			scale: range_random(0.35, 2.5),
		});
	}

	let interval_id = setInterval(function () {
		context.clearRect(0, 0, canvas.width, canvas.height);
		if (pieces.length == 0) {
			clearInterval(interval_id);
			isDrawing = false;
			return;
		}
		// draw
		isDrawing = true;
		pieces.forEach((piece) => {
			const scaley = Math.sin(step * piece.cyclevsy) * piece.scale;

			context.save();
			context.translate(
				piece.x + Math.sin(step * piece.cyclevx) * piece.cyclex,
				piece.y
			);
			context.scale(piece.scale, scaley);
			context.rotate(piece.degree * TO_RADIAN);
			context.drawImage(image, -40, 0, 80, 35);
			context.restore();

			piece.degree += piece.vdegree;
			piece.y += piece.vy;
			piece.vy += piece.ay;
		});
		// remove
		for (let i = pieces.length - 1; i >= 0; i--) {
			if (pieces[i].y > canvas.height) {
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
