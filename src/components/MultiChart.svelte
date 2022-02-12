<script>
	import SkApex from './SKApex.svelte';
	import { dark_theme, stocks } from '../game/stockStore';

	export let tickers = [];

	let options = {
		chart: {
			type: 'area',
			zoom: {
				enabled: false
			}
		},
		series: [
			{
				name: 'Hi',
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
			text: tickers.join(' & ')
		},
		theme: {
			mode: 'dark',
			palette: 'palette4'
		}
	};
	function update_data(stocks, dark_theme) {
		options.series = [];
		for (let ticker of tickers) {
			options.series.push({ data: stocks[ticker].price_history, name: ticker });
		}
		options.xaxis.categories = [...Array(stocks.T.price_history.length).keys()];
		options.theme.mode = dark_theme ? 'dark' : 'light';
		options = options;
	}
	$: {
		console.log(tickers)
		update_data($stocks, $dark_theme);
	}
</script>

<div>
	<SkApex {options} />
</div>
