<script>
    import { onMount } from 'svelte'
    import Mousetrap from 'mousetrap'
    import { goto } from '$app/navigation'

    onMount(() => {
        Mousetrap.bind(['shift+d+s', 'shift+d+a'], function (e) {
            goto('/dash')
        })
        Mousetrap.bind(['shift+d+r'], function (e) {
            goto('/drag')
        })
        Mousetrap.bind(['shift+h+m'], function (e) {
            goto('/')
        })
        Mousetrap.bind(['shift+c+l'], function (e) {
            goto('/calendar')
        })
        Mousetrap.bind(['shift+a+b'], function (e) {
            goto('/about')
        })
    })
</script>
