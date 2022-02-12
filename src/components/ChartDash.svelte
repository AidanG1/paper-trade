<script>
	import Chart from './Chart.svelte';
	import BuySell from './BuySell.svelte';
	import Portfolio from './Portfolio.svelte';
	import { Alert, Select } from 'spaper';
	import { prices } from '../game/stockStore';
	let ticker = 'T';
</script>

<div class="row">
	<div class="col-3 col">
		<Select label="Chart Ticker" bind:value={ticker}>
			{#each Object.keys($prices) as stock_ticker}
				<option value={stock_ticker}>{stock_ticker}</option>
			{/each}
		</Select>
		<BuySell {ticker} />
		<Portfolio />
	</div>
	<div class="col-9 col">
		<Chart {ticker} />
	</div>
</div>
