<script>
	import { Alert, Button } from 'spaper';
	import { purchase_size, balance, portfolio, prices } from '../game/stockStore';
	export let ticker = '';
	// export let price = 10;
	let ps = 0;
	let alert_message = '';
	let share = 'share';
	$: {
		if ($purchase_size === 1) {
			share = 'share';
		} else {
			share = 'shares';
		}
	}
	function buy(amount) {
		ps = amount * $prices[ticker];
		if (ps < $balance) {
			balance.set($balance - ps);
			if (ticker in $portfolio) {
				$portfolio[ticker] += amount;
			} else {
				$portfolio[ticker] = amount;
			}
		} else {
			alert_message = `You cannot afford to buy ${amount} ${share} of ${ticker}`;
			setTimeout(() => {
				alert_message = '';
			}, 3000);
		}
	}
	function sell(amount) {
		if ((ticker in $portfolio) & ($portfolio[ticker] >= amount)) {
			balance.set((parseFloat($balance) + amount * $prices[ticker]));
			$portfolio[ticker] -= amount;
			if ($portfolio[ticker] === 0) {
				delete $portfolio[ticker];
			}
		} else {
			alert_message = `You do not own ${amount} ${share} of ${ticker}`;
			setTimeout(() => {
				alert_message = '';
			}, 3000);
		}
	}
</script>

{#if alert_message}
	<Alert type="danger" dismissible>{alert_message}</Alert>
{/if}
<Button on:click={buy($purchase_size)} type="success">
	Buy {$purchase_size}
	{share} of {ticker}
</Button>
<Button on:click={sell($purchase_size)} type="danger">
	Sell {$purchase_size}
	{share} of {ticker}
</Button>
