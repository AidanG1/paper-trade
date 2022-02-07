<script>
	import Chart from 'svelte-frappe-charts';
	export let prices;
    export let tickers
	export let time;
    let stocks = []
    for (let i = 0; i < tickers.length; i++) {
        stocks.push({ values: prices[i], label: tickers[i] })
    }
	let chartRef;
	let line_data;
	line_data = {
		labels: [...Array(time + 1).keys()],
		datasets: stocks
	};
</script>
<Chart data={line_data} type="line" bind:this={chartRef} />

{time}
{tickers}
{line_data.datasets[0].values}
