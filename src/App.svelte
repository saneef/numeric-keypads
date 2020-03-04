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
		--color-washed-success: #ebfbee;
		--color-washed-warning: #fff9db;
		--color-washed-danger: #fff5f5;
		--color-text: var(--color-gray-9);
		--color-text-light: var(--color-gray-7);

		--border-width: 1px;

		color: var(--color-text);
	}

	:global(body) {
		margin: 0;
		font-family: system-ui;
		background-color: var(--color-gray-0);
		padding-top: env(safe-area-inset-top);
		padding-bottom: env(safe-area-inset-bottom);
		padding-left: env(safe-area-inset-left);
		padding-right: env(safe-area-inset-right);
	}

	.bounds {
		height: 100%;
		display: grid;
		grid-template: 1fr / 1fr;
		margin-left: auto;
		margin-right: auto;
		max-width: 26rem;
	}

	.grid {
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
		font-size: 1.333em;
	}

	.stages {
		font-weight: bold;
	}
</style>

<script>
	import KeypadTester from "./KeypadTester.svelte";
	import Report from "./Report.svelte";
	import DoubleTapZoomKiller from "./DoubleTapZoomKiller.svelte";
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
</script>

<div class="bounds">
	<div class="grid">
		<div class="header">
			<div class="stages">
				<span class="stage">{Math.min(currentIndex + 1, totalTrials)}</span>
				⁄
				<span class="stage">{totalTrials}</span>
			</div>
			<a
				class="link"
				href="#reset"
				on:click|preventDefault="{() => location.reload()}">
				Reset
			</a>
		</div>
		<div class="main">

			{#each state as s, index (s.id)}
				{#if index === currentIndex}
					<KeypadTester
						numOfDigits="{6}"
						variant="{s.variant}"
						{disableShuffle}
						on:complete="{onAnswer}" />
				{/if}
			{/each}
			{#if totalTrials <= currentIndex}
				<Report data="{state}" />
			{/if}
		</div>
	</div>
</div>
<DoubleTapZoomKiller />
