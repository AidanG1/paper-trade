<script>
	import { onMount, onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';
	import { stock_data } from '../game/stocks';
	import { play_game } from '../game/game';
	import Dashboard from '../components/Dashboard.svelte';
	import Controls from '../components/Controls.svelte';
	import InfoModal from '../components/InfoModal.svelte';
	import Portfolio from '../components/Portfolio.svelte';
	import { Button } from 'spaper';

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
	let run_game = (times_to_run, delay_ms) => {
		return;
	};
	let started = false;
	let prices = get_prices(stocks);
	let stock_info = get_stock_info(stocks);
	onMount(() => {
		run_game = (times_to_run, delay_ms) => {
			started = true;
			stocks = play_game(stocks);
			let x = 0;
			let intervalID = setInterval(() => {
				stocks = play_game(stocks);
				prices = [...get_prices(stocks)];
				stock_info = [...get_stock_info(stocks)];
				if (++x === times_to_run) {
					window.clearInterval(intervalID);
				}
			}, delay_ms);
		};
	});
</script>

<main>
	<h2>Welcome to Paper Trading</h2>
	<div class="inline">
		<InfoModal />
	</div>
	<Button on:click={() => run_game(29, 2000)}>Start Game</Button>
	{#if started}
		<div>
			<Controls />
		</div>
		<div>
			<Portfolio />
		</div>
		<div in:fly>
			{#each stock_info as info, index}
				<div class="stock_div stock_div_3">
					<Dashboard prices={prices[index]} stock_info={info} />
				</div>
			{/each}
		</div>
	{/if}
</main>

<style>
	main {
		padding: 1vw;
	}

	:global(.stock_div) {
		display: inline-block;
		border: medium solid yellow;
	}
	:global(.stock_div_1) {
		width: 98vw;
		margin-right: 0;
	}
	:global(.stock_div_2) {
		width: 47vw;
		margin-right: 1vw;
	}
	:global(.stock_div_3) {
		width: 31vw;
		margin-right: 0.5vw;
	}
	:global(.stock_div_4) {
		width: 24.3vw;
		margin-right: 0.2vw;
	}
	h2 {
		display: inline-block;
		margin-top: 0;
	}
	.inline {
		display: inline-block;
	}
</style>
