<script>
	import random from "./lib/random";
	import NumericKeypad from "./NumericKeypad.svelte";

	const numOfDigits = 6;
	const questionNumber = random(6);

	let currentNumber = "";
	let paddedString = Array.from({length: numOfDigits}).map(c => "");

	$: console.log(paddedString)
	$: paddedString = padString(currentNumber, numOfDigits);

	function onDelete() {
		console.log("delete");
		currentNumber = currentNumber.slice(0, -1);
	}

	function onConfirm() {
		console.log("confirm");
		if (currentNumber === questionNumber) {
			console.log("correct");
		} else {
			console.log("wrong");
		}
	}

	function onPress(data) {
		const digit = data && data.detail && data.detail.value;

		if (digit !== undefined) {
			currentNumber += digit;
		}
	}

	function padString(str, n) {
		const arr = str.split('');

		return Array.from({length: n}).map((_, i) => arr[i] !== undefined ? arr[i] : "")
	}
</script>

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

	.header {
		text-align: center;
	}

	.bounds {
		margin-left: auto;
		margin-right: auto;
		max-width: 22rem;
	}

	.grid {
		height: 100vh;
		display: grid;
		grid-template-rows: 1fr 1fr;
	}

	.header {
		padding-top: 4em;
	}

	.legend {
		color: var(--color-text-light);
		font-weight: normal;
		text-transform: uppercase;
	}

	.question {
		margin-top: 0;
		color: var(--color-text-light);
	}

	.answer {
		letter-spacing: 0.25em;
	}

	.empty-char {
		color: var(--color-text-light);
	}
</style>

<div class="bounds">
	<div class="grid">
		<div class="header">
			<h3 class="legend">Type in</h3>
			<h2 class="question">{questionNumber}</h2>
			<h1 class="answer">
				{#each paddedString as ch}
					{#if ch === ""}
					<span class="empty-char">&middot;</span>
					{:else}
					<span>{ch}</span>
					{/if}
				{/each}
			</h1>
		</div>
		<NumericKeypad
			variant="circular"
			shuffle
			on:confirm="{onConfirm}"
			on:delete="{onDelete}"
			on:press="{onPress}"
		/>
	</div>
</div>
