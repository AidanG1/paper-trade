<script>
    import { Navbar } from 'spaper'
    import Theme from '../components/Theme.svelte'
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
    </ul>
</Navbar>
<main class="container-lg padding-small">
    <slot />
</main>
