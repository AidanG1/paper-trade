<script>
	import SkApex from './SKApex.svelte';

	export let prices = [];
	export let ticker = [];
	export let height = 300;
	export let width = 500;

	let price_change = 0;
	let current_price = 0;
	let previous_price = 0;
	let subtitle = '';
	$: {
		previous_price = current_price;
		current_price = prices[prices.length - 1];
		price_change = (100 * (current_price / previous_price - 1)).toFixed(2);
		subtitle = `Current Price: $${current_price}, Change: ${price_change}%`;
		update_data(prices);
	}
	function update_data(prices) {
		options.series.data = prices;
		options.xaxis.categories = [...Array(prices.length).keys()];
		options.colors = [prices[prices.length - 1] > prices[0] ? '#6aa84f' : '#cc0000'];
		options.subtitle.text = subtitle;
		options = options;
	}
	let options = {
		chart: {
			type: 'area',
			height: height,
			width: width,
			zoom: {
				enabled: false
			}
		},
		colors: [prices[prices.length - 1] > prices[0] ? '#6aa84f' : '##cc0000'],
		series: [
			{
				name: ticker,
				data: prices
			}
		],
		xaxis: {
			type: 'numeric',
			categories: [...Array(prices.length).keys()],
			tickPlacement: 'on'
		},
		stroke: {
			curve: 'straight'
		},
		title: {
			text: ticker
		},
		subtitle: {
			text: subtitle,
			align: 'left',
			margin: 10,
			floating: false,
			style: {
				fontSize: '12px',
				fontWeight: 'normal',
				fontFamily: undefined,
				color: '#9699a2'
			}
		},
		theme: {
			mode: 'dark'
			// palette: 'palette4'
			// monochrome: {
			// 	enabled: false,
			// 	color: '#255aee',
			// 	shadeTo: 'light',
			// 	shadeIntensity: 0.65
			// }
		}
	};
</script>

<div>
	<SkApex {options} />
</div>
