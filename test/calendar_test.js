$(document).ready(function(){

    module("azusaar.calendar.init", {
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
        }
    });

    test("test init 2011/8", function() {
        expect(3);
        assert.strictEqual($("#calendar").attr("border"), "1");

        azusaar.calendar.init({year: 2011, month: 8});

        var week2sun = $("#calendar tr.week:eq(1) td:eq(0)").attr("id");
        assert.strictEqual(week2sun, "day7");

        var week6 = $("#calendar tr.week:eq(5)");
        assert.strictEqual(week6.css("display"), "none");
    });

    test("test init 2011/12", function() {
        expect(1);
        azusaar.calendar.init({year: 2011, month: 12});

        var week6 = $("#calendar tr.week:eq(5)");
        assert.strictEqual(week6.css("display"), "none");
    });

    module("azusaar.calendar.getHoliday");
    test("getHoliday", function() {
        expect(2);
        stop();
        azusaar.calendar.getHoliday(2014, 10, function(info){
            assert.strictEqual(info.day, 13);
            assert.strictEqual(info.title, "体育の日");
            start();
        });
    });
});
