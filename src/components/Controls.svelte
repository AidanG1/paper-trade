<script>
	import { Select, Input } from 'spaper';
	import { purchase_size } from '../game/stockStore';
	import { onMount } from 'svelte';
	let layout_class = 3;
	let purchase_size_input = $purchase_size.purchase_size;
	let change_classes = (layout_class) => {
		return;
	};
	$: {
		if (purchase_size_input < 1) {
			purchase_size_input = 1;
		}
		$purchase_size = { purchase_size: purchase_size_input };
	}
	$: {
		change_classes(layout_class);
	}
	onMount(() => {
		change_classes = (layout_class) => {
			let elems = document.getElementsByClassName('stock_div');
			for (let elem of elems) {
				elem.classList.remove('stock_div_1', 'stock_div_2', 'stock_div_3', 'stock_div_4');
				elem.classList.add(`stock_div_${layout_class}`);
			}
		};
		change_classes(2);
	});
</script>

<Select label="Chart Grid" bind:value={layout_class}>
	<option value={1}>1</option>
	<option value={2}>2</option>
	<option value={3}>3</option>
	<option value={4}>4</option>
</Select>
<Input label="Default Purchase Size" type="number" bind:value={purchase_size_input} min="1" />
