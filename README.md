# One-Time Token Service — Starter Scaffold

Build a single-use, expiring token service backed by Redis. You implement two
functions and a test that proves a token can be used **at most once**, even when
five consumers hit it at the same instant.

This scaffold gives you the plumbing (dependencies, `.env`, file shapes). Your
job is the two functions and the concurrency test — see the `TODO`s in the code.

## Setup

```bash
npm install
cp .env.example .env      # then set REDIS_URL (local Docker Redis from LU 4.0.1)
docker start redis-m4     # make sure your Redis is running
```

## What to implement

- **`token-service.js`**
  - `issueToken(payload, ttlSeconds)` — random id + JSON payload + atomic `SET ... EX`.
  - `consumeToken(tokenId)` — atomic `GETDEL`; return `{ ok, payload }` / `{ ok: false, reason }`.
- **`test.js`**
  - Issue one token, fire **5 `consumeToken` calls at once** with `Promise.all`,
    assert **exactly one** succeeds.

## Run the test

```bash
npm test
```

You should see `winners: 1` and `PASS: token was single-use.`

The token is single-use: of five simultaneous consumers, exactly one can
consume it. The observed winner count is 1.

## Submit

Open a Pull Request containing your `token-service.js`, `test.js`, and paste the
test output (showing `winners: 1`) in the PR description. Submit the PR link.
