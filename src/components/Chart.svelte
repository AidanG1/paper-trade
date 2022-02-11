<script>
	import SkApex from './SKApex.svelte';
	import { dark_theme, stocks } from '../game/stockStore';
	import { onMount } from 'svelte';

	export let ticker = '';

	let options = {
		chart: {
			type: 'area',
			// height: height,
			// width: width,
			zoom: {
				enabled: false
			}
		},
		colors: ['#6aa84f'],
		series: [
			{
				name: ticker,
				data: [0]
			}
		],
		xaxis: {
			type: 'numeric',
			categories: [0],
			tickPlacement: 'on'
		},
		stroke: {
			curve: 'straight'
		},
		title: {
			text: ticker
		},
		subtitle: {
			text: '',
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
	function update_data(stock, dark_theme) {
		options.title.text = `${ticker} (${stock.company})`;
		options.series[0].data = stock.price_history;
		options.xaxis.categories = [...Array(stock.price_history.length).keys()];
		options.colors = [
			stock.current_price > stock.price_history[stock.price_history.length - 1]
				? '#6aa84f'
				: '#cc0000'
		];
		options.theme.mode = dark_theme ? 'dark' : 'light'
		options.subtitle.text = `Current Price: $${stock.current_price}, Change: ${(
			100 *
			(stock.price_change - 1)
		).toFixed(2)}%`;
		options.subtitle.style.color = stock.price_change >= 0 ? '#6aa84f' : '#cc0000';
		options = options;
	}
	$: {
		update_data($stocks[ticker], $dark_theme);
	}
	// stocks.subscribe((value) => {
	// 	console.log(value);
	// 	update_data(value[ticker]);
	// });
	// onMount(() => {});
</script>

<div>
	<SkApex {options} />
</div>
