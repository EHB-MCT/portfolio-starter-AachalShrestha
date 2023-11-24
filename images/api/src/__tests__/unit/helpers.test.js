const {
    checkUserName
} = require("../../helpers/endPointChecker.js")


test("check name", () => {
    expect(checkUserName("")).toBe(false);
    expect(checkUserName(1)).toBe(false);
    expect(checkUserName("dhqsdjfqdsksdkldskjfqldkfqslddfs")).toBe(false);
    expect(checkUserName(null)).toBe(false);
    expect(checkUserName("u")).toBe(false);
})