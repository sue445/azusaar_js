$(document).ready(function(){

    module("azusaar.main.pc", {
        setup: function(){
            var a = [];
            a.push('<table id="calendar" border="1">');
            a.push('<tr class="header">');
            a.push('<th>日</th>');
            a.push('<th>月</th>');
            a.push('<th>火</th>');
            a.push('<th>水</th>');
            a.push('<th>木</th>');
            a.push('<th>金</th>');
            a.push('<th>土</th>');
            a.push('</tr>');
            a.push('<tr class="week">');
            a.push('<td id="11"></td>');
            a.push('<td id="12"></td>');
            a.push('<td id="13"></td>');
            a.push('<td id="14"></td>');
            a.push('<td id="15"></td>');
            a.push('<td id="16"></td>');
            a.push('<td id="17"></td>');
            a.push('</tr>');
            a.push('<tr class="week">');
            a.push('<td id="21"></td>');
            a.push('<td id="22"></td>');
            a.push('<td id="23"></td>');
            a.push('<td id="24"></td>');
            a.push('<td id="25"></td>');
            a.push('<td id="26"></td>');
            a.push('<td id="27"></td>');
            a.push('</tr>');
            a.push('<tr class="week">');
            a.push('<td id="31"></td>');
            a.push('<td id="32"></td>');
            a.push('<td id="33"></td>');
            a.push('<td id="34"></td>');
            a.push('<td id="35"></td>');
            a.push('<td id="36"></td>');
            a.push('<td id="37"></td>');
            a.push('</tr>');
            a.push('<tr class="week">');
            a.push('<td id="41"></td>');
            a.push('<td id="42"></td>');
            a.push('<td id="43"></td>');
            a.push('<td id="44"></td>');
            a.push('<td id="45"></td>');
            a.push('<td id="46"></td>');
            a.push('<td id="47"></td>');
            a.push('</tr>');
            a.push('<tr class="week">');
            a.push('<td id="51"></td>');
            a.push('<td id="52"></td>');
            a.push('<td id="53"></td>');
            a.push('<td id="54"></td>');
            a.push('<td id="55"></td>');
            a.push('<td id="56"></td>');
            a.push('<td id="57"></td>');
            a.push('</tr>');
            a.push('<tr class="week">');
            a.push('<td id="61"></td>');
            a.push('<td id="62"></td>');
            a.push('<td id="63"></td>');
            a.push('<td id="64"></td>');
            a.push('<td id="65"></td>');
            a.push('<td id="66"></td>');
            a.push('<td id="67"></td>');
            a.push('</tr>');
            a.push('</table>');
            $("#qunit-fixture").append( $(a.join()) );

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

            $("#qunit-fixture").append( $('<span id="countAtnd"></span>') );
            $("#qunit-fixture").append( $('<span id="countEventAtnd"></span>') );
            $("#qunit-fixture").append( $('<span id="countZusaar"></span>') );
            $("#qunit-fixture").append( $('<span id="countKokucheese"></span>') );
            $("#qunit-fixture").append( $('<span id="countPartake"></span>') );
            $("#qunit-fixture").append( $('<span id="countConnpass"></span>') );
            $("#qunit-fixture").append( $('<span id="total">0</span>件') );

            azusaar.calendar.init({year:2012, month:6});
            azusaar.main.clearCount();

            azusaar.event.zusaar.apiUrl = "http://azusaar.appspot.com/api/zusaar";
            azusaar.event.zusaar.format = "jsonp";
            azusaar.event.zusaar.dataType = "jsonp";

            azusaar.event.kokucheese.apiUrl = "http://azusaar.appspot.com/api/kokucheese";
            azusaar.event.kokucheese.format = "jsonp";
            azusaar.event.kokucheese.dataType = "jsonp";

            azusaar.event.partake.apiUrl = "http://azusaar.appspot.com/api/partake";
            azusaar.event.partake.format = "jsonp";
            azusaar.event.partake.dataType = "jsonp";

        },teardown : function(){
            azusaar.event.zusaar.apiUrl = "/api/zusaar";
            azusaar.event.zusaar.format = "json";
            azusaar.event.zusaar.dataType = "json";

            azusaar.event.kokucheese.apiUrl = "/api/kokucheese";
            azusaar.event.kokucheese.format = "json";
            azusaar.event.kokucheese.dataType = "json";

            azusaar.event.partake.apiUrl = "/api/partake";
            azusaar.event.partake.format = "json";
            azusaar.event.partake.dataType = "json";
        }
    });

    test("addEvent", function() {
        expect(5);

        var event = {
            started_at : "2012-06-10T19:30:00+09:00",
            title : "テストイベント",
            event_url : "http://atnd.org/events/00001"
        };

        azusaar.main.addEvent({event:event}, "atnd");

        assert.strictEqual($("#day10 ul.event li.atnd").size(), 1);
        assert.strictEqual($("#day10 ul.event li.atnd a.event").attr("href"), "http://atnd.org/events/00001");
        assert.strictEqual($("#day10 ul.event li.atnd a.event").attr("title"), "テストイベント");
        assert.strictEqual($("#day10 ul.event li.atnd a.event").attr("alt"), "テストイベント");
        assertThat($("#day10 ul li.atnd a.event").text()).contains("テストイベント");
    });

    test("addEvent with lat and lon", function() {
        expect(4);

        var event = {
            started_at : "2012-06-10T19:30:00+09:00",
            title : "テストイベント",
            event_url : "http://atnd.org/events/00001",
            lat: "35.6708529",
            lon: "139.7605287",
            place: "テストビル"
        };

        azusaar.main.addEvent({event:event}, "atnd");

        assert.strictEqual($("#day10 ul.event li.atnd a.map").attr("href"), "javascript:void(0);return false;");
        assert.strictEqual($("#day10 ul.event li.atnd a.map").attr("title"), "「テストビル」周辺の地図とホテル");
        assert.strictEqual($("#day10 ul.event li.atnd a.map").attr("alt"), "「テストビル」周辺の地図とホテル");
        assert.strictEqual($("#day10 ul.event li.atnd a.map img").attr("src"), "img/compass.png");
    });

    test("addEvent with address", function() {
        expect(4);

        var event = {
            started_at : "2012-06-10T19:30:00+09:00",
            title : "テストイベント",
            event_url : "http://atnd.org/events/00001",
            address: "東京都",
            place: "テストビル"
        };

        azusaar.main.addEvent({event:event}, "atnd");

        assert.strictEqual($("#day10 ul.event li.atnd a.map").attr("href"), "javascript:void(0);return false;");
        assert.strictEqual($("#day10 ul.event li.atnd a.map").attr("title"), "「テストビル」周辺の地図とホテル");
        assert.strictEqual($("#day10 ul.event li.atnd a.map").attr("alt"), "「テストビル」周辺の地図とホテル");
        assert.strictEqual($("#day10 ul.event li.atnd a.map img").attr("src"), "img/compass.png");
    });

    function setUpEvent(icon, count){
        var event = {
            started_at : "2012-06-10T19:30:00+09:00",
            title : "テストイベント",
            event_url : "http://atnd.org/events/00001",
            address: "東京都",
            place: "テストビル"
        };

        for(var i = 0; i < count; i++){
            azusaar.main.addEvent({event:event}, icon);
        }
    }

    test("dispTotal", function() {
        expect(7);

        setUpEvent("atnd", 1);
        setUpEvent("eventatnd", 2);
        setUpEvent("zusaar", 3);
        setUpEvent("kokucheese", 4);
        setUpEvent("partake", 5);
        setUpEvent("connpass", 6);
        azusaar.main.dispTotal();

        assert.strictEqual($("#countAtnd").text(), "(1)");
        assert.strictEqual($("#countEventAtnd").text(), "(2)");
        assert.strictEqual($("#countZusaar").text(), "(3)");
        assert.strictEqual($("#countKokucheese").text(), "(4)");
        assert.strictEqual($("#countPartake").text(), "(5)");
        assert.strictEqual($("#countConnpass").text(), "(6)");
        assert.strictEqual($("#total").text(), "21");
    });

    test("searchAllMonthly", function() {
        expect(7);
        stop();

        var params = {
            query: "java",
            year: 2012,
            month: 5,
            isSearchAtnd: true,
            isSearchEventAtnd: true,
            isSearchZusaar: true,
            isSearchKokucheese: true,
            isSearchPartake: true,
            isSearchConnpass: true
        };

        azusaar.calendar.init({year: 2012, month: 5});
        azusaar.search.init(params);
        var d = azusaar.search.searchAllMonthly();
        d.then(function(){
            start();
            assert.strictEqual($("#countAtnd").text(), "(51)");
            assert.strictEqual($("#countEventAtnd").text(), "(1)");
            assert.strictEqual($("#countZusaar").text(), "(5)");
            assert.strictEqual($("#countKokucheese").text(), "(6)");
            assert.strictEqual($("#countPartake").text(), "(4)");
            assert.strictEqual($("#countConnpass").text(), "(3)");
            assert.strictEqual($("#total").text(), "70");
        }, function(){
            start();
            assert.ok(false);
        });
    });

    test("searchAllDaily", function() {
        expect(7);
        stop();

        var params = {
            query : "google",
            year: 2012,
            month: 5,
            day: 12,
            isSearchAtnd: true,
            isSearchEventAtnd: true,
            isSearchZusaar: true,
            isSearchKokucheese: true,
            isSearchPartake: true,
            isSearchConnpass: true
        };

        azusaar.calendar.init({year: 2012, month: 5});
        azusaar.search.init(params);
        var d = azusaar.search.searchAllDaily();
        d.then(function(){
            start();
            assert.strictEqual($("#countAtnd").text(), "(13)");
            assert.strictEqual($("#countEventAtnd").text(), "(0)");
            assert.strictEqual($("#countZusaar").text(), "(0)");
            assert.strictEqual($("#countKokucheese").text(), "(1)");
            assert.strictEqual($("#countPartake").text(), "(1)");
            assert.strictEqual($("#countConnpass").text(), "(0)");
            assert.strictEqual($("#total").text(), "15");
        }, function(){
            start();
            assert.ok(false);
        });
    });

    module("aazusaar.main.pc.dispHotKeyword", {
        setup : function(){
            $.mockjaxSettings.responseTime = 0;
            $.mockjax({
                url: '/api/hotkeyword',
                proxy: "hotkeyword_mock.json"
            });

            $("#qunit-fixture").append( $('<fieldset id="hotKeyword"><legend>注目のキーワード</legend><ul></ul></fieldset>') );
        },
        teardown : function(){
            $.mockjaxClear();
        }
    });
    test("dispHotKeyword", function() {
        expect(2);
        stop();

        azusaar.main.dispHotKeyword();

        setTimeout(function(){
            start();
            assert.strictEqual($("#hotKeyword ul li:eq(0)").text(), "東京");
            assert.strictEqual($("#hotKeyword ul li:eq(1)").text(), "大阪");
        }, 100);
    });

});
