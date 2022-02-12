<script>
	import { Alert } from 'spaper';
	import { net_worth, day_counter } from '../game/stockStore';
</script>

<div id="game-ended-alert" style="width:100%">
	<Alert type="secondary" dismissible>
		<h3>Game Finished</h3>
		<p>
			You have ${$net_worth} after starting with $100 and playing for {$day_counter} rounds. You made
			an average of ${(($net_worth - 100) / $day_counter).toFixed(2)} per round
		</p>
	</Alert>
</div>
