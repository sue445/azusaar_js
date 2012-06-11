$(document).ready(function(){

    module("Date.getRealMonth");

    test("test getRealMonth", function() {
        expect(1);
        var date = new Date(2011, 7-1, 7);
        var actual = date.getRealMonth();
        assert.strictEqual(actual, 7);
    });

    module("Date.addDate");

    test("test addDate", function() {
        expect(1);
        var date = new Date(2011, 7-1, 11);
        var actual = date.addDate(3);
        assert.strictEqual(actual.getDate(), 14);
    });

    module("Date.addMonth");

    test("test addMonth 1", function() {
        expect(1);
        var date = new Date(2011, 7-1, 11);
        var actual = date.addMonth(3);
        assert.strictEqual(actual.getMonth(), 10-1);
    });

    test("test addMonth 2", function() {
        expect(2);
        var date = new Date(2011, 12-1, 1);
        var actual = date.addMonth(3);
        assert.strictEqual(actual.getFullYear(), 2012);
        assert.strictEqual(actual.getMonth(), 3-1);
    });

    test("test test addMonth 3", function() {
        expect(1);
        var date = new Date(2011, 7-1, 11);
        var actual = date.addMonth(-1);
        assert.strictEqual(actual.getMonth(), 6-1);
    });

    test("test test addMonth 4", function() {
        expect(2);
        var date = new Date(2011, 1-1, 1);
        var actual = date.addMonth(-1);
        assert.strictEqual(actual.getFullYear(), 2010);
        assert.strictEqual(actual.getMonth(), 12-1);
    });

    test("test test addMonth 5", function() {
        expect(3);
        var date = new Date(2012, 1-1, 30, 19, 30, 0);
        var actual = date.addMonth(1);
        assert.strictEqual(actual.getFullYear(), 2012);
        assert.strictEqual(actual.getMonth(), 2-1);
        assert.strictEqual(actual.getDate(), 29);
    });

    module("Date.sameMonth");

    test("test sameMonth date 1", function() {
        expect(1);
        var date1 = new Date(2011, 7-1, 1);
        var date2 = new Date(2011, 7-1, 31);
        assert.strictEqual(date1.sameMonth(date2), true);
    });

    test("test sameMonth date 2", function() {
        expect(1);
        var date1 = new Date(2011, 4-1, 1);
        var date2 = new Date(2011, 7-1, 31);
        assert.ok(!date1.sameMonth(date2));
    });

    test("test sameMonth params 1", function() {
        expect(2);

        var date = new Date(2012, 5-1, 30);
        assert.strictEqual(date.sameMonth({year:2012, month: 5}), true);
        assert.strictEqual(date.sameMonth({year:2012, month: 4}), false);
    });

    module("Date.sameDay");
    test("sameDay", function() {
        expect(2);

        var date = new Date(2012, 5-1, 30);
        assert.strictEqual(date.sameDay({year:2012, month: 5, day:30}), true);
        assert.strictEqual(date.sameDay({year:2012, month: 5, day:29}), false);
    });
});
