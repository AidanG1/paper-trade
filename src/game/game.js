import { get_price, get_market_day } from './stocks'

export function play_game(stocks) {
    let market_day = get_market_day(1)
    let stock_object = {}
    for (let ticker in stocks) {
        stock_object[ticker] = get_price(stocks, ticker, market_day)
    }
    stocks = stock_object
    return stocks
}

export function prices_from_stock_store(stocks) {
    let prices = {}
    for (let ticker in stocks) {
        prices[ticker] = stocks[ticker].current_price
    }
    return prices
}