<script>
	import { Select, Input } from 'spaper';
	import { purchase_size } from '../game/stockStore';
	import { onMount } from 'svelte';
	let layout_class = 3;
	let purchase_size_input = $purchase_size;
	let change_classes = (layout_class) => {
		return;
	};
	$: {
		if (purchase_size_input < 1) {
			purchase_size_input = 1;
		}
		$purchase_size = parseInt(purchase_size_input);
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

<div class="form-group">
	<Select label="Chart Size" bind:value={layout_class}>
		<option value={4}>Small</option>
		<option value={3}>Medium</option>
		<option value={2}>Large</option>
		<option value={1}>Huge</option>
	</Select>
	<Input label="Default Purchase Amount" type="number" bind:value={purchase_size_input} min="1" />
</div>
