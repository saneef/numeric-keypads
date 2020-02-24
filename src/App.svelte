<script>
	import NumericKeypad from "./NumericKeypad.svelte";

	export let name;
</script>

<style>
	:global(html) {
		--color-dark: #212529;
		--color-light: #f8f9fa;

		--color-success: #37b24d;
		--color-warning: #f59f00;
		--color-danger: #f03e3e;

		color: var(--color-dark);
	}

	:global(body) {
		margin: 0;
		font-family: system-ui;
	}

	div {
		margin-left: auto;
		margin-right: auto;
		max-width: 75ch;
	}
</style>

<div>
	<NumericKeypad />
</div>
