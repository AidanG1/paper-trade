<script>
	import MultiChart from './MultiChart.svelte';
	import BuySell from './BuySell.svelte';
	import Portfolio from './Portfolio.svelte';
	import PurchaseSize from './PurchaseSize.svelte'
	import { Checkbox } from 'spaper';
	import { prices } from '../game/stockStore';
	import NetWorthChart from './NetWorthChart.svelte';

	const price_tickers = Object.keys($prices);
	let tickers = ['T'];
</script>

<div class="row">
	<div class="col-3 col form-group">
		{#each price_tickers as ticker}
			<Checkbox label={ticker} value={ticker} bind:group={tickers} />
		{/each}
		<Portfolio />
		<NetWorthChart />
	</div>
	<div class="col-9 col">
		<MultiChart {tickers} />
	</div>
	<div>
		<PurchaseSize></PurchaseSize>
		{#each tickers as ticker}
			<BuySell {ticker} />
		{/each}
	</div>
</div>
