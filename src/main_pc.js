if(!this.azusaar) {
    var azusaar = {};
}

azusaar.main = (function(){
    // public methods
    function addEvent(params, icon){
        var event = params.event;
        var day = azusaar.util.parseDate(event.started_at).getDate();
        var li = $("<li/>").addClass(icon).addClass(params.kind);

        var mapUrl = createMapUrl(event);

        if(mapUrl){
            li.append( createMapLink(event, mapUrl) );
        }

        var link = $("<a/>").addClass("event").attr({href: event.event_url, alt: event.title, title: event.title}).text(event.title);
        li.append(link);

        var icon = $("<a/>").attr({href: event.event_url, target: "_blank", alt: "別ウィンドウで開く", title: "別ウィンドウで開く"}).append(
            $("<i>").addClass("icon-share")
        );
        li.append(icon);

        if(params.kind == "owner" || params.kind == "user"){
            if(existsEvent(day, event.event_url)){
                // 既に登録されていたら上の方に表示するために古いのを削除する
                $("ul.event li a[href='"+ event.event_url +"']").parent("li").remove();
            }

            // 自分に関係するイベントは先頭に挿入
            $("#allDay" + day + " ul.event").prepend(li);
            $("#day" + day + " ul.event").prepend(li.clone(true));
        } else{
            // その他のイベントは末尾に挿入(既に同一URLがある場合には挿入しない)
            if(!existsEvent(day, event.event_url)){
                $("#allDay" + day + " ul.event").append(li);

                var count = $("#allDay" + day + " ul.event li.other").length;
                if(count <= 3){
                    $("#day" + day + " ul.event").append(li.clone(true));
                }
            }
        }

        var count = $("#allDay" + day + " ul.event li.other").length;
        if(count == 3 && $("#dayCount"+day).length == 0 ){
            (function(d){
                var button = $("<button/>")
                    .addClass("btn")
                    .click(function(){
                        // 高さ調整
                        var windowHeight = azusaar.util.getBrowserHeight() * 0.9;
                        $("#allDay" + d).dialog("open");
                        var dialogHeight = $("#allDay" + d).height();
                        var options = {position : "center"};
                        if(dialogHeight > windowHeight){
                            options.height = windowHeight;
                        }
                        $("#allDay" + d).dialog("close").dialog(options).dialog("open");
                        return false;
                    }).text("All");
                $("#day" + d)
                    .append(button)
                    .append(
                    $("<span/>").attr("id", "dayCount" + d)
                );

                $("#allDay" + d)
                    .attr("title", azusaar.search.currentDate().getRealMonth() + "月" + d + "日のイベント")
                    .css("white-space", "nowrap")
                    .dialog({
                        autoOpen: false,
                        width : 800,
                        zIndex : 50
                    });
            })(day);
        }

        if(count >= 4){
            $("#dayCount" + day).text(count + "件");
        }

        siteCounts = siteCounts || {};
        siteCounts[icon] = siteCounts[icon] || 0;
        totalCount = totalCount || 0;

        ++siteCounts[icon];
        ++totalCount;
    }

    function dispTotal(){
        $("#total").text(totalCount);
        dispSiteCount("#countAtnd", "atnd");
        dispSiteCount("#countEventAtnd", "eventatnd");
        dispSiteCount("#countZusaar", "zusaar");
        dispSiteCount("#countKokucheese", "kokucheese");
        dispSiteCount("#countPartake", "partake");
        dispSiteCount("#countConnpass", "connpass");
        dispSiteCount("#countDoorkeeper", "doorkeeper");
    }

    function clearCount(){
        totalCount = 0;
        siteCounts = {};
    }

    function dispHotKeyword(){
        $.ajax({
            traditional : true,
            async : true,
            cache : true,
            type: "GET",
            url: "/api/hotkeyword",
            dataType: "json",
            success : function(response, status){
                if(status != "success"){
                    return;
                }

                $(response).each(function(){
                    var that = this;
                    $("#hotKeyword ul")
                        .append(
                        $("<li/>")
                            .append(
                            $("<a/>")
                                .attr({href : "javascript:void(0);"})
                                .click(function() {
                                    $("#query").val(that.keyword);
                                    azusaar.main.searchForward();
                                    return false;
                                })
                                .text(that.keyword)
                        )
                    );
                });
            }
        });
    }

    function dispHatebuRanking(){
        $.ajax({
            traditional : true,
            async : true,
            cache : false,
            type: "GET",
            url: "/api/hatebuRanking",
            dataType: "json",
            success : function(response, status){
                if(status != "success"){
                    return;
                }

                $(response).each(function(){
                    var event = this;
                    var li = $("<li/>").addClass(event.eventKind).text(yymm(event.startedAt) + " ");

                    var mapUrl = createMapUrl(event);

                    if(mapUrl){
                        createMapLink(event, mapUrl).appendTo(li);
                    }

                    $("<a/>").attr({href : event.eventUrl,alt: event.title,title: event.title}).text(event.title).appendTo(li);
                    $("<span>").text(" ").appendTo(li);
                    $("<a/>").attr({href: event.eventUrl, target: "_blank", alt: "別ウィンドウで開く", title: "別ウィンドウで開く"}).append(
                        $("<i>").addClass("icon-share")
                    ).appendTo(li);

                    $("<a/>")
                        .attr("href", "http://b.hatena.ne.jp/entry/" + event.eventUrl)
                        .append(
                            $("<img/>").attr({
                                src: "http://b.hatena.ne.jp/entry/image/" + event.eventUrl,
                                alt: "はてなブックマーク - " + event.title,
                                title: "はてなブックマーク - " + event.title
                            })
                         ).appendTo(li);

                    $("#hatebuRanking ul").append(li)
                });
            }
        });
    }

    function showPageLoadingMsg(flag){
        if(flag){
            $("#loading").css("visibility", "visible");
        } else{
            $("#loading").css("visibility", "hidden");
        }
    }

    function searchForward(params){
        var query = azusaar.search.createSearchParam(params);
        location.href = "/" + query;
    }

    return {
        addEvent : addEvent,
        dispTotal: dispTotal,
        clearCount : clearCount,
        dispHotKeyword: dispHotKeyword,
        dispHatebuRanking: dispHatebuRanking,
        showPageLoadingMsg : showPageLoadingMsg,
        searchForward : searchForward
    };

    // private methods
    function dispSiteCount(target, name){
      var count = 0;
        if(siteCounts && siteCounts[name]){
            count = siteCounts[name];
        }
        $(target).text( "("+count+")" );
    }

    function existsEvent(day, event_url){
        return $("#allDay" + day + " ul.event li a[href='"+ event_url +"']").length > 0
    }

    function yymm(str){
        var date = azusaar.util.parseDate(str);
        if(date){
            return date.getRealMonth() + "/" + date.getDate();
        }
        return "";
    }

    function createMapUrl(event) {
        if(event.lat && event.lon){
            return "map.html?lat=" + event.lat + "&lng=" + event.lon + "&place=" + event.place;
        } else if(event.address){
            var place = event.place || event.address;
            return "map.html?address=" + event.address + "&place=" + place;
        }
        return null;
    }

    function createMapLink(event, mapUrl) {
        var a = $("<a/>");

        (function(_event, _mapUrl, _a){
            _a.addClass("map")
                .attr("href",  "javascript:void(0);return false;")
                .attr("title",  "「" + _event.place + "」周辺の地図とホテル")
                .attr("alt",  "「" + _event.place + "」周辺の地図とホテル")
                .click(function(){
                    $("#mapDialogId").dialog({
                        title: "「" + _event.place + "」周辺の地図とホテル",
                        width : 550,
                        height : 550
                    }).dialog("open");
                    $("#modalIframeId").attr("src", _mapUrl);
                    return false;
                })
                .append(
                    $("<img/>").attr("src", "img/compass.png")
                );
        })(event, mapUrl, a);

        return a;
    }

    var totalCount;
    var siteCounts;
}());

azusaar.event.atnd.addCallback = function(params){
    azusaar.main.addEvent(params, "atnd");
};
azusaar.event.eventatnd.addCallback = function(params){
    azusaar.main.addEvent(params, "eventatnd");
};
azusaar.event.zusaar.addCallback = function(params){
    azusaar.main.addEvent(params, "zusaar");
};
azusaar.event.zusaar_origin.addCallback = function(params){
    azusaar.main.addEvent(params, "zusaar");
};
azusaar.event.kokucheese.addCallback = function(params){
    azusaar.main.addEvent(params, "kokucheese");
};
azusaar.event.partake.addCallback = function(params){
    azusaar.main.addEvent(params, "partake");
};
azusaar.event.partake_user.addCallback = function(params){
    azusaar.main.addEvent(params, "partake");
};
azusaar.event.connpass.addCallback = function(params){
    azusaar.main.addEvent(params, "connpass");
};
azusaar.event.doorkeeper.addCallback = function(params){
    azusaar.main.addEvent(params, "doorkeeper");
};
