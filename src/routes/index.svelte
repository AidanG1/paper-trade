<script>
	import { onMount, onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';
	import { draggable } from '@neodrag/svelte';
	import { balance, portfolio, stocks, stock_data } from '../game/stockStore';
	import { cloneDeep } from 'lodash';
	import { play_game } from '../game/game';
	import Dashboard from '../components/Dashboard.svelte';
	import Controls from '../components/Controls.svelte';
	import InfoModal from '../components/InfoModal.svelte';
	import Portfolio from '../components/Portfolio.svelte';
	import { Button } from 'spaper';
	let run_game = (times_to_run, delay_ms) => {
		return;
	};
	let started = false;
	let in_progress = false;
	let finished = false;
	let x = 0;
	let times_to_run = 29;
	let delay = 2000;
	function continue_game() {
		times_to_run += x;
		run_game(times_to_run, delay);
	}
	function new_game() {
		$balance = 100;
		$portfolio = {};
		$stocks = cloneDeep($stock_data);
		x = 0;
		run_game(times_to_run, delay);
	}
	onMount(() => {
		run_game = (times_to_run, delay_ms) => {
			if (!in_progress) {
				started = true;
				in_progress = true;
				finished = false;
				$stocks = play_game($stocks);
				let intervalID = setInterval(() => {
					$stocks = play_game($stocks);
					if (++x === times_to_run) {
						in_progress = false;
						finished = true;
						window.clearInterval(intervalID);
					}
				}, delay_ms);
			}
		};
	});
</script>

<main>
	<div class="border border-warning inline-block" use:draggable={{}}>
		<h2>Welcome to Paper Trading</h2>
		<div class="inline-block">
			<InfoModal />
		</div>
		{#if !started}
			<Button on:click={() => run_game(times_to_run, delay)}>Start Game</Button>
		{/if}
		{#if finished}
			<Button on:click={() => new_game()}>Start New Game</Button>
		{/if}
		{#if finished}
			<Button on:click={() => continue_game()}>Continue Current Game</Button>
		{/if}
		{#if started}
			Day {x + 1} of {times_to_run + 1}
		{/if}
	</div>
	{#if started}
		<div use:draggable={{}}>
			<Controls />
		</div>
		<div use:draggable={{}}>
			<Portfolio />
		</div>
		<div in:fly>
			{#each Object.keys($stocks) as stock}
				<div class="stock_div stock_div_3 border border-warning" use:draggable={{}}>
					<Dashboard ticker={stock} />
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
	:global(.inline-block) {
		display: inline-block;
	}
</style>
