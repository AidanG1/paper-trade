<script>
    import { game_state } from '../game/stockStore'
    import { onMount } from 'svelte'
    import GameEnded from '../components/GameEnded.svelte'
    import Game from '../components/Game.svelte'
    import Settings from '../components/Settings.svelte'
    import ChartDash from '../components/ChartDash.svelte'
    import MultiChartDash from '../components/MultiChartDash.svelte'
    import Mousetrap from 'mousetrap'
    import { Switch } from 'spaper'
    let use_multichart = false

    onMount(() => {
        Mousetrap.bind(['shift+c+h'], function (e) {
            use_multichart = !use_multichart
        })
    })
</script>

<div class="row">
    <span id="game-ended-alert">
        {#if $game_state.ended}
            <GameEnded />
        {/if}
    </span>
    <div class="padding-small col">
        <h2>Paper Trading Dash</h2>
        <Game />
    </div>
    {#if !$game_state.in_progress}
        <div class="col">
            <Settings />
        </div>
    {/if}
    {#if $game_state.started}
        <div class="form-group inline">
            <Switch inline bind:checked={use_multichart}
                >{use_multichart ? 'Single Chart' : 'Multi Chart'}</Switch
            >
        </div>
    {/if}
</div>
{#if $game_state.started}
    {#if use_multichart}
        <MultiChartDash />
    {:else}
        <ChartDash />
    {/if}
{/if}

<style>
    h2 {
        margin-top: 0;
        margin-bottom: 0;
    }
</style>
