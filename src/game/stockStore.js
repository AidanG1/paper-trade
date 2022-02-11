import { writable, readable, derived } from 'svelte/store'

export let portfolio = writable({});
export let balance = writable(100);
export let purchase_size = writable(1);
let stock_info = {
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
export let stocks = writable(stock_info)
export const stock_data = readable(stock_info)
export const net_worth = derived([balance, portfolio, stocks], ([$balance, $portfolio, $stocks]) => {
    let net_worth = parseFloat($balance)
    for (let ticker in $portfolio) {
        net_worth += parseFloat($stocks[ticker].current_price) * $portfolio[ticker]
    }
    return parseFloat(net_worth).toFixed(2)
});