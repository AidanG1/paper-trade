<script>
	import Nav from '../components/Nav.svelte';
	import { onMount } from 'svelte';
	let style = `
    --scale: ${2*Math.random()};
    --rotate: ${180-360*Math.random()}deg;
    --duration: ${10*Math.random()}s;
	`;
	onMount(() => {
		let x = 0;
		let intervalID = setInterval(() => {
			let moneyClone = document.getElementById('money').cloneNode();
			document.getElementById('money-div').appendChild(moneyClone);
			style = `
			--scale: ${3*Math.random()};
			--rotate: ${180-360*Math.random()}deg;
			--duration: ${5*Math.random()+1}s;
			`;
			if (++x >= 10) {
				window.clearInterval(intervalID);
			}
		}, 1000);
	});
</script>

<Nav />
<div class="container" id="home_container">
	<h1>Welcome to Paper Trading</h1>
	<div id="money-div">
		<img src="/money.svg" alt="Money SVG" id="money" class="money-svg" style={style} />
	</div>
</div>

<style>
	@keyframes moveToRight {
		0% {
			transform: translateX(0) translateY(0);
		}
		50% {
			transform: translateX(50%) translateY(100%) rotate(var(--rotate)) scale(var(--scale));
		}
		100% {
			transform: translateX(100%) translateY(0);
		}
	}

	.money-svg {
		/* --scale: 2;
		--rotate: 90deg; */
		animation: moveToRight var(--duration) linear infinite;
		transition: 300ms linear;
	}

	#money-div {
		width: 100%;
	}
</style>
