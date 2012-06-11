if(!this.azusaar) {
    var azusaar = {};
}

/**
 * @requires jquery
 * @requires http://maps.google.com/maps/api/js?sensor=true
 * @requires http://js.api.olp.yahooapis.jp/OpenLocalPlatform/V1/jsapi
 * @requires util.js
 * @type {*}
 */
azusaar.map = (function(){
    var lat;
    var lng;
    var address;
    var place;
    var ymap;

    // public methods
    function init(params){
        params = params || {};
        lat = params.lat;
        lng = params.lng;
        address = params.address;
        place = params.place;

        if(azusaar.util.isParam(address)){
            var d = geodosu(address);
            return d.pipe(function(address2){
                return geocode(address2);
            }).then(function(latlng){
                lat = latlng.lat;
                lng = latlng.lng;
                initBase();
            });
        } else{
            initBase();
            return $.Deferred().resolve();
        }
    }

    function geodosu(address){
        var d = $.Deferred();
        $.ajax({
            traditional : true,
            async : true,
            type: "GET",
            url: "http://api.geodosu.com/v2/geo_pp",
            data: {
                apiKey : "sue445",
                address : address,
                output : "json"
            },
            dataType: "jsonp",
            jsonp : "callback",
            success : function(response, status){
                if(status == "success"){
                    d.resolve(response.result.addresses.pre_processed);
                } else{
                    d.resolve(address);
                }
            }
        });

        return d.promise();
    }

    function geocode(address){
        var d = $.Deferred();

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            address: address
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                for (var i in results) {
                    if (results[i].geometry) {
                        var latlng = results[i].geometry.location;
                        d.resolve({lat : latlng.lat(), lng: latlng.lng()});
                        return;
                    }
                }
            } else{
                alert("住所が見つかりません[address="+ address +"]");
                d.reject();
            }
        });

        return d.promise();
    }

    function getStar(score){
        if(!score || score < 0.25){
            return "img/star00.png";
        } else if(score < 0.75){
            return "img/star05.png";
        } else if(score < 1.25){
            return "img/star10.png";
        } else if(score < 1.75){
            return "img/star15.png";
        } else if(score < 2.25){
            return "img/star20.png";
        } else if(score < 2.75){
            return "img/star25.png";
        } else if(score < 3.25){
            return "img/star30.png";
        } else if(score < 3.75){
            return "img/star35.png";
        } else if(score < 4.25){
            return "img/star40.png";
        } else if(score < 4.75){
            return "img/star45.png";
        }
        return "img/star50.png";
    }

    function searchHotel(){
        $("#loading").show();
        $.when(
            azusaar.rakuten.search(lat, lng),
            azusaar.jalan.search(lat, lng)
        ).always(
            function(){
                $("#loading").hide();
            }
        );
    }

    function addMarker(marker){
        ymap.addFeature(marker);
    }

    function openInfoWindow(params){
        params = params || {};

        var latlng = new Y.LatLng(params.lat, params.lng);
        ymap.openInfoWindow(latlng, params.content);
    }

    function closeInfoWindow(){
        ymap.closeInfoWindow();
    }

    return {
        init : init,
        addMarker : addMarker,
        openInfoWindow : openInfoWindow,
        closeInfoWindow : closeInfoWindow,
        searchHotel : searchHotel,
        geodosu : geodosu,
        geocode : geocode,
        getStar : getStar
    };

    // private methods
    function initBase(){
        ymap = new Y.Map("map_canvas", {
            configure : {
                scrollWheelZoom : true
            }
        });
        ymap.drawMap(new Y.LatLng(lat, lng), 17, Y.LayerSetId.NORMAL);
        ymap.addControl(new Y.LayerSetControl());
        ymap.addControl(new Y.ScaleControl());
        ymap.addControl(new Y.SliderZoomControlVertical());

        var content = place;
        if(address){
            content += "<br/>(" + address + ")";
        }

        addPlaceMarker({lat:lat, lng:lng, tooltip:place, content: content});
        ymap.bind("click", function(){
            ymap.closeInfoWindow();
        });
    }

    function addPlaceMarker(params) {
        params = params || {};
        var lat = params.lat;
        var lng = params.lng;
        var tooltip = params.tooltip;
        var content = params.content;

        var icon = new Y.Icon("img/villa.png");
        var marker = new Y.Marker(new Y.LatLng(lat,lng), {icon: icon, title: tooltip});
        marker.bind("click", function(){
            ymap.closeInfoWindow();
            ymap.openInfoWindow(new Y.LatLng(lat,lng), content);
        });
        ymap.addFeature(marker);
    }

}());
