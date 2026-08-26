"""
Problem 2 - Find and Improve Code

Original:
    def get_unique_users(users):
        result = []
        for user in users:
            if user["id"] not in result:
                result.append(user["id"])
        return result

Issue: `user["id"] not in result` scans the whole `result` list on every
iteration. Checking membership in a list is O(n), and this check happens
inside a loop that runs n times -> O(n^2) overall (0+1+2+...+n-1
comparisons, which grows quadratically, not linearly -- doubling n
roughly quadruples the work).

Fix: use a set for membership checks (O(1) average), while keeping a
separate list to preserve the original insertion order in the output.
"""


def get_unique_users(users):
    seen = set()
    result = []
    for user in users:
        user_id = user.get("id")  # avoids crashing on a missing "id" key
        if user_id is None:
            continue  # can't meaningfully dedupe a user with no id
        if user_id not in seen:
            seen.add(user_id)
            result.append(user_id)
    return result


if __name__ == "__main__":
    users = [
        {"id": 1, "name": "Aamir"},
        {"id": 2, "name": "Ali"},
        {"id": 1, "name": "Aamir"},
        {"name": "NoIdUser"},  # edge case: missing "id" key
        {"id": 3, "name": "Ahmed"},
    ]
    print(get_unique_users(users))
