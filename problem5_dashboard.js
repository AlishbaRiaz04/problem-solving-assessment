/**
 * Problem 5 - Debugging: Slow Dashboard APIs
 *
 * Problem: three independent API calls were awaited sequentially, so the
 * total load time was the SUM of all three request times, even though none
 * of them depend on each other's results.
 *
 * Original (slow):
 *   async function loadDashboard() {
 *       const users = await fetch("/api/users");
 *       const orders = await fetch("/api/orders");
 *       const products = await fetch("/api/products");
 *       return { users, orders, products };
 *   }
 *
 * How I'd investigate: open the browser's Network tab in DevTools and check
 * whether the three requests' timing bars are staggered one after another
 * (sequential) or overlapping (concurrent). Also check each request's own
 * response time to rule out one endpoint being the sole slow one.
 *
 * Fix: since the requests are independent, start them all at once and wait
 * for all of them together with Promise.all -- total time becomes roughly
 * the time of the SLOWEST request, not the sum of all three.
 */

async function loadDashboard() {
    const [users, orders, products] = await Promise.all([
        fetch("/api/users"),
        fetch("/api/orders"),
        fetch("/api/products")
    ]);
    return { users, orders, products };
}
