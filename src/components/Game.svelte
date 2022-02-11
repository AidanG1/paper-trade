<script>
	import { onMount, onDestroy } from 'svelte';
	import {
		balance,
		portfolio,
		stocks,
		stock_data,
		times_to_run,
		delay,
		game_state,
		prices,
		day_counter
	} from '../game/stockStore';
	import cloneDeep from 'lodash/cloneDeep.js';
	import { play_game, prices_from_stock_store } from '../game/game';
	import { Button, Progress } from 'spaper';
	let run_game = (times_to_run, delay_ms) => {
		return;
	};
	let x = 0;
	function continue_game() {
		$times_to_run += x;
		run_game($times_to_run, $delay);
	}
	function new_game() {
		$game_state.started = false;
		$game_state.in_progress = false;
		$game_state.ended = false;
		$balance = 100;
		$portfolio = {};
		$stocks = cloneDeep($stock_data);
		$day_counter = 0;
		run_game($times_to_run, $delay);
	}
	onMount(() => {
		run_game = (times_to_run, delay_ms) => {
			if (!$game_state.in_progress) {
				$game_state.started = true;
				$game_state.in_progress = true;
				$game_state.ended = false;
				$stocks = play_game($stocks);
				$prices = prices_from_stock_store($stocks);
				let intervalID = setInterval(() => {
					$stocks = play_game($stocks);
					$prices = prices_from_stock_store($stocks);
					if (++$day_counter === times_to_run) {
						$game_state.in_progress = false;
						$game_state.ended = true;
						window.clearInterval(intervalID);
					}
				}, delay_ms);
			}
		};
	});
</script>

{#if !$game_state.started}
	<Button on:click={() => run_game($times_to_run, $delay)}>Start Game</Button>
{:else}
	<Progress value={Math.round((100 * ($day_counter + 1)) / ($times_to_run + 1))} type="secondary" showValue />
	<!-- Day {$day_counter + 1} of {$times_to_run + 1} -->
{/if}
{#if $game_state.ended}
	<Button on:click={() => new_game()}>Start New Game</Button>
	<Button on:click={() => continue_game()}>Continue Current Game</Button>
{/if}
