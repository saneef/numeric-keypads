<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(4, 1fr);
		grid-auto-flow: row dense;
	}

	button {
		background: none;
		border: 0;
		color: inherit;
		/* cursor: default; */
		font: inherit;
		line-height: normal;
		overflow: visible;
		padding: 0;
		appearance: button; /* for input */
		user-select: none;

		font-size: 2em;
		font-weight: bold;
		margin-top: 0;
	}

	button:active {
		background-color: var(--color-border);
	}

	button[disabled] {
		color: var(--color-gray-3);
		border-color: currentColor;
		pointer-events: none;
	}

	.btn {
		min-height: 2.5em;
	}

	.btn--last-digit {
		grid-column: 2;
	}

	.btn--del {
		grid-column: 1;
		color: var(--color-warning);
	}

	.btn--confirm {
		grid-column: 3;
		color: var(--color-success);
	}

	.icon {
		max-width: 0.95em;
		display: inline-block;
		vertical-align: middle;
	}

	.bordered {
		border: 1px solid var(--color-border);
		border-right-width: 0;
		border-bottom-width: 0;
	}

	.bordered .btn {
		border: 1px solid var(--color-border);
		border-left-width: 0;
		border-top-width: 0;
	}

	.circular {
		justify-items: center;
	}

	.circular .btn {
		min-height: auto;
		height: 2.25em;
		width: 2.25em;
		border: 1px solid var(--color-border);
		margin: 0.125em;
		border-radius: 2000px;
	}

	.bordered button[disabled],
	.circular button[disabled] {
		background-color: var(--color-gray-1);
	}
</style>

<script>
	import { createEventDispatcher } from "svelte";

	import Check from "./icons/Check.svg.svelte";
	import Backspace from "./icons/Backspace.svg.svelte";
	import shuffleFn from "./lib/shuffle";

	export let variant = "no-border";
	export let shuffle = false;
	export let disabled = false;

	$: console.log("disabled", disabled);

	const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
	const shuffledDigits = shuffle ? shuffleFn(digits) : digits;

	const dispatch = createEventDispatcher();

	function onConfirm() {
		dispatch("confirm");
	}

	function onDelete() {
		dispatch("delete");
	}

	function onPress(v) {
		dispatch("press", { value: v });
	}
</script>

<div class="grid {variant}">
	{#each shuffledDigits as digit}
	<button
		{disabled}
		class="btn {digit === shuffledDigits[shuffledDigits.length -1] ?
'btn--last-digit' : ''}"
		on:click="{e => onPress(digit)}"
	>
		{digit}
	</button>
	{/each}
	<button class="btn btn--icon btn--del" on:click="{onDelete}">
		<div class="icon">
			<Backspace />
		</div>
	</button>
	<button class="btn btn--icon btn--confirm" on:click="{onConfirm}">
		<div class="icon">
			<Check />
		</div>
	</button>
</div>
