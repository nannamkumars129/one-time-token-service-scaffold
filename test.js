// test.js
// Prove the service is single-use under concurrency.
//
// TODO:
//   1. Issue one token.
//   2. Fire 5 consumeToken calls AT ONCE with Promise.all.
//   3. Count how many returned { ok: true } and assert it is exactly 1.
//   4. Print the winners count so it shows in the output.

import assert from "node:assert/strict";
import { issueToken, consumeToken, closeRedis } from "./token-service.js";

async function main() {
  try {
    const id = await issueToken({ userId: 42 }, 60);
    console.log("issued token:", id);

    const results = await Promise.all(
      Array.from({ length: 5 }, () => consumeToken(id)),
    );

    const winners = results.filter((result) => result.ok === true).length;
    console.log("winners:", winners);

    assert.equal(winners, 1, "SINGLE-USE VIOLATED! winners = " + winners);
    console.log("PASS: token was single-use.");
  } finally {
    await closeRedis();
  }
}

main();
