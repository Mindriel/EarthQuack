export function tomorrowsDate() {
    return new Date().toISOString().substr(0, 10);
}
