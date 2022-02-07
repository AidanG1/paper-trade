// https://stackoverflow.com/a/36481059
// Standard Normal variate using Box-Muller transform.
function randn_bm() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}


export function get_market_day(volatility_multiplier) {
    return volatility_multiplier * (randn_bm() - 0.5)
}

export function get_price(stock, market_day) {
    // looking for difference between correlation and 
    let market_movement = stock.correlation_multiplier * market_day * (randn_bm() - 0.5) * Math.abs(stock.correlation - 1)
    console.log(market_movement)
    let random_multiplier = stock.volatility * (Math.random() + stock.boost - 0.05)
    console.log(random_multiplier)
    let price = stock.current_price
    let price_change = 0
    if (random_multiplier > 0) {
        stock.boost -= stock.boost_regressor
        price_change = market_movement * (1 + random_multiplier)
    } else {
        stock.boost += stock.boost_regressor
        price_change = market_movement * (1 - random_multiplier)
    }
    stock.price_change = price_change
    price = price_change * stock.current_price
    stock.current_price = price
    stock.price_history.push(price)
}

export let stock_data = [
    {
        name: '1',
        ticker: 'hi',
        start_price: 10,
        current_price: 10,
        price_history: [10],
        price_change: 0,
        volatility: 2,
        correlation_multiplier: 1.5,
        correlation: 0.6,
        boost: 0.01,
        boost_regressor: 0.01,
    }
]