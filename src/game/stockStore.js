import { writable, readable, derived } from 'svelte/store'
import { browser } from '$app/env';
import { spring } from 'svelte/motion';
import { prices_from_stock_store } from './game'
import cloneDeep from 'lodash/cloneDeep.js';
export let portfolio = writable({});
export let balance = writable(100);
export let purchase_size = writable(1); // this can be a number of the word 'max'
export let delay = writable(2000)
export let day_counter = writable(0)
export let times_to_run = writable(30)
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
        correlation_multiplier: 1.3,
        correlation: 0.6,
        boost: 0,
        boost_regressor: 0.01,
        dividend: 1,
        dividend_frequency: 8,
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
        dividend: 0.8,
        dividend_frequency: 5,
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
        boost: 0.05,
        boost_regressor: 0.03,
        dividend: 0,
        dividend_frequency: 100,
    },
    GME: {
        company: 'GameStop',
        ticker: 'GME',
        sector: 'Consumer Discretionary',
        current_price: 20,
        price_history: [20],
        price_change: 0,
        volatility: 4,
        correlation_multiplier: 1,
        correlation: 0.01,
        boost: -0.02,
        boost_regressor: 0.04,
        dividend: 0,
        dividend_frequency: 100,
    },
    BRKB: {
        company: 'Berkshire Hathaway',
        ticker: 'BRKB',
        sector: 'Consumer Discretionary',
        current_price: 15,
        price_history: [15],
        price_change: 0,
        volatility: 0.8,
        correlation_multiplier: 1,
        correlation: 0.01,
        boost: 0.01,
        boost_regressor: 0.02,
        dividend: 0.3,
        dividend_frequency: 1,
    },
}
export let prices = writable(prices_from_stock_store(stock_info))
export let stocks = writable(cloneDeep(stock_info))
export const stock_data = readable(cloneDeep(stock_info))


export const net_worth = derived([balance, portfolio, prices], ([$balance, $portfolio, $prices]) => {
    let net_worth = parseFloat($balance)
    for (let ticker in $portfolio) {
        net_worth += parseFloat($prices[ticker]) * $portfolio[ticker]
    }
    return +(net_worth.toFixed(2))
});
export let net_worth_history = writable([])


// https://natclark.com/tutorials/svelte-sync-localstorage-with-store/
let theme = true;
if (typeof localStorage !== `undefined`) {
    if (localStorage.getItem(`theme`) !== null) {
        theme = localStorage.getItem(`theme`);
    }
}
export let dark_theme = writable(theme)
dark_theme.subscribe((newValue) => {
    if (typeof localStorage !== `undefined`) {
        localStorage.setItem(`theme`, newValue);
    }
});