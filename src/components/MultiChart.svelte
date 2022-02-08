<script>
	import Chart from 'svelte-frappe-charts';
	import Line from 'svelte-chartjs/src/Line.svelte';
	export let prices = [];
	export let tickers = [];
	export let time = 0;
	let line_data;
	$: {
		update_data(tickers);
	}
	function update_data(tickers) {
		let datasets = [];
		for (let i = 0; i < tickers.length; i++) {
			datasets.push({ data: prices, label: tickers[i] });
		}
		console.log(line_data);
		line_data = {
			labels: [...Array(time + 1).keys()],
			datasets: datasets
		};
	}
	let dataLine = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [
			{
				label: 'My First dataset',
				fill: true,
				data: [65, 59, 80, 81, 56, 55, 40]
			},
			{
				label: 'My Second dataset',
				fill: true,
				data: [28, 48, 40, 19, 86, 27, 90]
			}
		]
	};
	let chartRef;
</script>

<Line data={dataLine} options={{ responsive: true }} />
<!-- <Chart data={line_data} type="line" bind:this={chartRef} truncateLegends={true} /> -->

{time}
{tickers}
{prices}
