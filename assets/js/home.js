const svg = document.getElementById('svg');
const width = window.innerWidth;
const height = window.innerHeight;

svg.setAttribute('width', width);
svg.setAttribute('height', height);

// Create moving lines
const numLines = 40;
let lines = [];

for (let i = 0; i < numLines; i++) {
	const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
	const hue = Math.random() * 360;
	const saturation = 70 + Math.random() * 20;
	const lightness = 60 + Math.random() * 20;
	const alpha = 0.8 + Math.random() * 0.2;
	const color = { hue, saturation, lightness, alpha };

	line.setAttribute("stroke-width", "2");
	line.setAttribute("stroke", `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`);
	svg.appendChild(line);

	lines.push({
		element: line,
		x1: Math.random() * width,
		y1: Math.random() * height,
		x2: Math.random() * width,
		y2: Math.random() * height,
		dx1: (Math.random() - 0.5) * 2,
		dy1: (Math.random() - 0.5) * 2,
		dx2: (Math.random() - 0.5) * 2,
		dy2: (Math.random() - 0.5) * 2,
		color: color
	});
}

// Animate lines
function animate() {
	for (let line of lines) {
		line.x1 += line.dx1;
		line.y1 += line.dy1;
		line.x2 += line.dx2;
		line.y2 += line.dy2;

		// Bounce off edges
		if (line.x1 < 0 || line.x1 > width) line.dx1 *= -1;
		if (line.y1 < 0 || line.y1 > height) line.dy1 *= -1;
		if (line.x2 < 0 || line.x2 > width) line.dx2 *= -1;
		if (line.y2 < 0 || line.y2 > height) line.dy2 *= -1;

		line.element.setAttribute('x1', line.x1);
		line.element.setAttribute('y1', line.y1);
		line.element.setAttribute('x2', line.x2);
		line.element.setAttribute('y2', line.y2);

		// Dynamic opacity based on length
		let length = Math.hypot(line.x2 - line.x1, line.y2 - line.y1);
		let alpha = Math.min(length / 100, 1);
		line.color.hue = (line.color.hue + 0.2) % 360;
		const { hue, saturation, lightness } = line.color;
		line.element.setAttribute('stroke', `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`);
	}

	requestAnimationFrame(animate);
}

animate();

// Responsive resize
window.addEventListener('resize', () => {
	width = window.innerWidth;
	height = window.innerHeight;
	svg.setAttribute('width', width);
	svg.setAttribute('height', height);
});