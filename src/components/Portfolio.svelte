<script>
	import { Table } from 'spaper';
	import { portfolio, balance, net_worth } from '../game/stockStore';
	let data = [];
	function table_stocks(stocks) {
        data = []
		for (let stock in stocks) {
			data = [...data, { Ticker: stock, Amount: stocks[stock] }];
		}
	}
    $: {
        table_stocks($portfolio)
    }
</script>

<h4>Net Worth: ${$net_worth}, Balance: ${$balance}</h4>
<Table {data} hoverable />
