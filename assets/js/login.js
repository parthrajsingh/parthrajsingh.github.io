let r = 0, g = 0, b = 0, a = 1;
let tr = Math.random() * 255;
let tg = Math.random() * 255;
let tb = Math.random() * 255;
let ta = Math.random() * 0.8 + 0.2;
let speed = 0.05;

function animateRGBA() {
	r += (tr - r) * speed;
	g += (tg - g) * speed;
	b += (tb - b) * speed;
	a += (ta - a) * speed;

	// When close enough, pick new random targets
	if (Math.abs(r - tr) < 1) tr = Math.random() * 255;
	if (Math.abs(g - tg) < 1) tg = Math.random() * 255;
	if (Math.abs(b - tb) < 1) tb = Math.random() * 255;
	if (Math.abs(a - ta) < 0.01)
		ta = Math.random() * 0.8 + 0.2;

	// Set the background color using RGBA
	document.body.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;

	// Schedule the next frame for smooth animation
	requestAnimationFrame(animateRGBA);
}

// Start the background color animation
animateRGBA();
