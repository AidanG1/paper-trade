<script>
	import SkApex from './SKApex.svelte';
	import { dark_theme, net_worth_history } from '../game/stockStore';

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
			text: 'Net Worth History'
		},
		theme: {
			mode: 'dark',
			palette: 'palette4'
		}
	};
	function update_data(nwh, dark_theme) {
		options.series[0].data = nwh;
		options.xaxis.categories = [...Array(nwh.length).keys()];
		options.theme.mode = dark_theme ? 'dark' : 'light';
		options.colors = [nwh[nwh.length - 1] >= nwh[0] ? '#6aa84f' : '#cc0000'];
		options = options;
	}
	$: {
		update_data($net_worth_history, $dark_theme);
	}
</script>

<div>
	<SkApex {options} />
</div>
