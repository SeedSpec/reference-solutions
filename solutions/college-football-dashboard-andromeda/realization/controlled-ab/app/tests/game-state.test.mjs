import assert from "node:assert/strict";
import test from "node:test";
import { mergeGameUpdate } from "../app/dashboard/game-state.mjs";

test("ordinary refresh cannot regress a final score", () => {
  const finalGame = {
    id: "g-02",
    status: "final",
    score: "Iowa 10 · Ohio State 38",
    updated: "2:24 PM CT",
  };
  const regressiveUpdate = {
    status: "in-progress",
    score: "Iowa 10 · Ohio State 31",
    updated: "2:12 PM CT",
  };

  assert.deepEqual(mergeGameUpdate(finalGame, regressiveUpdate), finalGame);
});

test("explicit source corrections are labeled", () => {
  const finalGame = {
    id: "g-02",
    status: "final",
    score: "Iowa 10 · Ohio State 38",
  };
  const correction = {
    status: "final",
    score: "Iowa 10 · Ohio State 37",
  };

  assert.deepEqual(mergeGameUpdate(finalGame, correction, true), {
    ...finalGame,
    ...correction,
    correction: "Source correction applied and labeled",
  });
});
