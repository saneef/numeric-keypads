import { interpret } from "xstate";
import { readable } from "svelte/store";

export default function(machine, options) {
	const service = interpret(machine, options);
	const state = readable(service.initialState, function(set) {
		service
			.onTransition(function(newState) {
				return set(newState);
			})
			.start();
		return () => {
			service.stop();
		};
	});

	return [state, service.send];
}
