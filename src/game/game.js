import { get_price, get_market_day } from './stocks'

export function play_game(stocks) {
    let market_day = get_market_day(1)
    for (let stock of stocks) {
        get_price(stock, market_day)
    }
    console.log(stocks)
    return stocks
}