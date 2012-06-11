$(document).ready(function(){

    module("azusaar.map geocoding test");
    test("geodosu", function() {
        expect(1);
        stop();

        var d = azusaar.map.geodosu("東京都港区北青山2-5-8オラクル青山センター");
        d.then(function(actual){
            assert.strictEqual(actual, "東京都港区北青山2-5-8");
            start();
        });
    });

    test("geocode", function() {
        expect(2);
        stop();

        var d = azusaar.map.geocode("東京都港区北青山2-5-8");
        d.then(function(actual){
            assert.strictEqual(actual.lat, 35.6712377);
            assert.strictEqual(actual.lng, 139.7186517);
            start();
        });
    });

    test("geodos -> geocode", function() {
        expect(2);
        stop();

        var d = azusaar.map.geodosu("東京都港区北青山2-5-8オラクル青山センター");
        d.pipe(function(address){
            return azusaar.map.geocode(address);
        }, function(){
            start();
        }).then(function(actual){
            assert.strictEqual(actual.lat, 35.6712377);
            assert.strictEqual(actual.lng, 139.7186517);
            start();
        }, function(){
            start();
        });
    });

    module("azusaar.map.getStar");
    test("getStar: test should return img/star00.png when score < 0.25", function() {
        expect(3);
        var expected = "img/star00.png";
        assert.strictEqual(azusaar.map.getStar(null), expected);
        assert.strictEqual(azusaar.map.getStar(0), expected);
        assert.strictEqual(azusaar.map.getStar(0.249), expected);
    });

    test("getStar: test should return img/star05.png when 0.25 <= score < 0.75", function() {
        expect(2);
        var expected = "img/star05.png";
        assert.strictEqual(azusaar.map.getStar(0.25), expected);
        assert.strictEqual(azusaar.map.getStar(0.749), expected);
    });

    test("getStar: test should return img/star10.png when 0.75 <= score < 1.25", function() {
        expect(2);
        var expected = "img/star10.png";
        assert.strictEqual(azusaar.map.getStar(0.75), expected);
        assert.strictEqual(azusaar.map.getStar(1.249), expected);
    });

    test("getStar: test should return img/star15.png when 1.25 <= score < 1.75", function() {
        expect(2);
        var expected = "img/star15.png";
        assert.strictEqual(azusaar.map.getStar(1.25), expected);
        assert.strictEqual(azusaar.map.getStar(1.749), expected);
    });

    test("getStar: test should return img/star20.png when 1.75 <= score < 2.25", function() {
        expect(2);
        var expected = "img/star20.png";
        assert.strictEqual(azusaar.map.getStar(1.75), expected);
        assert.strictEqual(azusaar.map.getStar(2.249), expected);
    });

    test("getStar: test should return img/star25.png when 2.25 <= score < 2.75", function() {
        expect(2);
        var expected = "img/star25.png";
        assert.strictEqual(azusaar.map.getStar(2.25), expected);
        assert.strictEqual(azusaar.map.getStar(2.749), expected);
    });

    test("getStar: test should return img/star30.png when 2.75 <= score < 3.25", function() {
        expect(2);
        var expected = "img/star30.png";
        assert.strictEqual(azusaar.map.getStar(2.75), expected);
        assert.strictEqual(azusaar.map.getStar(3.249), expected);
    });

    test("getStar: test should return img/star35.png when 3.25 <= score < 3.75", function() {
        expect(2);
        var expected = "img/star35.png";
        assert.strictEqual(azusaar.map.getStar(3.25), expected);
        assert.strictEqual(azusaar.map.getStar(3.749), expected);
    });

    test("getStar: test should return img/star40.png when 3.75 <= score < 4.25", function() {
        expect(2);
        var expected = "img/star40.png";
        assert.strictEqual(azusaar.map.getStar(3.75), expected);
        assert.strictEqual(azusaar.map.getStar(4.249), expected);
    });

    test("getStar: test should return img/star45.png when 4.25 <= score < 4.75", function() {
        expect(2);
        var expected = "img/star45.png";
        assert.strictEqual(azusaar.map.getStar(4.25), expected);
        assert.strictEqual(azusaar.map.getStar(4.749), expected);
    });

    test("getStar: test should return img/star50.png when 4.75 <= score", function() {
        expect(3);
        var expected = "img/star50.png";
        assert.strictEqual(azusaar.map.getStar(4.75), expected);
        assert.strictEqual(azusaar.map.getStar(5.0), expected);
        assert.strictEqual(azusaar.map.getStar(5.1), expected);
    });

    module("azusaar.map.init", {
        setup: function(){
            $("#qunit-fixture").append(
                $("<div/>").attr("id", "map_canvas")
            );
        }
    });

    test("init with address", function() {
        expect(2);

        stop();
        azusaar.map.init({
            place: "オラクル青山センター 13Fセミナールーム",
            address: "東京都港区北青山2-5-8オラクル青山センター"
        }).pipe(
            function(){
                start();
                assert.strictEqual($("#qunit-fixture").size(), 1);
                assert.strictEqual($("img[src='img/villa.png']").size(), 1);
            });
    });

    test("init with lat and lng", function() {
        expect(2);

        stop();
        azusaar.map.init({
            place: "オラクル青山センター 13Fセミナールーム",
            lat: "35.6712377",
            lng: "139.7186517"
        }).pipe(
            function(){
                start();
                assert.strictEqual($("#qunit-fixture").size(), 1);
                assert.strictEqual($("img[src='img/villa.png']").size(), 1);
            });
    });
});
