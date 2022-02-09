<script>
	import SkApex from './SKApex.svelte';

	export let prices = [];
	export let ticker = [];
	export let time = 0;
	$: {
		update_data(prices);
	}
	function update_data(prices) {
		options.series.data = prices;
		options.xaxis.categories = [...Array(prices.length).keys()];
		options = options;
	}
	let options = {
		chart: {
			type: 'line',
			height: 350,
			zoom: {
				enabled: false
			}
		},
		series: [
			{
				name: ticker,
				data: prices
			}
		],
		xaxis: {
			categories: [...Array(prices.length).keys()]
		},
		stroke: {
			curve: 'straight'
		},
		theme: {
			mode: 'dark',
			palette: 'palette4',
			// monochrome: {
			// 	enabled: false,
			// 	color: '#255aee',
			// 	shadeTo: 'light',
			// 	shadeIntensity: 0.65
			// }
		}
	};
</script>

{time} {prices}
<SkApex {options} />
