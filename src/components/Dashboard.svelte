<script>
	import Chart from './Chart.svelte';
	export let prices = [];
	export let stock_info = {};
</script>

<Chart prices={prices} stock_info={stock_info} />
