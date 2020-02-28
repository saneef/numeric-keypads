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
		padding-top: env(safe-area-inset-top);
	}

	.grid {
		height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr;
	}

	.main {
		align-self: end;
	}

	.link {
		margin-top: 0;
		color: var(--color-text-light);
	}

	.header {
		display: flex;
		justify-content: space-between;
		padding: 1em;
	}

	.hide {
		display: none;
	}
</style>

<script>
	import KeypadTester from "./KeypadTester.svelte";
	import Report from "./Report.svelte";
	import { shuffle } from "./lib/random.js";

	export let trials;
	export let disableShuffle = false;
	const variants = ["no-border", "bordered", "circular"];

	let currentIndex = 0;
	const totalTrials = trials * variants.length;
	let state = shuffle(
		variants
			.map((variant, i) => {
				return Array.from({ length: trials }).map((_, j) => ({
					id: `${i}-${j}`,
					variant,
				}));
			})
			.flat()
	);

	function onAnswer(e) {
		const { pin, timeTaken } = e.detail;
		state[currentIndex] = {
			...state[currentIndex],
			pin,
			timeTaken,
		};
		currentIndex += 1;
	}

	function onReset(e) {
		e.preventDefault();
		location.reload();
	}
</script>

<div class="bounds">
	<div class="grid">
		<div class="header">
			<div>{Math.min(currentIndex + 1, totalTrials)} ⁄ {totalTrials}</div>
			<a class="link" href="#reset" on:click="{onReset}">RESET</a>
		</div>
		<div class="main">

			{#each state as s, index (s.id)}
				<div class:hide="{index !== currentIndex}">
					<KeypadTester
						numOfDigits="{6}"
						variant="{s.variant}"
						{disableShuffle}
						on:complete="{onAnswer}" />
				</div>
			{/each}
			{#if totalTrials <= currentIndex}
				<Report data="{state}" />
			{/if}
		</div>
	</div>
</div>
