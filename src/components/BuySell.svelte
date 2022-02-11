<script>
	import { Button } from 'spaper';
	import { purchase_size, balance, stocks } from '../game/stockStore';
	export let ticker = '';
	export let price = 10;
	let ps = 0;
    let share = 'share'
    $: {
        if ($purchase_size.purchase_size === 1) {
            share = 'share'
        } else {
            share = 'shares'
        }
    }
	function buy(amount) {
		ps = amount * price;
		if (ps < $balance.balance) {
			$balance.balance = ($balance.balance - ps).toFixed(2);
			if (ticker in $stocks) {
				$stocks.ticker += amount;
			}
		}
	}
	function sell(amount) {
		if ((ticker in $stocks) & ($stocks.ticker > amount)) {
			$balance.balance = ($balance.balance + amount * pric).toFixed(2);
			$stocks.ticker -= amount;
		}
	}
</script>

<Button on:click={buy($purchase_size.purchase_size)} type="success">
	Buy {$purchase_size.purchase_size} {share} of {ticker}
</Button>
<Button on:click={sell($purchase_size.purchase_size)} type="danger">
	Sell {$purchase_size.purchase_size} {share} of {ticker}
</Button>
