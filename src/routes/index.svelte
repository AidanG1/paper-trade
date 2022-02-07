<script>
	import { onMount } from 'svelte';
	import { stock_data } from '../game/stocks';
	import { play_game } from '../game/game';
	import Chart from '../components/Chart.svelte';
	import MultiChart from '../components/MultiChart.svelte';

    function get_prices(stocks) {
        return stocks.map((stock) => (stock.price_history))
    }

    function get_tickers(stocks) {
        return stocks.map((stock) => (stock.ticker))
    }

	let stocks = [...stock_data];
	stocks.forEach((e) => (e = Object.assign({}, e)));
	stocks = play_game(stocks);
    let prices = get_prices(stocks)
    let tickers = get_tickers(stocks)
	let times_to_run = 30;
	let x = 0;
	onMount(() => {
		let intervalID = setInterval(function () {
			stocks = play_game(stocks);
			prices = get_prices(stocks)
            console.log(prices)
            tickers = get_tickers(stocks)
			if (++x === times_to_run) {
				window.clearInterval(intervalID);
			}
		}, 2000);
	});
</script>

<main>
	<h1>Welcome to Paper Trading</h1>
	<p>
		A new interpretation of the <a href="https://www.tradethisandthat.com/items/" target="_blank"
			>Trade This and That algorithm</a
		>
	</p>
	<p>
		Based off <a href="https://github.com/davjhan/paper-trader-game" target="_blank"
			>David Han's game</a
		>
	</p>

	<MultiChart prices={prices} tickers={tickers} time={x} />
</main>

<style>
	main {
		padding: 1vw;
	}
</style>
