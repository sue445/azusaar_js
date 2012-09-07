$(document).ready(function(){
    var sut = azusaar.event.eventatnd;
    var timeout = 5000;

    module("azusaar.event.eventatnd", {
        setup: function(){
            // use new instance at own test
            var params = $.extend(true, {}, azusaar.event.eventatnd.initParams);
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
        sut.addCallback = function(params){
            actualEventCount++;
            actualStartedAt = azusaar.util.parseDate(params.event.started_at);
        };
        sut.pagingFinishCallback = sinon.stub();

        var d = sut.searchMonthly({year:2012, month:5});
        d.then(function(){
            start();
            assert.strictEqual(actualEventCount, 539);
            assert.ok(actualStartedAt.sameMonth({year:2012, month: 5}), "actual="+actualStartedAt);
        });
    });

    test("searchDaily", function() {
        expect(2);
        stop();

        var actualStartedAt;
        var actualEventCount = 0;
        sut.addCallback = function(params){
            actualEventCount++;
            actualStartedAt = azusaar.util.parseDate(params.event.started_at);
        };
        sut.pagingFinishCallback = sinon.stub();

        var d = sut.searchDaily({year:2012, month:3, day: 3});
        d.then(function(){
            start();
            assert.strictEqual(actualEventCount, 28);
            assert.ok(actualStartedAt.sameDay({year:2012, month: 3, day: 3}), "actual="+actualStartedAt);
        });
    });

});
