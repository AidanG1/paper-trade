<script context="module">
    /** @type {import('@sveltejs/kit').Load} */
    export const load = async ({ url }) => ({ props: { url } })
</script>

<script>
    import { Navbar } from 'spaper'
    import Theme from '../components/Theme.svelte'
    import Mousetrap from '../components/Mousetrap.svelte'
    import PageTransition from '../components/PageTransition.svelte'
    export let url
</script>

<Navbar split={false}>
    <h3 slot="brand">
        <a href="/">Home</a>
    </h3>
    <ul class="inline">
        <li><a href="/dash">Dashboard</a></li>
        <li><a href="/drag">Draggable</a></li>
        <li><a href="/calendar">Calendar</a></li>
        <li><a href="/about">About</a></li>
        <li><Theme button_text={''} /> Theme</li>
        <Mousetrap />
    </ul>
</Navbar>
<main class="container-lg padding-small">
    <PageTransition {url}>
        <slot />
    </PageTransition>
</main>
