import { Machine, assign } from "xstate";

export default Machine(
	{
		initial: "idle",
		context: {},
		states: {
			idle: {
				onExit: "updateStartTime",
				on: {
					PRESS: {
						target: "in-progress",
						actions: "updateValue",
					},
				},
			},
			"in-progress": {
				on: {
					PRESS: [
						{
							target: "filled-in",
							cond: "isFull",
							actions: "updateValue",
						},
						{
							actions: "updateValue",
						},
					],
					DELETE: {
						actions: "deleteLastDigit",
					},
				},
			},
			"filled-in": {
				on: {
					DELETE: {
						target: "in-progress",
						actions: "deleteLastDigit",
					},
					CONFIRM: [
						{
							target: "complete",
							cond: "isCorrect",
						},
						{
							target: "error",
						},
					],
				},
			},
			error: {
				on: {
					DELETE: {
						target: "in-progress",
						actions: "deleteLastDigit",
					},
				},
			},
			complete: {
				onEntry: "updateEndTime",
			},
		},
	},
	{
		actions: {
			updateStartTime: assign(() => ({
				startedAt: Date.now(),
			})),
			updateEndTime: assign(() => ({
				endedAt: Date.now(),
			})),
			updateValue: assign((ctx, e) => {
				const { digits, numOfDigits } = ctx;
				const { value } = e;
				if (digits.length < numOfDigits) {
					return { ...ctx, digits: [...digits, value] };
				}
			}),
			deleteLastDigit: assign((ctx, event) => ({
				...ctx,
				digits: ctx.digits.slice(0, -1),
			})),
		},
		guards: {
			isFull: (ctx, e) => ctx.numOfDigits - 1 === ctx.digits.length,
			isCorrect: (ctx, e) => ctx.pin === ctx.digits.join(""),
		},
	}
);
