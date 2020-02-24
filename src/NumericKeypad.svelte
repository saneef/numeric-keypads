<script>
	import Check from "./icons/Check.svg.svelte";
	import Backspace from "./icons/Backspace.svg.svelte";

	function onConfirm() {
		console.log("confirm");
	}

	function onDelete() {
		console.log("delete");
	}
</script>

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
		-webkit-appearance: button; /* for input */
		-webkit-user-select: none; /* for button */
		-moz-user-select: none;
		-ms-user-select: none;

		font-size: 2em;
		font-weight: bold;
	}

	button:active {
		background-color: lightgrey;
	}

	.btn {
		min-height: 2em;
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
	}
</style>

<div class="grid">
	<button class="btn">1</button>
	<button class="btn">2</button>
	<button class="btn">3</button>
	<button class="btn">4</button>
	<button class="btn">5</button>
	<button class="btn">6</button>
	<button class="btn">7</button>
	<button class="btn">8</button>
	<button class="btn">9</button>
	<button class="btn btn--last-digit">0</button>
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
