"""
Problem 1 - Order Processing

Task: Ignore unpaid orders, calculate total spending and paid-order count
per customer, and sort by total spending descending.
"""

orders = [
    {"id": 1, "customer": "Aamir", "amount": 1200, "status": "paid"},
    {"id": 2, "customer": "Ali", "amount": 500, "status": "pending"},
    {"id": 3, "customer": "Aamir", "amount": 800, "status": "paid"},
    {"id": 4, "customer": "Ahmed", "amount": 1500, "status": "paid"},
    {"id": 5, "customer": "Ali", "amount": 700, "status": "paid"},
]


def get_customer_summary(orders):
    # Step 1: filter + group in a single pass using a dict for O(1) lookups
    grouping = {}
    for order in orders:
        if order["status"] == "pending":
            continue  # skip unpaid orders

        customer = order["customer"]
        amount = order["amount"]

        if customer in grouping:
            grouping[customer]["total"] += amount
            grouping[customer]["orders"] += 1
        else:
            grouping[customer] = {"total": amount, "orders": 1}

    # Step 2: convert grouping dict -> list of dicts with "customer" included
    result = []
    for customer, data in grouping.items():
        result.append({
            "customer": customer,
            "total": data["total"],
            "orders": data["orders"],
        })

    # Step 3: sort by total, descending
    result.sort(key=lambda x: x["total"], reverse=True)
    return result


if __name__ == "__main__":
    for row in get_customer_summary(orders):
        print(row)

"""
Why a dict for grouping instead of scanning a list?
Checking "have I seen this customer" via `x in some_list` is O(n) per check,
which makes the whole loop O(n^2) in the worst case (see problem2 for the
full breakdown of this exact trap). A dict lookup is O(1) on average, so
grouping this way keeps the whole function O(n).
"""
