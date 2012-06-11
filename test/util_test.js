$(document).ready(function(){

    module("azusaar.azusaar.util");

    test("test getBrowserHeight", function() {
        expect(1);
        var actual = azusaar.util.getBrowserHeight();
        assert.notStrictEqual(actual, 0);
    });

    test("test trim", function() {
        expect(1);
        var str = "AAA BBB          I LOVE DISCO!!!!!!!!!!!!!  HISTORY OF";
        var expected = "AAA BBB I LOVE DISCO!!!!!!!!!!!!! HISTORY OF";

        var actual = azusaar.util.trim(str);
        assert.strictEqual(expected, actual);
    });

    test("test createDays", function() {
        expect(3);

        var actual = azusaar.util.createDays(2012, 5);

        assert.ok($.isArray(actual));
        assert.strictEqual(actual[0], 1);
        assert.strictEqual(actual[30], 31);
    });

    test("test createYmds", function() {
        expect(3);
        var actual = azusaar.util.createYmds(2012, 5);

        assert.ok($.isArray(actual));
        assert.strictEqual(actual[0], "20120501");
        assert.strictEqual(actual[30], "20120531");
    });

    test("test toYYYYMM", function() {
        expect(4);
        assert.strictEqual(azusaar.util.toYYYYMM(2011,9), "201109");
        assert.strictEqual(azusaar.util.toYYYYMM(2011,10), "201110");
        assert.strictEqual(azusaar.util.toYYYYMM("2011","9"), "201109");
        assert.strictEqual(azusaar.util.toYYYYMM("2011","10"), "201110");
    });

    test("test toYYYYMMDD", function() {
        expect(4);
        assert.strictEqual(azusaar.util.toYYYYMMDD(2011,9,1), "20110901");
        assert.strictEqual(azusaar.util.toYYYYMMDD(2011,10,10), "20111010");
        assert.strictEqual(azusaar.util.toYYYYMMDD("2011","9", "1"), "20110901");
        assert.strictEqual(azusaar.util.toYYYYMMDD("2011","10", "10"), "20111010");
    });

    test("test splitKeyword", function() {
        expect(4);
        assert.strictEqual(azusaar.util.splitKeyword(null), "");
        assert.strictEqual(azusaar.util.splitKeyword(""), "");
        assert.deepEqual(azusaar.util.splitKeyword("Google App Engine"), ["Google","App","Engine"]);
        assert.deepEqual(azusaar.util.splitKeyword("Google　App　Engine"), ["Google","App","Engine"]);
    });

    test("test parseDate", function() {
        expect(6);
        var actual = azusaar.util.parseDate("2011-07-19T18:10:20+09:00");

        assert.strictEqual(actual.getFullYear(), 2011);
        assert.strictEqual(actual.getMonth(), 7-1);
        assert.strictEqual(actual.getDate(), 19);
        assert.strictEqual(actual.getHours(), 18);
        assert.strictEqual(actual.getMinutes(), 10);
        assert.strictEqual(actual.getSeconds(), 20);
    });

    test("test isSearch", function() {
        expect(7);
        assert.ok(azusaar.util.isSearch(null));
        assert.ok(azusaar.util.isSearch(true));
        assert.ok(azusaar.util.isSearch(false));
        assert.ok(azusaar.util.isSearch(undefined));
        assert.ok(azusaar.util.isSearch(""));
        assert.ok(azusaar.util.isSearch("1"));

        assert.equal(azusaar.util.isSearch("0"), false);
    });

    test("test getMonthEndDay", function() {
        expect(13);
        assert.strictEqual(azusaar.util.getMonthEndDay(2011, 1), 31);
        assert.strictEqual(azusaar.util.getMonthEndDay(2011, 2), 28);
        assert.strictEqual(azusaar.util.getMonthEndDay(2011, 3), 31);
        assert.strictEqual(azusaar.util.getMonthEndDay(2011, 4), 30);
        assert.strictEqual(azusaar.util.getMonthEndDay(2011, 5), 31);
        assert.strictEqual(azusaar.util.getMonthEndDay(2011, 6), 30);
        assert.strictEqual(azusaar.util.getMonthEndDay(2011, 7), 31);
        assert.strictEqual(azusaar.util.getMonthEndDay(2011, 8), 31);
        assert.strictEqual(azusaar.util.getMonthEndDay(2011, 9), 30);
        assert.strictEqual(azusaar.util.getMonthEndDay(2011, 10), 31);
        assert.strictEqual(azusaar.util.getMonthEndDay(2011, 11), 30);
        assert.strictEqual(azusaar.util.getMonthEndDay(2011, 12), 31);
        assert.strictEqual(azusaar.util.getMonthEndDay(2012, 2), 29);
    });

});
