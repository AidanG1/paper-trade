import { writable, readable, derived } from 'svelte/store'
import { spring } from 'svelte/motion';
import { prices_from_stock_store } from './game'
import cloneDeep from 'lodash/cloneDeep.js';
export let portfolio = writable({});
export let balance = spring(100);
export let dark_theme = writable(true)
export let purchase_size = writable(1);
export let delay = spring(2000)
export let times_to_run = spring(29)
export let game_state = writable({ started: false, in_progress: false, ended: false })
const stock_info = {
    T: {
        company: 'AT&T',
        ticker: 'T',
        sector: 'Communications',
        current_price: 10,
        price_history: [10],
        price_change: 0,
        volatility: 1.5,
        correlation_multiplier: 1.5,
        correlation: 0.6,
        boost: 0,
        boost_regressor: 0.01,
    },
    TMUS: {
        company: 'T-Mobile',
        ticker: 'TMUS',
        sector: 'Communications',
        current_price: 10,
        price_history: [10],
        price_change: 0,
        volatility: 1.5,
        correlation_multiplier: 1.5,
        correlation: 0.6,
        boost: 0.01,
        boost_regressor: 0.01,
    },
    NET: {
        company: 'Cloudflare',
        ticker: 'NET',
        sector: 'Information Technology',
        current_price: 15,
        price_history: [15],
        price_change: 0,
        volatility: 2.5,
        correlation_multiplier: 1.5,
        correlation: 0.45,
        boost: 0.03,
        boost_regressor: 0.025,
    },
    GME: {
        company: 'GameStop',
        ticker: 'GME',
        sector: 'Consumer Discretionary',
        current_price: 25,
        price_history: [25],
        price_change: 0,
        volatility: 5,
        correlation_multiplier: 1.5,
        correlation: 0.01,
        boost: 0.04,
        boost_regressor: 0.04,
    },
}
export let prices = spring(prices_from_stock_store(stock_info))
export let stocks = writable(cloneDeep(stock_info))
export const stock_data = readable(cloneDeep(stock_info))
export const net_worth = derived([balance, portfolio, prices], ([$balance, $portfolio, $prices]) => {
    let net_worth = parseFloat($balance)
    for (let ticker in $portfolio) {
        net_worth += parseFloat($prices[ticker]) * $portfolio[ticker]
    }
    return +(net_worth.toFixed(2))
});