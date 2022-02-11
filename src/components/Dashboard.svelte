<script>
	import Chart from './Chart.svelte';
	import BuySell from './BuySell.svelte';
	export let prices = [];
	export let stock_info = {};
</script>

<Chart {prices} {stock_info} />
<BuySell price={prices[prices.length - 1]} ticker={stock_info.ticker} />
