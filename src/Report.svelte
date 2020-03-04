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

	.small {
		font-size: 0.75em;
		color: var(--color-text-light);
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
			let cleanValuesLength = 0;
			let totalTimes = groupedData[variant].reduce(
				(acc, cur) => {
					const timeTaken = cur.endedAt - cur.startedAt;
					let { total, clean } = acc;
					if (timeTaken) {
						length++;
						total = total + timeTaken;

						if (!cur.deletes) {
							cleanValuesLength++;
							clean = clean + timeTaken;
						}
					}

					return { total, clean };
				},
				{
					total: 0,
					clean: 0,
				}
			);

			return {
				variant,
				avgTime: totalTimes.total / length,
				cleanAvgTime: totalTimes.clean
					? totalTimes.clean / cleanValuesLength
					: 0,
			};
		})
		.sort((a, b) => {
			if (a.cleanAvgTime < b.cleanAvgTime) return -1;
			if (a.cleanAvgTime > b.cleanAvgTime) return 1;
			return 0;
		});
</script>

<div class="report">
	<h2>Results</h2>
	<table>
		<thead>
			<tr>
				<th>Variant</th>
				<th>Mean time</th>
			</tr>
		</thead>
		<tbody>
			{#each avgTimes as t (t.variant)}
				<tr>
					<td>{t.variant}</td>
					<td>
						{(t.cleanAvgTime / 1000).toFixed(3)} s
						{#if t.cleanAvgTime !== t.avgTime}
							<span class="small">({(t.avgTime / 1000).toFixed(3)} s)</span>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
