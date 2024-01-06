const {
    checkArtistName
} = require("../../helpers/artistEndpointChecker.js")

test("check artist name", () => {
    expect(checkArtistName("")).toBe(false);
    expect(checkArtistName(1)).toBe(false);
    expect(checkArtistName("dhqsdjfqdsksdkldskjfqldkfqslddfs")).toBe(false);
    expect(checkArtistName(null)).toBe(false);
    expect(checkArtistName("u")).toBe(false);

    expect(checkArtistName("Swagger for Life")).toBe(true);
    expect(checkArtistName("Lil dev")).toBe(true);
    expect(checkArtistName("Developmentforlifer")).toBe(true);
})