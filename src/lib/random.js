export default function random(n) {
	return Array.from({ length: n }).reduce(
		(acc, n) => acc + Math.floor(Math.random() * 10),
		""
	);
}
