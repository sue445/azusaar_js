$(document).ready(function(){

    module("azusaar.rakuten.searchBase");

    test("searchBase", function() {
        expect(1);
        stop();

        var param = {
            hotelCallback : sinon.stub()
        };

        azusaar.rakuten.searchBase(35.6655089, 139.7545959, param);

        setTimeout(function(){
            start();
            assert.ok(param.hotelCallback.called);
        }, 5000);
    });

    module("azusaar.rakuten.getIcon");
    test("test should return img/rakuten_0star.png when score < 0.5", function() {
        expect(3);
        var expected = "img/rakuten_0star.png";
        assert.strictEqual(azusaar.rakuten.getIcon(null), expected)
        assert.strictEqual(azusaar.rakuten.getIcon(0), expected)
        assert.strictEqual(azusaar.rakuten.getIcon(0.49), expected)
    });

    test("test should return img/rakuten_1star.png when 0.5 <= score < 1.5", function() {
        expect(2);
        var expected = "img/rakuten_1star.png";
        assert.strictEqual(azusaar.rakuten.getIcon(0.5), expected)
        assert.strictEqual(azusaar.rakuten.getIcon(1.49), expected)
    });

    test("test should return img/rakuten_2stars.png when 1.5 <= score < 2.5", function() {
        expect(2);
        var expected = "img/rakuten_2stars.png";
        assert.strictEqual(azusaar.rakuten.getIcon(1.5), expected)
        assert.strictEqual(azusaar.rakuten.getIcon(2.49), expected)
    });

    test("test should return img/rakuten_3stars.png when 2.5 <= score < 3.5", function() {
        expect(2);
        var expected = "img/rakuten_3stars.png";
        assert.strictEqual(azusaar.rakuten.getIcon(2.5), expected)
        assert.strictEqual(azusaar.rakuten.getIcon(3.49), expected)
    });

    test("test should return img/rakuten_4stars.png when 3.5 <= score < 4.5", function() {
        expect(2);
        var expected = "img/rakuten_4stars.png";
        assert.strictEqual(azusaar.rakuten.getIcon(3.5), expected)
        assert.strictEqual(azusaar.rakuten.getIcon(4.49), expected)
    });

    test("test should return img/rakuten_5stars.png when 4.5 <= score", function() {
        expect(3);
        var expected = "img/rakuten_5stars.png";
        assert.strictEqual(azusaar.rakuten.getIcon(4.5), expected)
        assert.strictEqual(azusaar.rakuten.getIcon(5.0), expected)
        assert.strictEqual(azusaar.rakuten.getIcon(5.1), expected)
    });
});
