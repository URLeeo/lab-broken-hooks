# My Lab Notes

Fill this file in as you work through the lab. Be honest and specific. This file is part of what you hand in.

## What I think is wrong

Problem 1:

When I click a user card, the posts panel opens, but the Network tab keeps showing repeated requests to `/posts?userId=...`. My first theory is that the posts-fetching component has a `useEffect` that runs more than once. Since the lab hint mentions code running over time, I think the effect probably depends on some state that it also updates.

Problem 2:

When I click the favorite button, the data value is probably being changed, but the UI does not reliably update right away. My first theory is that the code mutates the existing user object or array instead of giving React a new array/object reference. React needs a new state value to notice the change and re-render.

## What did I ask the AI

I used AI help with this prompt: "Complete this lab for me and give final version in zip format." The AI inspected the React files, identified the two hook/state bugs, made targeted fixes, and filled in these notes.

## What was the solution

Problem 1:

The issue was in `app/components/UserDetail.js`. The `useEffect` dependency array was `[userId, posts]`, but the effect itself calls `setPosts(data)`. That means every successful fetch changes `posts`, which triggers the effect again, which fetches again, and the loop continues.

I changed the dependency array to `[userId]` because the posts should be fetched only when the selected user changes. I also store the user id together with the fetched posts, so the component can show loading when the selected user does not match the loaded posts yet. A small `isCurrent` cleanup guard prevents an old request from updating state after the selected user changes quickly.

Problem 2:

The issue was in `app/components/UsersExplorer.js`. The favorite toggle found a user inside the current `users` array, changed `user.favorite` directly, and then called `setUsers(users)` with the same array reference.

I changed it to use `setUsers((currentUsers) => currentUsers.map(...))`. For the matching user, it returns a new object with the updated `favorite` value. For all other users, it returns the existing object. This gives React a new array reference and a new object for the changed card, so the UI updates immediately.
