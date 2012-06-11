$(document).ready(function(){

    module("azusaar.search", {
        setup: function(){
            $("#qunit-fixture").append('<input type="text" id="query"/>');
            $("#qunit-fixture").append('<span id="year"/>');
            $("#qunit-fixture").append('<span id="month"/>');
            $("#qunit-fixture").append('<span id="day"/>');
            $("#qunit-fixture").append('<input id="checkAtnd" type="checkbox"/>');
            $("#qunit-fixture").append('<input id="checkEventAtnd" type="checkbox"/>');
            $("#qunit-fixture").append('<input id="checkZusaar" type="checkbox"/>');
            $("#qunit-fixture").append('<input id="checkKokucheese" type="checkbox"/>');
            $("#qunit-fixture").append('<input id="checkPartake" type="checkbox"/>');
            $("#qunit-fixture").append('<input id="checkConnpass" type="checkbox"/>');

            // disp count
            $("#qunit-fixture").append( $('<span id="countAtnd"></span>') );
            $("#qunit-fixture").append( $('<span id="countEventAtnd"></span>') );
            $("#qunit-fixture").append( $('<span id="countZusaar"></span>') );
            $("#qunit-fixture").append( $('<span id="countKokucheese"></span>') );
            $("#qunit-fixture").append( $('<span id="countPartake"></span>') );
            $("#qunit-fixture").append( $('<span id="countConnpass"></span>') );
            $("#qunit-fixture").append( $('<span id="total">0</span>件') );
        }
    });

    test("init", function() {
        expect(10);
        var params = {
            query: "keyword",
            year: 2012,
            month: 5,
            day: 17,
            isSearchAtnd: true,
            isSearchEventAtnd: true,
            isSearchZusaar: true,
            isSearchKokucheese: true,
            isSearchPartake: true,
            isSearchConnpass: true
        };

        azusaar.search.init(params);

        assert.strictEqual($("#query").val(), "keyword");
        assert.strictEqual($("#year").text(), "2012");
        assert.strictEqual($("#month").text(), "5");
        assert.strictEqual($("#day").text(), "17");

        assert.ok($("#checkAtnd").attr("checked"));
        assert.ok($("#checkEventAtnd").attr("checked"));
        assert.ok($("#checkZusaar").attr("checked"));
        assert.ok($("#checkKokucheese").attr("checked"));
        assert.ok($("#checkPartake").attr("checked"));
        assert.ok($("#checkConnpass").attr("checked"));
    });

    test("curentDate", function() {
        expect(3);

        var params = {
            year: 2012,
            month: 5,
            day: 17
        };
        azusaar.search.init(params);

        var actual = azusaar.search.currentDate();

        assert.strictEqual(actual.getFullYear(), 2012);
        assert.strictEqual(actual.getRealMonth(), 5);
        assert.strictEqual(actual.getDate(), 17);
    });

    test("checkValue", function() {
        expect(2);
        $("#checkAtnd").check(true);
        $("#checkZusaar").check(false);

        assert.strictEqual(azusaar.search.checkValue("checkAtnd"), "1");
        assert.strictEqual(azusaar.search.checkValue("checkZusaar"), "0");
    });

    test("createSearchParam without ymd", function() {
        expect(1);
        var params = {
            query: "keyword",
            year: 2012,
            month: 4,
            isSearchAtnd: true,
            isSearchEventAtnd: true,
            isSearchZusaar: true,
            isSearchKokucheese: true,
            isSearchPartake: true,
            isSearchConnpass: true
        };

        azusaar.search.init(params);

        assert.strictEqual(azusaar.search.createSearchParam(), "?q=keyword&at=1&ea=1&zu=1&ko=1&pa=1&co=1&y=2012&m=4")
    });

    test("createSearchParam without day", function() {
        expect(1);
        var params = {
            query: "keyword",
            year: 2012,
            month: 5,
            isSearchAtnd: true,
            isSearchEventAtnd: true,
            isSearchZusaar: true,
            isSearchKokucheese: true,
            isSearchPartake: true,
            isSearchConnpass: true
        };

        azusaar.search.init(params);

        assert.strictEqual(azusaar.search.createSearchParam({year:2012, month:5}), "?q=keyword&at=1&ea=1&zu=1&ko=1&pa=1&co=1&y=2012&m=5")
    });

    test("createSearchParam with day", function() {
        expect(1);
        var params = {
            query: "keyword",
            year: 2012,
            month: 5,
            isSearchAtnd: true,
            isSearchEventAtnd: true,
            isSearchZusaar: true,
            isSearchKokucheese: true,
            isSearchPartake: true,
            isSearchConnpass: true
        };

        azusaar.search.init(params);

        assert.strictEqual(azusaar.search.createSearchParam({year:2012, month:5, day:17}), "?q=keyword&at=1&ea=1&zu=1&ko=1&pa=1&co=1&y=2012&m=5&d=17")
    });

    test("validate", function() {
        expect(10);

        var params = {
            query : $.query.get("query"),
            year : $.query.get("y"),
            month : $.query.get("m"),
            day : $.query.get("d"),
            isSearchAtnd : $.query.get("at"),
            isSearchEventAtnd : $.query.get("ea"),
            isSearchZusaar : $.query.get("zu"),
            isSearchKokucheese : $.query.get("ko"),
            isSearchPartake : $.query.get("pa"),
            isSearchConnpass : $.query.get("co")
        };

        var actual = azusaar.search.validate(params);

        var today = new Date();
        assert.strictEqual(actual.query, "");
        assert.strictEqual(actual.year, today.getFullYear());
        assert.strictEqual(actual.month, today.getRealMonth());
        assert.strictEqual(actual.day, today.getDate());
        assert.ok(actual.isSearchAtnd);
        assert.ok(actual.isSearchEventAtnd);
        assert.ok(actual.isSearchZusaar);
        assert.ok(actual.isSearchKokucheese);
        assert.ok(actual.isSearchPartake);
        assert.ok(actual.isSearchConnpass);
    });

});
