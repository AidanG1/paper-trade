<script>
	import { onMount, onDestroy } from 'svelte';
	import { stock_data } from '../game/stocks';
	import { play_game } from '../game/game';
	import Chart from '../components/Chart.svelte';
	import InfoModal from '../components/InfoModal.svelte';
	import MultiChart from '../components/MultiChart.svelte';

	function get_prices(stocks) {
		return stocks.map((stock) => stock.price_history);
	}

	function get_stock_info(stocks) {
		return stocks.map((stock) => {
			return { ticker: stock.ticker, company: stock.company };
		});
	}

	let stocks = [...stock_data];
	stocks.forEach((e) => (e = Object.assign({}, e)));
	stocks = play_game(stocks);
	let prices = get_prices(stocks);
	let stock_info = get_stock_info(stocks);
	let times_to_run = 29; // already ran once
	let x = 0;
	onMount(() => {
		let intervalID = setInterval(function () {
			stocks = play_game(stocks);
			prices = [...get_prices(stocks)];
			stock_info = [...get_stock_info(stocks)];
			if (++x === times_to_run) {
				window.clearInterval(intervalID);
			}
		}, 2000);
		// onDestroy(() => {
		// 	window.clearInterval(intervalID);
		// });
	});
</script>

<main>
	<h2>Welcome to Paper Trading</h2>
	<InfoModal />
	<div>
		{#each stock_info as info, index}
			<div class="stock_div">
				<Chart prices={prices[index]} stock_info={info} />
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		padding: 1vw;
	}

	:global(.stock_div) {
		display: inline-block;
	}
	h1,
	h2,
	InfoModal {
		display: inline-block;
	}
</style>
