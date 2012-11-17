if(!this.azusaar) {
    var azusaar = {};
}

/**
 * @requires jquery
 * @requires jquery.query
 * @requires extend.js
 * @type {*}
 */
azusaar.search = (function(){
    var query;
    var year;
    var month;
    var day;
    var isSearchAtnd;
    var isSearchEventAtnd;
    var isSearchZusaar;
    var isSearchKokucheese;
    var isSearchPartake;
    var isSearchConnpass;
    var isSearchDoorkeeper;


    // public methods
    function init(params){
        params = params || {};

        query = params.query || "";
        year = params.year;
        month = params.month;
        day = params.day;
        isSearchAtnd = params.isSearchAtnd;
        isSearchEventAtnd = params.isSearchEventAtnd;
        isSearchZusaar = params.isSearchZusaar;
        isSearchKokucheese = params.isSearchKokucheese;
        isSearchPartake = params.isSearchPartake;
        isSearchConnpass = params.isSearchConnpass;
        isSearchDoorkeeper = params.isSearchDoorkeeper;

        $("#query").val(query.replace(/\+/g," "));
        $("#year").text(year);
        $("#month").text(month);
        $("#day").text(day);

        $("#checkAtnd").check(isSearchAtnd);
        $("#checkEventAtnd").check(isSearchEventAtnd);
        $("#checkZusaar").check(isSearchZusaar);
        $("#checkKokucheese").check(isSearchKokucheese);
        $("#checkPartake").check(isSearchPartake);
        $("#checkConnpass").check(isSearchConnpass);
        $("#checkDoorkeeper").check(isSearchDoorkeeper);
    }

    function validate(params){
        params = params || {};

        var today = new Date();
        if(!azusaar.util.isParam(params.year)){
            params.year = today.getFullYear();
        }
        if(!azusaar.util.isParam(params.month)){
            params. month = today.getRealMonth();
        }
        if(!azusaar.util.isParam(params.day)){
            params.day = today.getDate();
            var monthEndDay = azusaar.util.getMonthEndDay(params.year, params.month);
            if(params.day > monthEndDay){
                params.day = monthEndDay;
            }
        }
        if(!azusaar.util.isParam(params.query)){
            params.query = "";
        }

        params.year = params.year * 1;
        params.month = params.month * 1;
        params.day = params.day * 1;
        params.isSearchAtnd = azusaar.util.isSearch(params.isSearchAtnd);
        params.isSearchEventAtnd = azusaar.util.isSearch(params.isSearchEventAtnd);
        params.isSearchZusaar = azusaar.util.isSearch(params.isSearchZusaar);
        params.isSearchKokucheese = azusaar.util.isSearch(params.isSearchKokucheese);
        params.isSearchPartake = azusaar.util.isSearch(params.isSearchPartake);
        params.isSearchConnpass = azusaar.util.isSearch(params.isSearchConnpass);
        params.isSearchDoorkeeper = azusaar.util.isSearch(params.isSearchDoorkeeper);

        return params;
    }

    function currentDate(){
        return new Date(year, month-1, day);
    }

    function checkValue(id){
        if($('#'+id).attr('checked')){
            return "1";
        } else{
            return "0";
        }
    }

    function createSearchParam(params){
        params = params || {};

        var q = $("#query").val();

        var at = this.checkValue("checkAtnd");
        var ea = this.checkValue("checkEventAtnd");
        var zu = this.checkValue("checkZusaar");
        var ko = this.checkValue("checkKokucheese");
        var pa = this.checkValue("checkPartake");
        var co = this.checkValue("checkConnpass");
        var dk = this.checkValue("checkDoorkeeper");

        var query = $.query.set("q", q).set("at", at).set("ea", ea).set("zu", zu).set("ko", ko).set("pa", pa).set("co", co).set("dk", dk);
        if(params.year && params.month){
            query = query.set("y", params.year).set("m", params.month);
        } else{
            query = query.set("y", year).set("m", month);
        }

        if(params.day){
            query = query.set("d", params.day);
        }
        return query.toString();
    }

    function searchAllMonthly(){
        var params = {
            query : query,
            year : year,
            month : month
        };
        return $.when(
            isSearchAtnd ? azusaar.event.atnd.searchMonthly(params) : null,
            isSearchEventAtnd ? azusaar.event.eventatnd.searchMonthly(params) : null,
            isSearchZusaar ? azusaar.event.zusaar.searchMonthly(params) : null,
            isSearchKokucheese ? azusaar.event.kokucheese.searchMonthly(params) : null,
            isSearchPartake ? azusaar.event.partake.searchMonthly(params) : null,
            isSearchConnpass ? azusaar.event.connpass.searchMonthly(params) : null,
            isSearchDoorkeeper ? azusaar.event.doorkeeper.searchMonthly(params) : null
        );
    }

    function searchAllMonthlyLite(){
        var params = {
            query : query,
            year : year,
            month : month,
            dayUnique : true
        };
        var df = $.Deferred();

        $.when(
            // can use dayUnique
            isSearchZusaar ? azusaar.event.zusaar.searchMonthly(params) : null,
            isSearchKokucheese ? azusaar.event.kokucheese.searchMonthly(params) : null,
            isSearchPartake ? azusaar.event.partake.searchMonthly(params) : null,
            isSearchDoorkeeper ? azusaar.event.doorkeeper.searchMonthly(params) : null
        ).done(function(){
                params.days = azusaar.main.getRemainingDays({year: year, month:month});
                if(!params.days){
                    df.resolve();
                    return;
                }
                params.count = 1;

                $.when(
                    isSearchAtnd ? azusaar.event.atnd.searchEachDays(params) : null
                ).done(function(){
                        params.days = azusaar.main.getRemainingDays({year: year, month:month});
                        if(!params.days){
                            df.resolve();
                            return;
                        }

                        $.when(
                            isSearchEventAtnd ? azusaar.event.eventatnd.searchEachDays(params) : null
                        ).done(function(){
                                params.days = azusaar.main.getRemainingDays({year: year, month:month});
                                if(!params.days){
                                    df.resolve();
                                    return;
                                }

                                $.when(
                                    isSearchConnpass ? azusaar.event.connpass.searchEachDays(params) : null
                                ).done(function(){
                                        df.resolve();
                                    });
                            });
                    });

//                $.when(
//                    isSearchAtnd ? azusaar.event.atnd.searchEachDays(params) : null,
//                    isSearchEventAtnd ? azusaar.event.eventatnd.searchEachDays(params) : null,
//                    isSearchConnpass ? azusaar.event.connpass.searchEachDays(params) : null
//                ).done(function(){
//                        df.resolve();
//                    });
            });

        return df.promise();
    }

    function searchAllDaily(){
        var params = {
            query : query,
            year : year,
            month : month,
            day : day
        };
        return $.when(
            isSearchAtnd ? azusaar.event.atnd.searchDaily(params) : null,
            isSearchEventAtnd ? azusaar.event.eventatnd.searchDaily(params) : null,
            isSearchZusaar ? azusaar.event.zusaar.searchDaily(params) : null,
            isSearchKokucheese ? azusaar.event.kokucheese.searchDaily(params) : null,
            isSearchPartake ? azusaar.event.partake.searchDaily(params) : null,
            isSearchConnpass ? azusaar.event.connpass.searchDaily(params) : null,
            isSearchDoorkeeper ? azusaar.event.doorkeeper.searchDaily(params) : null
        );
    }

    return {
        init : init,
        validate : validate,
        currentDate : currentDate,
        checkValue : checkValue,
        createSearchParam: createSearchParam,
        searchAllMonthly : searchAllMonthly,
        searchAllMonthlyLite : searchAllMonthlyLite,
        searchAllDaily : searchAllDaily
    };

    // private methods

}());
