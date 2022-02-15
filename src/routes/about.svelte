<script>
    import Nav from '../components/Nav.svelte'
</script>

<Nav />
<div class="container">
    <h1>Paper Trading</h1>
    <h2>Created by Aidan Gerber</h2>
    <p>
        A game to paper trade different stocks with fake money. Created with
        Sveltekit.
    </p>
    <p>
        A new interpretation of the <a
            href="https://www.tradethisandthat.com/items/"
            target="_blank">Trade This and That algorithm</a
        >
    </p>
    <p>
        <a href="https://github.com/AidanG1/paper-trade" target="_blank"
            >Source code <img
                class="github-logo"
                src="/github-octocat.svg"
                alt="Github Logo"
                width="50"
                height="50"
            /></a
        >
    </p>
    <p>
        Inspired by <a href="https://paper-trader.davjhan.com/" target="_blank"
            >David Han's game</a
        >
    </p>
</div>

<style>
    .github-logo {
        display: inline-block;
    }
</style>
