const {
    checkUserName
} = require("../../helpers/artistEndpointChecker.js")

test("check artist name", () => {
    expect(checkUserName("")).toBe(false);
    expect(checkUserName(1)).toBe(false);
    expect(checkUserName("dhqsdjfqdsksdkldskjfqldkfqslddfs")).toBe(false);
    expect(checkUserName(null)).toBe(false);
    expect(checkUserName("u")).toBe(false);

    expect(checkUserName("Swagger for Life")).toBe(true);
    expect(checkUserName("Lil dev")).toBe(true);
    expect(checkUserName("Developmentforlifer")).toBe(true);
})