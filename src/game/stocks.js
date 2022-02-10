// https://stackoverflow.com/a/36481059
// Standard Normal variate using Box-Muller transform.
function randn_bm() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}


export function get_market_day(volatility_multiplier) {
    // randn_bm() is a random normal number
    // this is then multiplied by 10 so the market days are normally
    // 3 standard deviations away would be a 7.5% day, 4 would be a 10% day
    return 1 + volatility_multiplier * (randn_bm()) / 40
}

export function get_price(stock, market_day) {
    // market day is how much the market moves on any given day
    // stock correlation of 1 means that the stock moves exactly with the market
    // if the stock correlation is less than one there is added randomness.
    // correlation multiplier acts similar to beta in the real stock market
    let random_correlation = 1 + (randn_bm() + stock.boost) / (stock.correlation) / 5
    let correlated_market = 1 + (market_day - 1) * (random_correlation * stock.correlation_multiplier)
    if (correlated_market <= 0) {
        correlated_market = 0.02
    }
    let price = stock.current_price
    let price_change = 0
    if (correlated_market > 1) {
        stock.boost -= stock.boost_regressor
        price_change = correlated_market
    } else {
        stock.boost += stock.boost_regressor
        price_change = correlated_market
    }
    stock.price_change = price_change
    price = (price_change * stock.current_price).toFixed(2)
    if (price < 0.05) {
        price = 0.05
    }
    stock.current_price = price
    stock.price_history.push(price)
}

export const stock_data = [
    {
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
    {
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
    {
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
    {
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
]