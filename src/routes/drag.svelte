<script>
    import { fly } from 'svelte/transition'
    import { draggable } from '@neodrag/svelte'
    import { stocks, game_state } from '../game/stockStore'
    import Dashboard from '../components/Dashboard.svelte'
    import PurchaseSize from '../components/PurchaseSize.svelte'
    import Game from '../components/Game.svelte'
    import GameEnded from '../components/GameEnded.svelte'
    import DragControls from '../components/DragControls.svelte'
    import Settings from '../components/Settings.svelte'
    import Portfolio from '../components/Portfolio.svelte'
</script>

<main>
    <div class="border border-warning inline-block" use:draggable={{}}>
        <h2>Paper Trading Draggable</h2>
        <Game />
    </div>
    {#if !$game_state.in_progress}
        <div class="border border-warning inline-block" use:draggable={{}}>
            <Settings />
        </div>
    {/if}
    <span id="game-ended-alert">
        {#if $game_state.ended}
            <GameEnded />
        {/if}
    </span>
    {#if $game_state.started}
        <div class="border border-warning inline-block" use:draggable={{}}>
            <DragControls />
            <PurchaseSize />
        </div>
        <div use:draggable={{}}>
            <Portfolio />
        </div>
        <div in:fly>
            {#each Object.keys($stocks) as stock}
                <div
                    class="stock_div stock_div_3 border border-warning"
                    use:draggable={{}}
                >
                    <Dashboard ticker={stock} />
                </div>
            {/each}
        </div>
    {/if}
</main>

<style>
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
