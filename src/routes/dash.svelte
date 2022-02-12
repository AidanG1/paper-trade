<script>
	import { prices, game_state } from '../game/stockStore';
	import GameEnded from '../components/GameEnded.svelte';
	import Game from '../components/Game.svelte';
	import Chart from '../components/Chart.svelte';
	import BuySell from '../components/BuySell.svelte';
	import Nav from '../components/Nav.svelte';
	import Settings from '../components/Settings.svelte';
	import Portfolio from '../components/Portfolio.svelte';
	import { Alert, Select } from 'spaper';
	let ticker = 'T';
</script>

<Nav />
<div class="row">
	{#if $game_state.ended}
		<GameEnded />
	{/if}
	<div class="padding-small col">
		<h2>Paper Trading Dash</h2>
		<Game />
	</div>
	{#if !$game_state.in_progress}
		<div class="col">
			<Settings />
		</div>
	{/if}
</div>
{#if $game_state.started}
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
{/if}

<style>
	h2 {
		margin-top: 0;
		margin-bottom: 0;
	}
</style>
