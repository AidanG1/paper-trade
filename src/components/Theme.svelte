<script>
    import { Switch } from 'spaper'
    import { dark_theme } from '../game/stockStore'
    import { onMount } from 'svelte'
    export let button_text = 'Theme'
    let dark_theme_input = $dark_theme
    let change_html = (theme) => {
        return
    }
    $: {
        $dark_theme = dark_theme_input
        change_html($dark_theme)
    }
    onMount(() => {
        change_html = (theme) => {
            if (theme) {
                document.getElementsByTagName('html')[0].classList.add('dark')
            } else {
                document
                    .getElementsByTagName('html')[0]
                    .classList.remove('dark')
            }
        }
    })
</script>

<div class="form-group">
    {#if button_text === ''}
        <Switch bind:checked={dark_theme_input} />
    {:else}
        <Switch bind:checked={dark_theme_input}>{button_text}</Switch>
    {/if}
</div>
