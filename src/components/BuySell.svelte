<script>
	import { Button } from 'spaper';
	import { purchase_size, balance, portfolio, stocks } from '../game/stockStore';
	export let ticker = '';
	// export let price = 10;
	let ps = 0;
	let share = 'share';
	$: {
		if ($purchase_size === 1) {
			share = 'share';
		} else {
			share = 'shares';
		}
	}
	function buy(amount) {
		ps = amount * $stocks[ticker].current_price;
		if (ps < $balance) {
			$balance = ($balance - ps).toFixed(2);
			if (ticker in $portfolio) {
				$portfolio[ticker] += amount;
			} else {
				$portfolio[ticker] = amount;
			}
		}
	}
	function sell(amount) {
		if ((ticker in $portfolio) & ($portfolio[ticker] >= amount)) {
			$balance = (parseFloat($balance) + amount * $stocks[ticker].current_price).toFixed(2);
			$portfolio[ticker] -= amount;
			if ($portfolio[ticker] === 0) {
				delete $portfolio[ticker];
			}
		}
	}
</script>

<Button on:click={buy($purchase_size)} type="success">
	Buy {$purchase_size}
	{share} of {ticker}
</Button>
<Button on:click={sell($purchase_size)} type="danger">
	Sell {$purchase_size}
	{share} of {ticker}
</Button>
