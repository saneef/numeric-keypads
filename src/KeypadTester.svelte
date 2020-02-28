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
		font-size: 0.75em;
		font-weight: normal;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.pin {
		margin-top: 0;
		color: var(--color-text-light);
		font-weight: normal;
	}

	.answer {
		letter-spacing: 0.125em;
		margin-top: 1rem;
	}

	.empty-char {
		padding: 0 0.125em;
	}

	.error {
		animation-name: shake;
		animation-duration: 600ms;
		color: var(--color-danger);
	}

	.success {
		color: var(--color-success);
	}
</style>

<script>
	import { createEventDispatcher } from "svelte";
	import keypadTesterMachine from "./machines/keypad-tester";
	import useMachine from "./lib/useMachine";
	import random from "./lib/random";
	import NumericKeypad from "./NumericKeypad.svelte";

	const dispatch = createEventDispatcher();

	export let numOfDigits = 6;
	export let variant = "circular";
	export let disableShuffle = false;

	let currentNumber = "";
	let paddedString = Array.from({ length: numOfDigits }).map(c => "");

	const [state, send] = useMachine(
		keypadTesterMachine.withConfig(
			{},
			{
				numOfDigits,
				digits: [],
				pin: random(numOfDigits),
			}
		)
	);

	$: context = $state.context;
	$: paddedDigits = getPaddedDigits($state);
	$: if ($state.matches("complete")) {
		onComplete();
	}

	function getPaddedDigits(s) {
		const digits = s.context.digits;
		return Array.from({ length: numOfDigits }).map((c, i) => digits[i] || "");
	}

	function onComplete() {
		const timeTaken = context.endedAt - context.startedAt;

		dispatch("complete", {
			pin: context.pin,
			timeTaken,
		});
	}
</script>

<div class="hud">
	<h3 class="legend">Type & confirm</h3>
	<h2 class="pin">{context.pin}</h2>
	<h1
		class="answer"
		class:error="{$state.matches('error')}"
		class:success="{$state.matches('complete')}">
		<span>
			{#each paddedDigits as ch}
				{#if ch === ''}
					<span class="empty-char">&middot;</span>
				{:else}
					<span>{ch}</span>
				{/if}
			{/each}
		</span>
	</h1>
</div>
<NumericKeypad
	{variant}
	shuffle="{!disableShuffle}"
	disabledDigits="{$state.matches('filled-in') || $state.matches('error') || $state.matches('complete')}"
	disabledConfirm="{!$state.matches('filled-in') || $state.matches('complete')}"
	disabledDelete="{$state.matches('complete')}"
	on:confirm="{e => send('CONFIRM')}"
	on:delete="{e => send('DELETE')}"
	on:press="{e => send({ type: 'PRESS', value: e.detail.value })}" />
