# Problem-Solving Assessment — Python & JS Intern

Solutions and reasoning for all 5 problems.

## Problem 1 — Order Processing (Python)
Filtered out pending orders, grouped paid orders per customer using a dict
(O(1) lookups) tracking `total` and `orders` count, then converted to a
list and sorted by `total` descending.

**Why a dict instead of scanning a list to check "have I seen this
customer"?** List membership checks are O(n) each; doing that inside a
loop of n items makes the whole thing O(n²). A dict lookup is O(1) on
average, keeping the whole function O(n).

## Problem 2 — Find & Improve Code (Python)
Original code checked `user["id"] not in result` where `result` is a
list — an O(n) check per iteration, making the function O(n²) overall.
Fixed by using a `set` for O(1) membership checks, while keeping a
separate list to preserve insertion order in the output.

Also handled an edge case: a user dict missing the `"id"` key would crash
with a `KeyError` on `user["id"]`. Fixed using `user.get("id")`, which
returns `None` instead of crashing, and skips users with no id.

## Problem 3 — Search with Debounce (JS)
Implemented `debounce(callback, delay)` — a function that returns a new
function which cancels any pending scheduled call (`clearTimeout`) and
reschedules a new one (`setTimeout`) on every invocation. Only fires
`callback` once the calls stop coming in for `delay` ms.

Relies on closures: `let timer` is declared inside `debounce` but
referenced by the returned inner function, so it stays alive across calls
to that specific returned function — and each call to `debounce(...)`
creates its own private `timer`, independent of any other.

## Problem 4 — API Data Transformation (JS)
Same filter → group → convert pattern as Problem 1, translated to JS:
plain object instead of Python dict, `Object.entries()` instead of
`.items()`, `.push()` instead of `.append()`.

## Problem 5 — Slow Dashboard APIs (JS)
The three `fetch` calls were independent of each other but were awaited
sequentially, so total load time was the sum of all three request times.
Fixed with `Promise.all([...])`, which starts all three requests at once;
total time becomes roughly the time of the slowest request instead of the
sum of all three.

**How I'd investigate this in practice:** open DevTools' Network tab and
check whether the requests' timing bars are staggered (sequential) or
overlapping (concurrent), and check each request's individual response
time to rule out one endpoint being uniquely slow.
