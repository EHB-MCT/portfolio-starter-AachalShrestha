const {
    checkUserName
} = require("../../helpers/endPointChecker.js")


test("check name", () => {
    expect(checkUserName("")).toBe(false);
    expect(checkUserName(1)).toBe(false);
    expect(checkUserName("dhqsdjfqdsksdkldskjfqldkfqslddfs")).toBe(false);
    expect(checkUserName(null)).toBe(false);
    expect(checkUserName("u")).toBe(false);

    expect(checkUserName("Aachal Shrestha")).toBe(true);
    expect(checkUserName("Mey")).toBe(true);
    expect(checkUserName("Swag")).toBe(true);
})

test("check password", () => {
    expect(checkUserName("")).toBe(false);
    expect(checkUserName(1)).toBe(false);
    expect(checkUserName("dhqsdjfqdsksdkldskjfqldkfqslddfs")).toBe(false);
    expect(checkUserName(null)).toBe(false);
    expect(checkUserName("u")).toBe(false);

    expect(checkUserName("aachal123")).toBe(true);
    expect(checkUserName("onetwothree")).toBe(true);
    expect(checkUserName("fart")).toBe(true);
})