<script>
    import { Input, Switch } from 'spaper'
    import { purchase_size } from '../game/stockStore'
    import Mousetrap from 'mousetrap'
    import { onMount } from 'svelte'
    let purchase_size_input = $purchase_size === 'max' ? 1 : $purchase_size
    let max_or_not = $purchase_size === 'max' ? true : false
    $: {
        if (max_or_not) {
            $purchase_size = 'max'
        } else {
            $purchase_size = purchase_size_input
        }
    }

    $: {
        if (purchase_size_input < 1) {
            purchase_size_input = 1
        }
        max_or_not = false
        $purchase_size = parseInt(purchase_size_input)
    }
    onMount(() => {
        Mousetrap.bind(['shift+1', 'shift+2', 'shift+3', 'shift+4', 'shift+5'], function(e) {
            
        })
    })
</script>

<div class="form-group">
    <Switch bind:checked={max_or_not}>Buy Max</Switch>
    <Input
        label="Default Purchase Amount"
        type="number"
        bind:value={purchase_size_input}
        min="1"
    />
</div>
