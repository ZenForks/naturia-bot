/* eslint-env jest */

const fetch = require("node-fetch");
const { runner, name } = require("../../../commands/fun/anime");
const { JEST_TIMEOUT, isJpg } = require("../../../utils");

jest.setTimeout(JEST_TIMEOUT);

describe(`${name} command`, () => {
  test("return correct value", async () => {
    const result = await runner();
    const getThumbnail = () =>
      fetch(result.thumbnail).then(res => res.buffer());
    const buffer = await getThumbnail();

    expect(result.number).toBeGreaterThanOrEqual(result.min);
    expect(result.number).toBeLessThanOrEqual(result.max);
    expect(result.description).toBeTruthy();
    expect(isJpg(buffer)).toBe(true);
  });
});
