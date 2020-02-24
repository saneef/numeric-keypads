<style>
	@keyframes shake {
	  from,
	  to {
	    transform: translate3d(0, 0, 0);
	  }

	  10%,
	  30%,
	  50%,
	  70%,
	  90% {
	    transform: translate3d(-10px, 0, 0);
	  }

	  20%,
	  40%,
	  60%,
	  80% {
	    transform: translate3d(10px, 0, 0);
	  }
	}

	.hud {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.hud > * {
		display: inline-block;
	}

	.legend {
		color: var(--color-text-light);
		font-weight: normal;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.question {
		margin-top: 0;
		color: var(--color-text-light);
		font-weight: normal;
	}

	.answer {
		letter-spacing: 0.125em;
		margin-top: 1rem;
	}

	.empty-char {
		opacity: 0.5;
	}

	.hasError {
		animation-name: shake;
		animation-duration: 600ms;
		color: var(--color-danger);
	}
</style>
<script>
	import random from "./lib/random";
	import NumericKeypad from "./NumericKeypad.svelte";

	export let numOfDigits = 6;
	let hasError = true;
	let disabled = false;
	const questionNumber = random(numOfDigits);

	let currentNumber = "";
	let paddedString = Array.from({length: numOfDigits}).map(c => "");

	$: console.log(paddedString)
	$: {
		paddedString = padString(currentNumber, numOfDigits);
		hasError = false;
	};
	$: disabled = currentNumber.length >= numOfDigits;

	function onDelete() {
		currentNumber = currentNumber.slice(0, -1);
	}

	function onConfirm() {
		if (currentNumber === questionNumber) {
			console.log("correct");
		} else {
			console.log("wrong");
			hasError = true;
		}
	}

	function onPress(data) {
		const digit = data && data.detail && data.detail.value;

		if (digit !== undefined && currentNumber.length < numOfDigits) {
			currentNumber += digit;
		}
	}

	function padString(str, n) {
		const arr = str.split('');

		return Array.from({length: n}).map((_, i) => arr[i] !== undefined ? arr[i] : "")
	}
</script>
<div class="hud">
	<h3 class="legend">Type</h3>
	<h2 class="question">{questionNumber}</h2>
	<h1 class="answer" class:hasError>
		<span>{#each paddedString as ch} {#if ch === ""}
			<span class="empty-char">&middot;</span>
			{:else}
			<span>{ch}</span>
			{/if} {/each}</span>
	</h1>
</div>
<NumericKeypad
	variant="circular"
	shuffle
	{disabled}
	on:confirm="{onConfirm}"
	on:delete="{onDelete}"
	on:press="{onPress}"
/>
