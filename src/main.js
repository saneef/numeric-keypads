import App from "./App.svelte";
import { getSearchValue } from "./lib/url";

const app = new App({
	target: document.body,
	props: {
		trials: parseInt(getSearchValue("trials"), 10) || 4,
		disableShuffle: getSearchValue("shuffle") !== "1",
	},
});

export default app;
