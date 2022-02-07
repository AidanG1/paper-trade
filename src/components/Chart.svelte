<script>
	import Chart from 'svelte-frappe-charts';
	export let data;
	export let ticker;

	let line_data = {
		labels: [...Array(data.length).keys()],
		datasets: [
			{
				values: data
			}
		]
	};
	let chartRef;
</script>

{data}
{ticker}
<Chart data={line_data} type="line" bind:this={chartRef} />
