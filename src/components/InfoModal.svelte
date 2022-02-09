<script>
	import { Button, Modal } from 'spaper';
	let showModal = false;
</script>

<Button on:click={() => (showModal = true)}>?</Button>
<Modal bind:active={showModal} title="Info">
	<p>
		A new interpretation of the <a href="https://www.tradethisandthat.com/items/" target="_blank"
			>Trade This and That algorithm</a
		>
	</p>
	<p>
		Based off <a href="https://paper-trader.davjhan.com/" target="_blank"
			>David Han's game</a
		>
	</p>
</Modal>
