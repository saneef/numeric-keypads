<script>
	import NumericKeypad from "./NumericKeypad.svelte";
</script>

<style>
	:global(html) {
		--color-dark: #212529;
		--color-light: #f8f9fa;
		--color-border: #e9ecef;

		--color-success: #37b24d;
		--color-warning: #f59f00;
		--color-danger: #f03e3e;

		--border-width: 1px;

		color: var(--color-dark);
	}

	:global(body) {
		margin: 0;
		font-family: system-ui;
	}

	div {
		margin-left: auto;
		margin-right: auto;
		max-width: 36rem;
	}
</style>

<div>
	<NumericKeypad />
	<NumericKeypad variant="bordered"/>
	<NumericKeypad variant="circular"/>
</div>
