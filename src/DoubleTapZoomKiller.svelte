<script>
	// Based on https://medium.com/building-blocks/code-snippet-4accfa29b75d
	let startTime = 0;

	function ingoreDoubleTap(e) {
		let now = +new Date();
		if (startTime + 500 > now) {
			e.preventDefault();
		}

		startTime = now;
	}
</script>

<svelte:window on:touchstart="{ingoreDoubleTap}" />
