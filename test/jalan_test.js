$(document).ready(function(){

    module("azusaar.jalan.searchBase", {
        setup : function(){
            $.mockjaxSettings.responseTime = 0;
            $.mockjax({
                url: '/api/jalan',
                responseText : [
                    "Results",{"xmlns":"jws"},["NumberOfResults","1"],["DisplayPerPage","1"],["DisplayFrom","1"],["APIVersion","1.2"],
                    ["Hotel",["HotelID","326072"],["HotelName","リーガロイヤルホテル東京"]]
                ]
            });
        },
        teardown : function(){
            $.mockjaxClear();
        }
    });
    test("test should return response", function() {
        expect(1);
        stop();

        var param = {
            hotelCallback : sinon.stub()
        };

        azusaar.jalan.searchBase(35.6655089, 139.7545959, param);

        setTimeout(function(){
            assert.strictEqual(param.hotelCallback.callCount, 1);
            start();
        }, 100);
    });

    module("azusaar.jalan.getIcon");
    test("test should return img/jalan_0star.png when score < 0.5", function() {
        expect(3);
        var expected = "img/jalan_0star.png";
        assert.strictEqual(azusaar.jalan.getIcon(null), expected);
        assert.strictEqual(azusaar.jalan.getIcon(0), expected);
        assert.strictEqual(azusaar.jalan.getIcon(0.49), expected);
    });

    test("test should return img/jalan_1star.png when 0.5 <= score < 1.5", function() {
        expect(2);
        var expected = "img/jalan_1star.png";
        assert.strictEqual(azusaar.jalan.getIcon(0.5), expected);
        assert.strictEqual(azusaar.jalan.getIcon(1.49), expected);
    });

    test("test should return img/jalan_2stars.png when 1.5 <= score < 2.5", function() {
        expect(2);
        var expected = "img/jalan_2stars.png";
        assert.strictEqual(azusaar.jalan.getIcon(1.5), expected);
        assert.strictEqual(azusaar.jalan.getIcon(2.49), expected);
    });

    test("test should return img/jalan_3stars.png when 2.5 <= score < 3.5", function() {
        expect(2);
        var expected = "img/jalan_3stars.png";
        assert.strictEqual(azusaar.jalan.getIcon(2.5), expected);
        assert.strictEqual(azusaar.jalan.getIcon(3.49), expected);
    });

    test("test should return img/jalan_4stars.png when 3.5 <= score < 4.5", function() {
        expect(2);
        var expected = "img/jalan_4stars.png";
        assert.strictEqual(azusaar.jalan.getIcon(3.5), expected);
        assert.strictEqual(azusaar.jalan.getIcon(4.49), expected);
    });

    test("test should return img/jalan_5stars.png when 4.5 <= score", function() {
        expect(3);
        var expected = "img/jalan_5stars.png";
        assert.strictEqual(azusaar.jalan.getIcon(4.5), expected);
        assert.strictEqual(azusaar.jalan.getIcon(5.0), expected);
        assert.strictEqual(azusaar.jalan.getIcon(5.1), expected);
    });

});
