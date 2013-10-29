if(!this.azusaar) {
    var azusaar = {};
}

/**
 * @requires jquery
 * @requires map.js
 * @type {*}
 */
azusaar.rakuten = (function(){
    // public methods
    function searchBase(lat, lng, params){
        params = params || {};
        params.hotelCallback = params.hotelCallback || function(){};
        return $.ajax({
            traditional : true,
            async : true,
            type: "GET",
            url: "https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20131024",
            data: {
                "format": "json",
                "applicationId": "1004785912111088388",
                "affiliateId": "0e4bf612.78e44a99.0e4bf613.93f05879",
                "latitude": lat,
                "longitude": lng,
                "datumType": 1,
                "searchRadius": 3,
                "responseType": "small",
                "allReturnFlag" : 1
            },
            dataType: "jsonp",
            jsonp : "callback",
            success : function(response, status){
                var hotels = response.hotels;
                for(var i = 0; i < hotels.length; i++){
                    params.hotelCallback(hotels[i].hotel[0]);
                }
            }
        });
    }

    function search(lat, lng){
        var param = {
            hotelCallback : function(h){
                var bas = h.hotelBasicInfo;

                var icon = new Y.Icon(getIcon(bas.reviewAverage));
                var marker = new Y.Marker(new Y.LatLng(bas.latitude,bas.longitude), {icon: icon, title: bas.hotelName});

                marker.bind("click", function(){
                    azusaar.map.closeInfoWindow();

                    var content = $("<div/>")
                        .append(
                        $("<a/>")
                            .attr("href", bas.hotelInformationUrl)
                            .attr("target", "_top")
                            .text("[楽天トラベル]" + bas.hotelName)
                    ).append(
                        $("<a/>")
                            .attr("href", bas.hotelInformationUrl)
                            .attr("target", "_top")
                            .append(
                            $("<img/>").attr("src", bas.hotelThumbnailUrl)
                        )
                    ).append(
                        $("<br/>")
                    ).append(
                        $("<span/>")
                            .append(
                            $("<img/>").attr("src", azusaar.map.getStar(bas.reviewAverage))
                        ).append(
                            bas.reviewAverage
                        ).append(
                            "&nbsp;&nbsp;"
                        ).append(
                            (bas.hotelMinCharge) ? "最安料金：" + bas.hotelMinCharge + "円" : ""
                        )
                    ).append(
                        $("<ul/>")
                            .append(
                            $("<li/>")
                                .append(
                                $("<a/>")
                                    .attr("href", bas.planListUrl)
                                    .attr("target", "_top")
                                    .text("宿泊プラン一覧")
                            )
                        ).append(
                            (bas.dpPlanListUrl) ?
                                $("<li/>")
                                    .append(
                                    $("<a/>")
                                        .attr("href", bas.dpPlanListUrl)
                                        .attr("target", "_top")
                                        .text("航空券付き宿泊プラン一覧")
                                )
                                :
                                $("")
                        ).append(
                            $("<li/>")
                                .append(
                                $("<a/>")
                                    .attr("href", bas.reviewUrl)
                                    .attr("target", "_top")
                                    .text("お客さまの声")
                            )
                        )
                    );
                    azusaar.map.openInfoWindow({lat : bas.latitude, lng: bas.longitude, content: content.html()});
                });

                azusaar.map.addMarker(marker);
            }
        };
        return searchBase(lat, lng, param);
    }

    function getIcon(score){
        if(!score || score < 0.5){
            return "img/rakuten_0star.png";
        } else if(score < 1.5){
            return "img/rakuten_1star.png";
        } else if(score < 2.5){
            return "img/rakuten_2stars.png";
        } else if(score < 3.5){
            return "img/rakuten_3stars.png";
        } else if(score < 4.5){
            return "img/rakuten_4stars.png";
        }
        return "img/rakuten_5stars.png";
    }

    return {
        search : search,
        searchBase : searchBase,
        getIcon : getIcon
    };
}());
