<style>
	.report {
		padding: 1em;
	}

	table {
		width: 100%;
	}

	th {
		text-align: left;
		font-weight: normal;
		color: var(--color-text-light);
	}

	td {
	}
</style>

<script>
	export let data = [];

	let groupedData;
	$: groupedData = data.reduce((acc, cur) => {
		const { variant, ...rest } = cur;
		if (acc[variant] === undefined) {
			acc[variant] = [rest];
		} else {
			acc[variant] = [...acc[variant], rest];
		}

		return acc;
	}, {});

	$: avgTimes = Object.keys(groupedData)
		.map((variant, i) => {
			let length = 0;
			let sum = groupedData[variant].reduce((acc, cur) => {
				const timeTaken = cur.endedAt - cur.startedAt;
				if (timeTaken) {
					length++;
					return acc + timeTaken;
				}

				return acc;
			}, 0);

			return {
				variant,
				avgTime: sum / length,
			};
		})
		.sort((a, b) => {
			if (a.avgTime < b.avgTime) return -1;
			if (a.avgTime > b.avgTime) return 1;
			return 0;
		});
</script>

<div class="report">
	<h2>Results</h2>
	<table>
		<thead>
			<tr>
				<th>Variant</th>
				<th>Avg. time taken</th>
			</tr>
		</thead>
		<tbody>
			{#each avgTimes as t (t.variant)}
				<tr>
					<td>{t.variant}</td>
					<td>{(t.avgTime / 1000).toFixed(3)} s</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
