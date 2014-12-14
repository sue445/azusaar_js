if(!this.azusaar) {
    var azusaar = {};
}

/**
 * @requires jquery
 * @requires extend.js
 * @type {*}
 */
azusaar.calendar = (function(){
    // public methods
    function init(params){
        var year = params.year;
        var month = params.month;

        $("#calendar tr.week td").attr("id", "").text("");

        var date = new Date(year, month-1, 1);
        var day = 1;
        var weekIndex = 0;
        while(date.getRealMonth() == month){
            var dayOfWeek = date.getDay();

            $("#calendar tr.week:eq("+weekIndex+") td:eq("+dayOfWeek+")")
                .removeClass("padding")
                .attr("id", "day"+day)
                .addClass("day")
                .append($("<span/>").text(day))
                .append(
                $("<div/>")
                    .addClass("events")
                    .append($("<ul/>").addClass("event"))
                );

            date = date.addDate(1);
            day++;

            if(dayOfWeek == 6 && date.getRealMonth() == month){
                weekIndex++;
            }
        }

        if(weekIndex < 5){
            $("#calendar tr.week:eq(5)").hide();
        }
        if(weekIndex < 4){
            $("#calendar tr.week:eq(4)").hide();
        }

        $(".day").removeClass("today");
        var today = new Date();
        if(month == today.getRealMonth()){
            $("#day"+today.getDate()).addClass("today");
        }
    }

    function getHoliday(year, month, callback) {
        var api_key = "AIzaSyCCfFm129G5CMtbkJoPTbmggg4USm_h2t0";

        // ja.japanese#holiday@group.v.calendar.google.com
        var calendar_id = "ja.japanese%23holiday%40group.v.calendar.google.com";

        $.ajax({
            url: "https://www.googleapis.com/calendar/v3/calendars/" + calendar_id +"/events",
            async : true,
            type: "GET",
            timeout: 30000,
            cache : false,
            data: {
                "key" : api_key,
                "timeMin"    : year + "-" + padding(month)   + "-01T00:00:00Z",
                "timeMax"    : year + "-" + padding(month+1) + "-01T00:00:00Z",
                "maxResults" : 30
            },
            dataType: "jsonp",
            jsonp : "callback",
            success : function(response, status){
                if(status == "success"){
                    $.each(response.items, function(i, value){
                        var ymd = value.start.date.split("T")[0].split("-");
                        var y = ymd[0];
                        var m = ymd[1] * 1;
                        var d = ymd[2] * 1;
                        if(y == year && m == month){
                            callback({
                                title : value.summary,
                                day : d
                            });
                        }
                    });
                }
            }
        });
    };

    return {
        init : init,
        getHoliday : getHoliday
    };

    // private methods
    function padding(value){
        return (value < 10) ? "0"+value : value;
    };

}());
