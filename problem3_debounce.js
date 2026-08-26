/**
 * Problem 3 - Search with Debounce
 *
 * Task: case-insensitive search handler that waits 300ms after typing stops.
 */

const users = [
    { id: 1, name: "Aamir" },
    { id: 2, name: "Ali" },
    { id: 3, name: "Ahmed" },
    { id: 4, name: "Asad" }
];

function searchUsers(query) {
    return users.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase())
    );
}

// Generic debounce utility: waits `delay` ms after the last call before
// actually running `callback`. Each new call cancels the previously
// scheduled one via clearTimeout, so only the last call in a rapid burst
// actually fires.
function debounce(callback, delay) {
    let timer; // private per debounce() call, kept alive via closure
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), delay);
    };
}

const handleSearch = debounce((query) => {
    console.log(searchUsers(query));
}, 300);

/**
 * Follow-up answers:
 *
 * Why clearTimeout()? Without it, every keystroke would schedule its own
 * independent search that fires 300ms later regardless of further typing,
 * so a fast typist would still trigger one search per keystroke -- just
 * delayed, not reduced. clearTimeout cancels the previous pending call so
 * only the last one (after typing stops) survives to actually run.
 *
 * What problem does debounce solve? It prevents firing an action (e.g. an
 * API call) on every single keystroke. Without it, typing "ali" fires 3
 * searches ("a", "al", "ali") instead of 1, wasting requests and risking
 * out-of-order/stale responses overwriting newer results.
 *
 * What happens without it? searchUsers would run on every keystroke,
 * causing unnecessary calls/renders and potential race conditions between
 * overlapping in-flight requests.
 */
