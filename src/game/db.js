import Dexie from 'dexie';

export const db = new Dexie('paperDB');
db.version(1).stores({
    achievements: '++id, player_id, description, achieved',
    historical_runs: '++id, completion_date, day_length, final_net_worth, starting_net_worth, final_balance, final_portfolio',
    player: '++id, username, level, completed_runs, total_net_worth'
});
