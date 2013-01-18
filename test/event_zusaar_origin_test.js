$(document).ready(function(){
    var sut = azusaar.event.zusaar_origin;
    var timeout = 5000;

    module("azusaar.event.zusaar_origin", {
        setup: function(){
            // use new instance at own test
            var params = $.extend(true, {}, azusaar.event.zusaar_origin.initParams);
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

        var d = sut.searchMonthly({year:2012, month:4});
        d.then(function(){
            start();
            assertThat(actualEventCount).is.greaterThan(0);
            assert.ok(actualStartedAt.sameMonth({year:2012, month: 4}), "actual="+actualStartedAt);
        });
    });

    // Zusaar APIの不具合により2012年7月以降しか成功しない
    test("searchMonthly with owner_id", function() {
        expect(2);
        stop();

        var actualStartedAt;
        var actualEventCount = 0;
        sut.addCallback = function(params){
            actualEventCount++;
            actualStartedAt = azusaar.util.parseDate(params.event.started_at);
        };
        sut.pagingFinishCallback = sinon.stub();

        var d = sut.searchMonthly({year:2012, month:8, owner_id: "agxzfnp1c2Fhci1ocmRyFAsSBFVzZXIiCjQ5MzM0MDFfdHcM"});
        d.then(function(){
            start();
            assertThat(actualEventCount).is.greaterThan(0);
            assert.ok(actualStartedAt.sameMonth({year:2012, month: 8}), "actual="+actualStartedAt);
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
        sut.pagingFinishCallback = sinon.stub();

        var d = sut.searchMonthly({year:2012, month:8, user_id: "agxzfnp1c2Fhci1ocmRyFAsSBFVzZXIiCjQ5MzM0MDFfdHcM"});
        d.then(function(){
            start();
            assertThat(actualEventCount).is.greaterThan(0);
            assert.ok(actualStartedAt.sameMonth({year:2012, month: 8}), "actual="+actualStartedAt);
        });
    });
});
