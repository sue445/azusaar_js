if(!this.azusaar) {
    var azusaar = {};
}

azusaar.event = {};
azusaar.event.SearchEventBase = function(params){
    params = params || {};
    this.apiUrl = params.apiUrl;
    this.icon = params.icon;
    this.cache = params.cache;
    this.format = params.format || "json";
    this.dataType = params.dataType || this.format;
    this.canUseAllReturn = params.canUseAllReturn || false;
    this.addCallback = params.addCallback || function(){};
    this.initParams = params;
};

azusaar.event.SearchEventBase.prototype = {
    searchMonthly: function(params){
        var df = $.Deferred();
        params = params || {};
        params.day = null;
        this.searchBase(1, df , params);
        return df.promise();
    },

    searchDaily: function(params){
        var df = $.Deferred();
        params = params || {};
        this.searchBase(1, df, params);
        return df.promise();
    },

    searchEachDays: function(params){
        params = params || {};
        var days = params.days;
        return $.when(
            days[1]  ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 1})  : null,
            days[2]  ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 2})  : null,
            days[3]  ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 3})  : null,
            days[4]  ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 4})  : null,
            days[5]  ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 5})  : null,
            days[6]  ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 6})  : null,
            days[7]  ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 7})  : null,
            days[8]  ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 8})  : null,
            days[9]  ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 9})  : null,
            days[10] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 10}) : null,
            days[11] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 11}) : null,
            days[12] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 12}) : null,
            days[13] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 13}) : null,
            days[14] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 14}) : null,
            days[15] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 15}) : null,
            days[16] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 16}) : null,
            days[17] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 17}) : null,
            days[18] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 18}) : null,
            days[19] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 19}) : null,
            days[20] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 20}) : null,
            days[21] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 21}) : null,
            days[22] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 22}) : null,
            days[23] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 23}) : null,
            days[24] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 24}) : null,
            days[25] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 25}) : null,
            days[26] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 26}) : null,
            days[27] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 27}) : null,
            days[28] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 28}) : null,
            days[29] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 29}) : null,
            days[30] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 30}) : null,
            days[31] ? this.searchDaily({query:params.query, count:params.count, year:params.year, month:params.month, day: 31}) : null
        );
    },

    searchBase: function(start, df, params){
        var query = params.query || "";
        var year  = params.year;
        var month = params.month;
        var day = params.day;
        var dayUnique = params.dayUnique || false;
        var count = params.count || 100;
        var util = azusaar.util;
        var data = {
            format: this.format,
            start: start,
            count: count,
            allReturn : this.canUseAllReturn && dayUnique,
            dayUnique : dayUnique
        };

        if(day){
            data.ymd = util.toYYYYMMDD(year, month, day);
        } else{
            data.ym = util.toYYYYMM(year, month);
        }

        var keyword = util.splitKeyword(query);
        if(keyword && keyword.length > 0 && keyword[0].length > 0){
            data.keyword = keyword;
        }

        if(params.twitter_id){
            data.twitter_id = params.twitter_id;
        }
        if(params.owner_twitter_id){
            data.owner_twitter_id = params.owner_twitter_id;
        }
        if(params.user_id){
            data.user_id = params.user_id;
        }
        if(params.owner_id){
            data.owner_id = params.owner_id;
        }
        if(params.nickname){
            data.nickname = params.nickname;
        }
        if(params.owner_nickname){
            data.owner_nickname = params.owner_nickname;
        }

        var kind;
        if(params.owner_id || params.owner_twitter_id || params.owner_nickname){
            kind = "owner";
        } else if(params.user_id || params.twitter_id || params.nickname){
            kind = "user";
        } else{
            kind = "other";
        }

        var that = this;

        var eventCallback = function(events){
            if(events && events.length > 0){
                for(var i = 0; i < events.length; i++){
                    var startedAt = util.parseDate(events[i].started_at);
                    if(startedAt){
                        if( (day && startedAt.sameDay(params)) || (!day && startedAt.sameMonth(params)) ){
                            events[i].title = util.trim(events[i].title);
                            that.addCallback({event: events[i], kind: kind});
                        }
                    }
                }
                if(azusaar.main && azusaar.main.dispTotal){
                    azusaar.main.dispTotal();
                }
            }
        };

        var successCallback = function(response, status){
            if(status != "success"){
                df.reject();
                return;
            }
            response = response || {};

            if(response.hash){
                // for. eventatnd
                response = response.hash;
            }

            if(response.results_returned < 1){
                df.resolve();
                return;
            }

            if(response.events && response.events.length > 0 && response.events[0] && response.events[0].event){
                // for. eventatnd
                for(var i = 0; i < response.events.length; i++){
                    eventCallback(response.events[i].event);
                }
            } else if(response.events){
                // for. atnd, connpass
                eventCallback(response.events);
            } else if(response.event){
                eventCallback(response.event);
            }

            if(data.allReturn || dayUnique || response.results_returned != count){
                // search end
                df.resolve();
            } else{
                // next paging
                that.searchBase(start+response.results_returned, df, params);
            }
        };

        //azusaar.main.showPageLoadingMsg(true);
        $.ajax({
            cache: this.cache,
            url: this.apiUrl,
            traditional : true,
            async : true,
            type: "GET",
            timeout: 30000,
            data: data,
            dataType: this.dataType,
            jsonp : "callback",
            error: function() {
                df.reject();
            },
            success : function(response, status){
                successCallback(response, status);
            }
        });

        if(kind == "other"){
            azusaar.main.showPageLoadingMsg(true);
        }

    }
};

azusaar.event.atnd = new azusaar.event.SearchEventBase({
    apiUrl:"http://api.atnd.org/events/",
    icon:"atnd",
    cache: false,
    format:"jsonp",
    canUseAllReturn: false
});

azusaar.event.zusaar = new azusaar.event.SearchEventBase({
    apiUrl:"/api/zusaar",
    icon:"zusaar",
    cache: true,
    format:"json",
    canUseAllReturn: true
});

azusaar.event.zusaar_origin = new azusaar.event.SearchEventBase({
    apiUrl:"http://www.zusaar.com/api/event/",
    icon:"zusaar",
    cache: false,
    format:"jsonp",
    canUseAllReturn: false
});

azusaar.event.kokucheese = new azusaar.event.SearchEventBase({
    apiUrl:"/api/kokucheese",
    icon:"kokucheese",
    cache: true,
    format:"json",
    canUseAllReturn: true
});

azusaar.event.partake = new azusaar.event.SearchEventBase({
    apiUrl:"/api/partake",
    icon:"partake",
    cache: true,
    format:"json",
    canUseAllReturn: true
});

azusaar.event.partake_user = new azusaar.event.SearchEventBase({
    apiUrl:"/api/partakeUser",
    icon:"partake",
    cache: true,
    format:"json",
    canUseAllReturn: false
});

azusaar.event.connpass = new azusaar.event.SearchEventBase({
    apiUrl:"http://connpass.com/api/v1/event/",
    icon:"connpass",
    cache: false,
    format: "json",
    dataType: "jsonp",
    canUseAllReturn: false
});

azusaar.event.eventatnd = new azusaar.event.SearchEventBase({
    apiUrl:"http://api.atnd.org/eventatnd/event/",
    icon:"eventatnd",
    cache: false,
    format: "jsonp",
    canUseAllReturn: false
});
