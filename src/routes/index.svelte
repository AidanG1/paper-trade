<script>
	import { stock_data } from '../game/stocks';
	import { play_game } from '../game/game';
	let stocks = [...stock_data];
	stocks.forEach((e) => (e = Object.assign({}, e)));
    play_game(stocks)
	setInterval(play_game, 10000, stocks);
</script>

<h1>Welcome to Paper Trading</h1>
<h3>
	A new interpretation of the <a href="https://www.tradethisandthat.com/items/" target="_blank"
		>Trade This and That algorithm</a
	>
</h3>
<h4>
	Based off <a href="https://github.com/davjhan/paper-trader-game" target="_blank"
		>David Han's game</a
	>
</h4>

{stocks}
