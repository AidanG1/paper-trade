<script>
	import SkApex from './SKApex.svelte';
	import { onMount } from 'svelte';

	export let prices = [];
	export let stock_info = {};

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
		options.colors = [current_price > prices[0] ? '#6aa84f' : '#cc0000'];
		options.subtitle.text = subtitle;
		options.subtitle.style.color = current_price > previous_price ? '#6aa84f' : '#cc0000';
		options = options;
	}
	let options = {
		chart: {
			type: 'area',
			// height: height,
			// width: width,
			zoom: {
				enabled: false
			}
		},
		colors: [prices[prices.length - 1] > prices[0] ? '#6aa84f' : '##cc0000'],
		series: [
			{
				name: stock_info.ticker,
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
			text: `${stock_info.ticker} (${stock_info.company})`
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
	// onMount(() => {});
</script>

<div>
	<SkApex {options} />
</div>
