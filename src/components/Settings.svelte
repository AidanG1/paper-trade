<script>
    import { Select } from 'spaper'
    import { times_to_run, delay, game_state } from '../game/stockStore'

    let times_to_run_input = $times_to_run
    let ttr_initial = $times_to_run
    function ttr_in_progress(game_state_in_progress) {
        ttr_initial = $times_to_run
    }
    $: {
        ttr_in_progress($game_state.in_progress)
    }
    function ttr(ttri) {
        if ($game_state.started) {
            $times_to_run = ttri + ttr_initial
        } else {
            $times_to_run = ttri
        }
    }
    $: {
        ttr(times_to_run_input)
    }
    let delay_input = $delay
    $: {
        $delay = delay_input
    }
</script>

<div class="form-group">
    <Select label="Times to Run" bind:value={times_to_run_input}>
        <option value={15}>15</option>
        <option value={30}>30</option>
        <option value={60}>60</option>
        <option value={90}>90</option>
    </Select>
    <Select label="Round Delay" bind:value={delay_input}>
        <option value={500}>Very Short</option>
        <option value={1000}>Short</option>
        <option value={2000}>Normal</option>
        <option value={3500}>Long</option>
        <option value={6000}>Very Long</option>
    </Select>
</div>

<style>
    .form-group {
        float: left;
    }
</style>
