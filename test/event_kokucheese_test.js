$(document).ready(function(){
    var sut = azusaar.event.kokucheese;
    var timeout = 5000;

    module("azusaar.event.kokucheese", {
        setup: function(){
            // use new instance at own test
            var params = $.extend(true, {}, azusaar.event.kokucheese.initParams);
            params.apiUrl = "http://azusaar.appspot.com" + params.apiUrl;
            params.format = "jsonp";
            sut = new azusaar.event.SearchEventBase(params);

            azusaar.main = {
                showPageLoadingMsg : function(){}
            };
        }
    });

    test("searchMonthly", function() {
        expect(2);
        stop();

        var actualStartedAt;
        var actualEventCount = 0;
        sut.addCallback = function(event){
            actualEventCount++;
            actualStartedAt = azusaar.util.parseDate(event.started_at);
        };
        sut.pagingFinishCallback = sinon.stub();

        var d = sut.searchMonthly({year:2012, month:4});
        d.then(function(){
            start();
            assert.strictEqual(actualEventCount, 2217);
            assert.ok(actualStartedAt.sameMonth({year:2012, month: 4}), "actual="+actualStartedAt);
        });
    });

    test("searchDaily", function() {
        expect(2);
        stop();

        var actualStartedAt;
        var actualEventCount = 0;
        sut.addCallback = function(event){
            actualEventCount++;
            actualStartedAt = azusaar.util.parseDate(event.started_at);
        };
        sut.pagingFinishCallback = sinon.stub();

        var d = sut.searchDaily({year:2012, month:3, day: 1});
        d.then(function(){
            start();
            assert.strictEqual(actualEventCount, 33);
            assert.ok(actualStartedAt.sameDay({year:2012, month: 3, day: 1}), "actual="+actualStartedAt);
        });
    });

});
