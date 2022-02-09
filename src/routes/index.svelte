<script>
	import { onMount } from 'svelte';
	import { stock_data } from '../game/stocks';
	import { play_game } from '../game/game';
	import Chart from '../components/Chart.svelte';
	import InfoModal from '../components/InfoModal.svelte';
	import MultiChart from '../components/MultiChart.svelte';

	function get_prices(stocks) {
		return stocks.map((stock) => stock.price_history);
	}

	function get_tickers(stocks) {
		return stocks.map((stock) => stock.ticker);
	}

	let stocks = [...stock_data];
	stocks.forEach((e) => (e = Object.assign({}, e)));
	stocks = play_game(stocks);
	let prices = get_prices(stocks);
	let tickers = get_tickers(stocks);
	let times_to_run = 30;
	let x = 0;
	onMount(() => {
		let intervalID = setInterval(function () {
			stocks = play_game(stocks);
			prices = [...get_prices(stocks)];
			prices = prices;
			tickers = [...get_tickers(stocks)];
			tickers = tickers;
			if (++x === times_to_run) {
				window.clearInterval(intervalID);
			}
		}, 2000);
	});
</script>

<main>
	<h1>Welcome to Paper Trading</h1>
	<InfoModal />
	<p>
		{prices}
		{tickers}
	</p>
	{#each tickers as ticker, index}
		<div class="chart_div">
			<Chart prices={prices[index]} {ticker} time={x} />
		</div>
	{/each}
</main>

<style>
	main {
		padding: 1vw;
	}

	:global(#chart_div) {
		width: 10vw;
		height: 10vh;
	}
	h1,
	InfoModal {
		display: inline-block;
	}
</style>
