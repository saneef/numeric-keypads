<style>
	:global(html) {
		--color-gray-0: #f8f9fa;
		--color-gray-1: #f1f3f5;
		--color-gray-2: #e9ecef;
		--color-gray-3: #dee2e6;
		--color-gray-4: #ced4da;
		--color-gray-5: #adb5bd;
		--color-gray-6: #868e96;
		--color-gray-7: #495057;
		--color-gray-8: #343a40;
		--color-gray-9: #212529;

		--color-border: var(--color-gray-4);

		--color-success: #37b24d;
		--color-warning: #f59f00;
		--color-danger: #f03e3e;
		--color-text: var(--color-gray-9);
		--color-text-light: var(--color-gray-6);

		--border-width: 1px;

		color: var(--color-text);
	}

	:global(body) {
		margin: 0;
		font-family: system-ui;
		background-color: var(--color-gray-0);
	}

	.bounds {
		margin-left: auto;
		margin-right: auto;
		max-width: 24rem;
	}

	.grid {
		height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr;
	}

	.main {
		align-self: end;
	}
</style>

<script>
	import KeypadTester from "./KeypadTester.svelte";
</script>

<div class="bounds">
	<div class="grid">
		<div class="header">
			<div>1 ⁄ 12</div>
		</div>
		<div class="main">
			<KeypadTester numOfDigits={6} />
		</div>
	</div>
</div>
