<script>
    import { Alert } from 'spaper'
    import { net_worth, day_counter } from '../game/stockStore'
    import NetWorthChart from './NetWorthChart.svelte'
</script>

<div style="width:100%">
    <Alert type="secondary" dismissible>
        <div id="game-text">
            <h1>Game Finished</h1>
            <h3>
                You have ${$net_worth} after starting with $100 and playing for {Math.floor(
                    $day_counter
                )} rounds. You made an average of ${(
                    ($net_worth - 100) /
                    $day_counter
                ).toFixed(2)} per round
            </h3>
        </div>
        <NetWorthChart />
    </Alert>
</div>

<style>
    #game-text {
        color: black;
    }
</style>
