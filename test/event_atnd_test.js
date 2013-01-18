$(document).ready(function(){
    var sut = azusaar.event.atnd;
    var timeout = 5000;

    module("azusaar.event.atnd", {
        setup: function(){
            // use new instance at own test
            sut = new azusaar.event.SearchEventBase(azusaar.event.atnd.initParams);

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

        var d = sut.searchMonthly({year:2012, month:4, query: "google"});
        d.then(function(){
            start();
            assertThat(actualEventCount).is.greaterThan(0);
            assert.ok(actualStartedAt.sameMonth({year:2012, month: 4}), "actual="+actualStartedAt);
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

        var d = sut.searchDaily({year:2012, month:3, day: 1});
        d.then(function(){
            start();
            assert.strictEqual(actualEventCount, 13);
            assert.ok(actualStartedAt.sameDay({year:2012, month: 3, day: 1}), "actual="+actualStartedAt);
        });
    });

    test("searchEachDays", function() {
        expect(2);
        stop();

        var actualStartedAt;
        var actualEventCount = 0;
        sut.addCallback = function(params){
            actualEventCount++;
            actualStartedAt = azusaar.util.parseDate(params.event.started_at);
        };

        var d = sut.searchEachDays({year:2012, month:3, days: {1:true, 2:true, 3:true} });
        d.then(function(){
            start();
            assertThat(actualEventCount).is.greaterThan(0);
            assert.ok(actualStartedAt.sameMonth({year:2012, month: 3}), "actual="+actualStartedAt);
        });
    });

    test("searchMonthly with twitter_id", function() {
        expect(2);
        stop();

        var actualStartedAt;
        var actualEventCount = 0;
        sut.addCallback = function(params){
            actualEventCount++;
            actualStartedAt = azusaar.util.parseDate(params.event.started_at);
        };

        var d = sut.searchMonthly({year:2012, month:6, twitter_id: "sakura_bird1"});
        d.then(function(){
            start();
            assertThat(actualEventCount).is.greaterThan(0);
            assert.ok(actualStartedAt.sameMonth({year:2012, month: 6}), "actual="+actualStartedAt);
        });
    });

    test("searchMonthly with owner_twitter_id", function() {
        expect(2);
        stop();

        var actualStartedAt;
        var actualEventCount = 0;
        sut.addCallback = function(params){
            actualEventCount++;
            actualStartedAt = azusaar.util.parseDate(params.event.started_at);
        };

        var d = sut.searchMonthly({year:2011, month:11, owner_twitter_id: "sakura_bird1"});
        d.then(function(){
            start();
            assertThat(actualEventCount).is.greaterThan(0);
            assert.ok(actualStartedAt.sameMonth({year:2011, month: 11}), "actual="+actualStartedAt);
        });
    });

    test("searchMonthly with user_id", function() {
        expect(2);
        stop();

        var actualStartedAt;
        var actualEventCount = 0;
        sut.addCallback = function(params){
            actualEventCount++;
            actualStartedAt = azusaar.util.parseDate(params.event.started_at);
        };

        var d = sut.searchMonthly({year:2012, month:6, user_id: "95051"});
        d.then(function(){
            start();
            assertThat(actualEventCount).is.greaterThan(0);
            assert.ok(actualStartedAt.sameMonth({year:2012, month: 6}), "actual="+actualStartedAt);
        });
    });

    test("searchMonthly with owner_id", function() {
        expect(2);
        stop();

        var actualStartedAt;
        var actualEventCount = 0;
        sut.addCallback = function(params){
            actualEventCount++;
            actualStartedAt = azusaar.util.parseDate(params.event.started_at);
        };

        var d = sut.searchMonthly({year:2011, month:11, owner_id: "95051"});
        d.then(function(){
            start();
            assertThat(actualEventCount).is.greaterThan(0);
            assert.ok(actualStartedAt.sameMonth({year:2011, month: 11}), "actual="+actualStartedAt);
        });
    });

});
