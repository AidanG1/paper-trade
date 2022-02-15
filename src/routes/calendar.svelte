<script>
    import { Table } from 'spaper'
    import { stock_data, times_to_run, day_counter } from '../game/stockStore'
    import { onMount } from 'svelte'
    let events = {} // {0: ['e1','e2']}
    let data = [] // [{ day: 0, events: 'Game Start' }]
    for (let i = 0; i <= $times_to_run; i++) {
        data = [...data, { Day: i, Event: '' }]
        events[i] = []
    }
    events[0] = [...events[0], 'Game Start']
    for (let stock of Object.keys($stock_data)) {
        stock = $stock_data[stock]
        if (stock.dividend > 0) {
            for (
                let i = stock.dividend_frequency;
                i <= $times_to_run - stock.dividend_frequency;
                i += stock.dividend_frequency
            ) {
                events[i].push(
                    `${stock.ticker} pays a $${stock.dividend} dividend`
                )
                events = events
            }
        }
    }
    function events_to_data(events, ttr) {
        for (let event_key of Object.keys(events)) {
            if (data[event_key] !== undefined) {
                data[event_key].Event = events[event_key].join(', ')
            }
        }
    }
    $: {
        events_to_data(events, $times_to_run)
    }
    $: {
        if (data.length < $times_to_run) {
            for (let i = data.length; i <= $times_to_run; i++) {
                data = [...data, { Day: i, Event: '' }]
            }
        } else if ($times_to_run < data.length) {
            data = data.slice(0, $times_to_run)
        }
    }
    function current_day(day) {
        if (day - 1 > 0) {
            events[day - 1].shift()
        }
        events[day] = ['CURRENT DAY', ...events[day]]
        events_to_data(events, 0)
    }
    $: {
        current_day($day_counter)
    }
</script>

<Table {data} hoverable id="calendar-table" />
