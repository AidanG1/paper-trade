<script>
	import { Select, Input, Switch } from 'spaper';
	import { purchase_size, dark_theme } from '../game/stockStore';
	import { onMount } from 'svelte';
	let layout_class = 3;
	let purchase_size_input = $purchase_size;
	let change_classes = (layout_class) => {
		return;
	};
	let dark_theme_input = $dark_theme;
	let change_html = (theme) => {
		return;
	};
	$: {
		$dark_theme = dark_theme_input;
		change_html($dark_theme);
	}
	$: {
		if (purchase_size_input < 1) {
			purchase_size_input = 1;
		}
		$purchase_size = purchase_size_input;
	}
	$: {
		change_classes(layout_class);
	}
	onMount(() => {
		change_html = (theme) => {
			if (theme) {
				document.getElementsByTagName('html')[0].classList.add('dark');
			} else {
				document.getElementsByTagName('html')[0].classList.remove('dark');
			}
		};
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

<div class="form-group border border-warning inline-block">
	<Select label="Chart Size" bind:value={layout_class}>
		<option value={1}>Huge</option>
		<option value={2}>Large</option>
		<option value={3}>Medium</option>
		<option value={4}>Small</option>
	</Select>
	<Switch bind:checked={dark_theme_input}>Theme</Switch>
	<Input label="Default Purchase Amount" type="number" bind:value={purchase_size_input} min="1" />
</div>

<style>
</style>
