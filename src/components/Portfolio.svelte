<script>
	import { Table } from 'spaper';
	import { stocks, balance } from '../game/stockStore';
	let data = [];
	function table_stocks(stocks) {
		for (let stock in stocks) {
			data = [...data, { Ticker: stock, Amount: stocks.stock }];
		}
	}
	const subscribe = stocks.subscribe((value) => {
		console.log(value);
		table_stocks(value);
	});
    subscribe()
	// table_stocks($stocks);
</script>

<h4>Balance: ${$balance.balance}</h4>
<Table {data} hoverable />
