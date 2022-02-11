<script>
	import { Table } from 'spaper';
	import { portfolio, balance, net_worth, stocks } from '../game/stockStore';
	let data = [];
	function table_stocks(portfolio_stocks, stocks_stocks) {
		data = [];
		for (let stock in portfolio_stocks) {
			data = [
				...data,
				{
					Ticker: stock,
					Amount: portfolio_stocks[stock],
					Value: (portfolio_stocks[stock] * $stocks[stock].current_price).toFixed(2)
				}
			];
		}
	}
	$: {
		table_stocks($portfolio, $stocks);
	}
</script>

<div class="border border-warning inline-block">
	<h4>Net Worth: ${$net_worth}<br />Balance: ${$balance.toFixed(2)}</h4>
	<Table {data} hoverable />
</div>

<style>
</style>
