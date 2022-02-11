<script>
	import Chart from './Chart.svelte';
	import BuySell from './BuySell.svelte';
	export let ticker = '';
</script>

<div>
	<Chart {ticker} />
	<BuySell {ticker} />
</div>
