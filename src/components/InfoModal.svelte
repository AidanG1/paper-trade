<script>
	import { Button, Modal } from 'spaper';
	let showModal = false;
</script>

<Button on:click={() => (showModal = true)}>?</Button>
<Modal bind:active={showModal} title="Info">
	<p>
		Featuring a completely draggable UI
	</p>
	<p>
		A new interpretation of the <a href="https://www.tradethisandthat.com/items/" target="_blank"
			>Trade This and That algorithm</a
		>
	</p>
	<p>
		<a href="https://github.com/AidanG1/paper-trade" target="_blank">Source code <img class="github-logo" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.freebiesupply.com%2Flogos%2Flarge%2F2x%2Fgithub-icon-logo-png-transparent.png&f=1&nofb=1" alt="Github Logo" width="50" height="50"></a>
	</p>
	<p>
		Inspired by <a href="https://paper-trader.davjhan.com/" target="_blank"
			>David Han's game</a
		>
	</p>
</Modal>

<style>
	.github-logo {
		display: inline-block;
	}
</style>
