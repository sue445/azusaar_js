if(!this.azusaar) {
    var azusaar = {};
}

azusaar.main = (function(){
    // public methods
    function addEvent(event, icon){
        var day = azusaar.util.parseDate(event.started_at).getDate();
        var li = $("<li/>").addClass(icon);

        var mapUrl = null;
        if(event.lat && event.lon){
            mapUrl = "map.html?lat=" + event.lat + "&lng=" + event.lon + "&place=" + event.place;
        } else if(event.address){
            mapUrl = "map.html?address=" + event.address + "&place=" + event.place;
        }

        if(mapUrl){
            (function(e){
                var a = $("<a/>")
                    .addClass("map")
                    .attr("href",  "javascript:void(0);return false;")
                    .attr("title",  "「" + e.place + "」周辺の地図とホテル")
                    .attr("alt",  "「" + e.place + "」周辺の地図とホテル")
                    .click(function(){
                        $("#mapDialogId").dialog({title: "「" + e.place + "」周辺の地図とホテル"}).dialog("open");
                        $("#modalIframeId").attr("src", mapUrl);
                        return false;
                    })
                    .append(
                    $("<img/>").attr("src", "img/compass.png")
                );
                li.append(a);
            })(event);
        }

        var link = $("<a/>")
            .addClass("event")
            .attr("href", event.event_url)
            .attr("alt", event.title)
            .attr("title", event.title)
            .text(event.title);
        li.append(link);

        $("#allDay" + day + " ul.event").append(li);

        var count = $("#allDay" + day + " ul.event li").length;
        if(count <= 3){
            $("#day" + day + " ul.event").append(li.clone(true));
        }

        if(count == 4){
            (function(d){
                var button = $("<input/>")
                    .attr("type", "button")
                    .attr("value", "全て見る")
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
                    });
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
        showPageLoadingMsg : showPageLoadingMsg,
        searchForward : searchForward
    };

    // private methods
    function dispSiteCount(target, name){
        var count = !siteCounts[name] ? 0 : siteCounts[name];
        $(target).text( "("+count+")" );
    }

    var totalCount;
    var siteCounts;
}());

azusaar.event.atnd.addCallback = function(event){
    azusaar.main.addEvent(event, "atnd");
};
azusaar.event.eventatnd.addCallback = function(event){
    azusaar.main.addEvent(event, "eventatnd");
};
azusaar.event.zusaar.addCallback = function(event){
    azusaar.main.addEvent(event, "zusaar");
};
azusaar.event.kokucheese.addCallback = function(event){
    azusaar.main.addEvent(event, "kokucheese");
};
azusaar.event.partake.addCallback = function(event){
    azusaar.main.addEvent(event, "partake");
};
azusaar.event.connpass.addCallback = function(event){
    azusaar.main.addEvent(event, "connpass");
};
