<script>
	import SkApex from './SKApex.svelte';
	import { dark_theme, stocks } from '../game/stockStore';

	export let ticker = '';

	let options = {
		chart: {
			type: 'area',
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
			text: ticker,
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
		}
	};
	function update_data(stock, dark_theme) {
		options.title.text = `${ticker} (${stock.company})`;
		options.series[0].data = stock.price_history;
		options.xaxis.categories = [...Array(stock.price_history.length).keys()];
		options.colors = [
			stock.current_price >= stock.price_history[0]
				? '#6aa84f'
				: '#cc0000'
		];
		options.theme.mode = dark_theme ? 'dark' : 'light'
		options.subtitle.text = `Current Price: $${stock.current_price}, Change: ${(
			100 *
			(stock.price_change - 1)
		).toFixed(2)}%`;
		options.subtitle.style.color = stock.price_change - 1 > 0 ? '#6aa84f' : '#cc0000';
		options = options;
	}
	$: {
		console.log(ticker)
		update_data($stocks[ticker], $dark_theme);
	}
</script>

<div>
	<SkApex {options} />
</div>
