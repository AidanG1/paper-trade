<script>
	import { Select, Switch } from 'spaper';
	import { dark_theme, times_to_run, delay } from '../game/stockStore';
	import { onMount } from 'svelte';
	let dark_theme_input = $dark_theme;
	let change_html = (theme) => {
		return;
	};
	$: {
		$dark_theme = dark_theme_input;
		change_html($dark_theme);
	}
	onMount(() => {
		change_html = (theme) => {
			if (theme) {
				document.getElementsByTagName('html')[0].classList.add('dark');
			} else {
				document.getElementsByTagName('html')[0].classList.remove('dark');
			}
		};
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
	<Switch bind:checked={dark_theme_input}>Theme</Switch>
</div>

<style>
</style>
