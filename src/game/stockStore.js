import { writable } from 'svelte/store'

export let stockStore = writable([]);
export let balance = writable({ balance: 100 });
export let purchase_size = writable({ purchase_size: 1 });