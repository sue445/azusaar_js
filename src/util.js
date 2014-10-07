if(!this.azusaar) {
    var azusaar = {};
}

/**
 * @requires jquery.query
 * @type {*}
 */
azusaar.util = (function(){
    // public methods
    function parseDate(str){
        if(str){
            if(str.match(/(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)/)){
                return new Date(RegExp.$1, RegExp.$2-1, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6);
            } else if(str.match(/(\d+)-(\d+)-(\d+)T(\d+):(\d+)/)){
                return new Date(RegExp.$1, RegExp.$2-1, RegExp.$3, RegExp.$4, RegExp.$5, 0);
            }
        }
        return null;
    }

    function splitKeyword(str){
        if(str){
            return str.replace(/[\+\s　]+/g, " ").split(" ");
        }
        return [];
    }

    function toYYYYMM(year, month){
        if(month < 10){
            month = "0" + month;
        }
        return "" + year + month;
    }

    function toYYYYMMDD(year, month, day){
        if(day < 10){
            day = "0" + day;
        }
        return toYYYYMM(year, month) + day;
    }

    function createDays(year, month){
        var dayArray = [];

        eachMonth(year, month, function(day) {
            dayArray.push(day);
        });

        return dayArray;
    }

    function createYmds(year, month){
        var ymdArray = [];

        eachMonth(year, month, function(day) {
            ymdArray.push(toYYYYMMDD(year, month, day));
        });

        return ymdArray;
    }

    function trim(str){
        if(str){
            return str.replace(/[\s　]+/g, " ");
        }
        return "";
    }

    function isSearch(value){
        return value == "1" || !isParam(value);
    }

    function params(){
        var year = $.query.get("y");
        var month = $.query.get("m");
        var day = $.query.get("d");
        var query = $.query.get("q");
        var isSearchAtnd = util.isSearch($.query.get("at"));
        var isSearchZusaar = util.isSearch($.query.get("zu"));
        var isSearchKokucheese = util.isSearch($.query.get("ko"));
        var isSearchPartake = util.isSearch($.query.get("pa"));
        var isSearchConnpass = util.isSearch($.query.get("co"));

        if(!isParam(query)){
            query = "";
        }
        query = query.replace(/\+/g," ");

        var today = new Date();
        if(!isParam(year)){
            year = today.getFullYear();
        }
        if(!isParam(month)){
            month = today.getRealMonth();
        }
        if(!isParam(day)){
            day = today.getDate();
            if(day > getMonthEndDay(year, month)){
                day = getMonthEndDay(year, month);
            }
        }

        return {
            year : year,
            month : month,
            day : day,
            query : query,
            isSearchAtnd : isSearchAtnd,
            isSearchZusaar : isSearchZusaar,
            isSearchKokucheese : isSearchKokucheese,
            isSearchPartake : isSearchPartake,
            isSearchConnpass : isSearchConnpass
        };
    }

    function getBrowserHeight(){
        if ( window.innerHeight ) {
            return window.innerHeight;
        }
        else if ( document.documentElement && document.documentElement.clientHeight != 0 ) {
            return document.documentElement.clientHeight;
        }
        else if ( document.body ) {
            return document.body.clientHeight;
        }
        return 0;
    }

    function isParam(obj){
        return obj && obj !== true && obj !== false;
    }

    function getMonthEndDay(year, month) {
        var nextMonth1st = new Date(year, month, 1);
        return nextMonth1st.addDate(-1).getDate();
    }

    return {
        parseDate : parseDate,
        splitKeyword : splitKeyword,
        toYYYYMM : toYYYYMM,
        toYYYYMMDD : toYYYYMMDD,
        createYmds : createYmds,
        createDays : createDays,
        trim : trim,
        isSearch : isSearch,
        getMonthEndDay : getMonthEndDay,
        isParam : isParam,
        getBrowserHeight : getBrowserHeight
    };

    // private methods
    function eachMonth(year, month, callback) {
        var date = new Date(year, month-1, 1);
        var day = 1;

        while(date.getRealMonth() == month){
            callback(day);
            date = date.addDate(1);
            day++;
        }
    }

}());
