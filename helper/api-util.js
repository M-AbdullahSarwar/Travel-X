export async function getAllDestinations() {
    return fetch('/api/destinations').then(res => res.json()).then(data => data.destinations)
}