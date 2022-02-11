import { get_price, get_market_day } from './stocks'

export function play_game(stocks) {
    let market_day = get_market_day(1)
    for (let ticker in stocks) {
        get_price(stocks, ticker, market_day)
    }
    return stocks
}