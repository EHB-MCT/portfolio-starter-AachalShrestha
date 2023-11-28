const {
    checkUserName,
    checkPassword,
    checkUserEmail

} = require("../../helpers/userEndPointChecker.js")


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
    expect(checkPassword("")).toBe(false);
    expect(checkPassword(1)).toBe(false);
    expect(checkPassword("dhqsdjfqdsksdkldskjfqldkfqslddfs")).toBe(false);
    expect(checkPassword(null)).toBe(false);
    expect(checkPassword("u")).toBe(false);

    expect(checkPassword("aachal123")).toBe(true);
    expect(checkPassword("onetwothree")).toBe(true);
    expect(checkPassword("fart")).toBe(true);
})

test("check email", () => {
    expect(checkUserEmail("")).toBe(false);
    expect(checkUserEmail(1)).toBe(false);
    expect(checkUserEmail("dhqsdjfqdsksdkldskjfqldkfqslddfs")).toBe(false);
    expect(checkUserEmail(null)).toBe(false);
    expect(checkUserEmail("u")).toBe(false);
    expect(checkUserEmail("aachal.gmail.com")).toBe(false);
    expect(checkUserEmail("aachal.gmail@")).toBe(false);

    expect(checkUserEmail("aachal@gmail.com")).toBe(true);
    expect(checkUserEmail("onetwothree@yahoo.com")).toBe(true);
})