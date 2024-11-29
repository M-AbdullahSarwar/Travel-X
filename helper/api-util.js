export async function getAllDestinations() {
    return fetch('http://localhost:3000/api/destinations').then(res => res.json()).then(data => data.destinations)
}
