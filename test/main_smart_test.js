$(document).ready(function(){

    module("azusaar.main.smart");

    test("_getRemainingDays", function() {
        expect(3);

        var counts = [];
        counts[1] = 1;
        counts[2] = 1;
        counts[3] = 1;
        counts[4] = 1;
        counts[5] = 1;
        //counts[6] = 1;
        counts[7] = 1;
        counts[8] = 1;
        counts[9] = 1;
        counts[10] = 1;
        counts[11] = 1;
        counts[12] = 1;
        counts[13] = 1;
        counts[14] = 1;
        counts[15] = 1;
        counts[16] = 1;
        //counts[17] = 1;
        counts[18] = 1;
        counts[19] = 1;
        counts[20] = 1;
        counts[21] = 1;
        counts[22] = 1;
        counts[23] = 1;
        counts[24] = 1;
        counts[25] = 1;
        counts[26] = 1;
        counts[27] = 1;
        counts[28] = 1;
        counts[29] = 1;
        counts[30] = 1;
        //counts[31] = 1;

        var actual = azusaar.main._getRemainingDays({year: 2012, month:6}, counts);
        assert.strictEqual(actual[1], undefined);
        assert.strictEqual(actual[6], true);
        assert.strictEqual(actual[17], true);
    });

    module("azusaar.main.smart /smart/index.html", {
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

            $("#qunit-fixture").append('<span id="year"></span>年<span id="month"></span>月');
            $("#qunit-fixture").append('<input type="hidden" id="query" />');
            $("#qunit-fixture").append('<input type="hidden" id="checkAtnd"/>');
            $("#qunit-fixture").append('<input type="hidden" id="checkEventAtnd"/>');
            $("#qunit-fixture").append('<input type="hidden" id="checkZusaar"/>');
            $("#qunit-fixture").append('<input type="hidden" id="checkKokucheese"/>');
            $("#qunit-fixture").append('<input type="hidden" id="checkPartake"/>');
            $("#qunit-fixture").append('<input type="hidden" id="checkConnpass"/>');

            $("#qunit-fixture").append('<span id="total"></span>');

            //azusaar.main.clearCount();

            azusaar.event.zusaar.apiUrl = "http://azusaar.appspot.com/api/zusaar";
            azusaar.event.zusaar.format = "jsonp";
            azusaar.event.zusaar.dataType = "jsonp";

            azusaar.event.kokucheese.apiUrl = "http://azusaar.appspot.com/api/kokucheese";
            azusaar.event.kokucheese.format = "jsonp";
            azusaar.event.kokucheese.dataType = "jsonp";

            azusaar.event.partake.apiUrl = "http://azusaar.appspot.com/api/partake";
            azusaar.event.partake.format = "jsonp";
            azusaar.event.partake.dataType = "jsonp";
        }
    });

    test("addEvent", function() {
        expect(5);

        azusaar.calendar.init({year:2012, month:6});

        var event = {
            started_at : "2012-06-10T19:30:00+09:00",
            title : "テストイベント",
            event_url : "http://atnd.org/events/00001"
        };

        azusaar.main.addEvent({event:event}, "atnd");

        assert.strictEqual($("#day10").attr("cal_link_to"), "daily.html?q=&at=0&ea=0&zu=0&ko=0&pa=0&co=0&y=2012&m=6&d=10");
        assert.strictEqual($("#day10 ul.event li:eq(0) span.title").text(), "6/10");
        assert.strictEqual($("#day10 ul.event li:eq(0) span.desc").text(), "テストイベント");
        assert.strictEqual($("#day10 ul.event li:eq(1) span.title").text(), "all evnets");
        assert.strictEqual($("#day10 ul.event li:eq(1) span.desc").text(), "click");
    });


    test("searchAllMonthlyLite", function() {
        expect(1);
        stop();

        var params = {
            query: "google",
            year: 2012,
            month: 3,
            isSearchAtnd: true,
            isSearchEventAtnd: true,
            isSearchZusaar: true,
            isSearchKokucheese: true,
            isSearchPartake: true,
            isSearchConnpass: true
        };

        azusaar.calendar.init({year: 2012, month: 3});
        azusaar.search.init(params);
        var d = azusaar.search.searchAllMonthlyLite();
        d.then(function(){
            start();
//            for(var day = 1; day <= 31; day++){
//                //assert.strictEqual($("#day"+day).length, 1, "#day"+day+" not exists");
//                assert.ok($("#day"+day).hasClass("date_has_event"), "day"+day+" not has 'date_has_event'");
//            }
            assert.ok($("#day1").hasClass("date_has_event"), "day1 not has 'date_has_event'");
        }, function(){
            start();
            assert.ok(false, "error occured");
        });
    });

    module("azusaar.main.smart /smart/daily.html", {
        setup: function(){
            $("#qunit-fixture").append('<span id="year"></span>年<span id="month"></span>月');
            $("#qunit-fixture").append('<input type="hidden" id="query" />');
            $("#qunit-fixture").append('<input type="hidden" id="checkAtnd"/>');
            $("#qunit-fixture").append('<input type="hidden" id="checkEventAtnd"/>');
            $("#qunit-fixture").append('<input type="hidden" id="checkZusaar"/>');
            $("#qunit-fixture").append('<input type="hidden" id="checkKokucheese"/>');
            $("#qunit-fixture").append('<input type="hidden" id="checkPartake"/>');
            $("#qunit-fixture").append('<input type="hidden" id="checkConnpass"/>');

            $("#qunit-fixture").append('<div id="pageDaily"><ul data-role="listview"></ul></div>');

            //azusaar.main.clearCount();

            azusaar.event.zusaar.apiUrl = "http://azusaar.appspot.com/api/zusaar";
            azusaar.event.zusaar.format = "jsonp";
            azusaar.event.zusaar.dataType = "jsonp";

            azusaar.event.kokucheese.apiUrl = "http://azusaar.appspot.com/api/kokucheese";
            azusaar.event.kokucheese.format = "jsonp";
            azusaar.event.kokucheese.dataType = "jsonp";

            azusaar.event.partake.apiUrl = "http://azusaar.appspot.com/api/partake";
            azusaar.event.partake.format = "jsonp";
            azusaar.event.partake.dataType = "jsonp";
        }
    });

    test("addEvent", function() {
        expect(2);

        azusaar.calendar.init({year:2012, month:6});

        var event = {
            started_at : "2012-06-10T19:30:00+09:00",
            title : "テストイベント",
            event_url : "http://atnd.org/events/00001"
        };

        azusaar.main.addEvent({event:event}, "atnd");

        assert.strictEqual($("#pageDaily ul li a").attr("href"), "http://atnd.org/events/00001");
        assert.strictEqual($("#pageDaily ul li a").text(), "テストイベント");
    });

});
