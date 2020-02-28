export const getSearchValue = param => {
	const regex = new RegExp(`${param}\\=(\\d*)`);
	const search = window.location.search;
	const result = search.match(regex);
	if (result && result.length === 2) {
		return result[1];
	}
};
