<script>
	import { Select, Input, Switch } from 'spaper';
	import { purchase_size, dark_theme, times_to_run, delay } from '../game/stockStore';
	import { onMount } from 'svelte';
	export let in_progress;
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
		$purchase_size = parseInt(purchase_size_input);
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

	let times_to_run_input = $times_to_run;
	$: {
		$times_to_run = times_to_run_input;
	}
	let delay_input = $delay;
	$: {
		$delay = delay_input;
	}
</script>

<div class="form-group border border-warning inline-block">
	<Select label="Chart Size" bind:value={layout_class}>
		<option value={4}>Small</option>
		<option value={3}>Medium</option>
		<option value={2}>Large</option>
		<option value={1}>Huge</option>
	</Select>
	{#if !in_progress}
		<Select label="Times to Run" bind:value={times_to_run_input}>
			<option value={14}>15</option>
			<option value={29}>30</option>
			<option value={59}>60</option>
			<option value={89}>90</option>
		</Select>
		<Select label="Day Delay" bind:value={delay_input}>
			<option value={500}>Very Short</option>
			<option value={1000}>Short</option>
			<option value={2000}>Normal</option>
			<option value={3500}>Long</option>
			<option value={6000}>Very Long</option>
		</Select>
	{/if}
	<Switch bind:checked={dark_theme_input}>Theme</Switch>
	<Input label="Default Purchase Amount" type="number" bind:value={purchase_size_input} min="1" />
</div>

<style>
</style>
