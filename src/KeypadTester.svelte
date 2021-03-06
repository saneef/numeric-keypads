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
		font-size: 1.333em;
	}

	.answer {
		letter-spacing: 0.125em;
		margin-top: 1rem;
		font-size: 2.369em;
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
	import { random, shuffle } from "./lib/random";
	import NumericKeypad from "./NumericKeypad.svelte";

	const dispatch = createEventDispatcher();

	export let numOfDigits = 6;
	export let digits;
	export let variant = "circular";
	export let disableShuffle = false;

	$: numOfDigits = Array.isArray(digits) ? digits.length : numOfDigits;

	let paddedString = Array.from({ length: numOfDigits }).map(c => "");

	const [state, send] = useMachine(
		keypadTesterMachine.withConfig(
			{},
			{
				numOfDigits,
				digits: [],
				deletes: 0,
				pin: Array.isArray(digits)
					? shuffle(digits).join("")
					: random(numOfDigits),
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
		dispatch("complete", context);
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
