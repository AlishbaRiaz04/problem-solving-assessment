/**
 * Problem 4 - API Data Transformation
 *
 * Task: implement getCustomerSummary(orders). Ignore pending orders and
 * return each customer's total and paid-order count.
 */

const orders = [
    { id: 1, customer: "Aamir", amount: 1000, status: "paid" },
    { id: 2, customer: "Ali", amount: 500, status: "pending" },
    { id: 3, customer: "Aamir", amount: 700, status: "paid" }
];

function getCustomerSummary(orders) {
    // Step 1 & 2: filter + group in one pass, using an object as a dict
    const grouping = {};
    for (const order of orders) {
        if (order.status === "pending") {
            continue;
        }

        const customer = order.customer;
        const amount = order.amount;

        if (customer in grouping) {
            grouping[customer].total += amount;
            grouping[customer].orders += 1;
        } else {
            grouping[customer] = { total: amount, orders: 1 };
        }
    }

    // Step 3: convert grouping object -> array of objects
    const result = [];
    for (const [customer, data] of Object.entries(grouping)) {
        result.push({
            customer: customer,
            total: data.total,
            orders: data.orders
        });
    }

    return result;
}

console.log(getCustomerSummary(orders));
// Expected: [ { customer: 'Aamir', total: 1700, orders: 2 } ]
