const {
    checkNumber
} = require("../../helpers/songEndpointChecker.js")


test("check number", () => {
    expect(checkNumber("")).toBe(false);
    expect(checkNumber("Dev is cool")).toBe(false);
    expect(checkNumber("dhqsdjfqdsksdkldskjfqldkfqslddfs")).toBe(false);
    expect(checkNumber(null)).toBe(false);
    expect(checkNumber("u")).toBe(false);

    expect(checkNumber(1)).toBe(true);
    expect(checkNumber(25)).toBe(true);
    expect(checkNumber(158)).toBe(true);
})