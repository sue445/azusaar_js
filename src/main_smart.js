if(!this.azusaar) {
    var azusaar = {};
}

azusaar.main = (function(){
    // public methods
    function addEvent(params, icon){
        var event = params.event;
        var date = azusaar.util.parseDate(event.started_at);
        var day = date.getDate();

        if($("#day" + day)){
            eventCounts = eventCounts || [];
            if(!eventCounts[day]){
                var queryString = azusaar.search.createSearchParam({year: date.getFullYear(), month: date.getRealMonth(), day:day});
                var dailyUrl = "daily.html" + queryString;
                eventCounts[day] = 1;
                $("#day" + day)
                    .addClass("date_has_event")
                    .attr("cal_link_to", dailyUrl)
                    .attr("rel", "external");
                $("#day" + day + " ul.event").append(
                    $("<li/>")
                        .append(
                        $("<span/>").addClass("title").text(formatDate(date))
                    ).append(
                        $("<span/>").addClass("desc").text(event.title)
                    )
                ).append(
                    $("<li/>").append(
                        $("<span/>").addClass("title").text("all evnets")
                    ).append(
                        $("<span/>").addClass("desc").text("click")
                    )
                );
            } else{
                ++eventCounts[day];
            }
        }

        if($("#pageDaily")){
            var ul = $("#pageDaily ul[data-role='listview']").append(
                $("<li/>").append(
                    $("<a/>")
                        .addClass("listEvent")
                        .addClass(icon)
                        .addClass(params.kind)
                        .attr("href", event.event_url)
                        .text(event.title)
                )
            );
            try{
                ul.listview('refresh');
            } catch (e){
            }
        }
    }

    function clearCount(){
        eventCounts = [];
    }

    function bindEvent(){
        // tracker
        var shown = false;

        //全体のクリック時の処理
        $(".cal td").each(function () {
            // options
            var distance = 10;	//TD何ピクセル上部にずらすか
            var time = 250;		//表示のディレイ

            var trigger = $(this);
            var popup = $('.events ul', this).css('opacity', 0);

            $([trigger.get(0)]).click(function () {
                if($(this).hasClass('date_has_event')){
                    //event有
                }else{
                    if(shown){
                        //ポップアップを隠すのみ
                        $('.events ul').each(function(){
                            $(this).css('display', 'none');
                        });
                        shown = false;
                        return;
                    }else if($(this).attr('cal_link_to')){
                        //設定URLがあればそれに遷移
                        location.href=$(this).attr('cal_link_to');
                        return;
                    }
                }

                //ポップアップの削除
                $('.events ul').each(function(){
                    $(this).css('display', 'none');
                });

                if($(this).find(".event").text().length == 0){
                    // イベントがない場合にはポップアップを表示しない
                    return;
                }

                shown = true;

                //座標特定の為に仮配置
                popup.css({
                    bottom: 10,
                    left: 0,
                    display: 'block'
                });
                //window.alert('offset() ：' + popup.offset().top + '/' + popup.offset().left);
                if(popup.offset().left>150){
                    left_posi = -150;
                }else{
                    left_posi = 0;
                }
                popup.css({
                    bottom: 10,
                    left: left_posi,
                    display: 'block' // brings the popup back in to view
                }).animate({
                        // (we're using chaining on the popup) now animate it's opacity and position
                        bottom: '+=' + distance + 'px',
                        opacity: 1
                    }, time, 'swing', function() {

                    });
            });
        });

        //ポップアップクリックで画面遷移
        $('.events').click(function () {

            if($(this).parent().attr('cal_link_to')){
                location.href=$(this).parent().attr('cal_link_to');
                return;
            }else{
                $('.events ul').each(function(){
                    $(this).css('display', 'none');
                });
            }
        });
    }

    function squeeze(){
        var ym = $("#yearMonth").val().split("/");
        var date = new Date(ym[0], ym[1]-1, 1);
        azusaar.main.searchForward({year: ym[0], month:ym[1]});
    }

    function showPageLoadingMsg(flag){
        if(flag){
            if($("div.ui-loader:visible").length == 0){
                $.mobile.showPageLoadingMsg();
            }
        } else{
            $.mobile.hidePageLoadingMsg();
        }
    }

    function initSearchBtn(){
        $("#searchBtn").attr("href", "search.html" + azusaar.search.createSearchParam());
    }

    function getRemainingDays(params){
        return _getRemainingDays(params, eventCounts);
    }

    function _getRemainingDays(params, counts){
        var result = {};
        var endDay = azusaar.util.getMonthEndDay(params.year, params.month);
        var count = 0;
        for(var day = 1; day <= endDay; day++){
            if(!counts[day] || counts[day] < 1){
                result[day] = true;
                ++count;
            }
        }
        if(count > 0){
            return result;
        }
        return null;
    }

    function searchForward(params){
        var query = azusaar.search.createSearchParam(params);
        location.href = "/smart/" + query;
    }

    return {
        addEvent : addEvent,
        clearCount : clearCount,
        bindEvent : bindEvent,
        showPageLoadingMsg : showPageLoadingMsg,
        initSearchBtn : initSearchBtn,
        getRemainingDays : getRemainingDays,
        _getRemainingDays : _getRemainingDays,
        searchForward : searchForward,
        squeeze : squeeze
    };

    // private methods
    var eventCounts;

    function formatDate(date){
        return date.getRealMonth() + "/" + date.getDate();
    };

}());

azusaar.event.atnd.addCallback = function(params){
    azusaar.main.addEvent(params, "atnd");
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
