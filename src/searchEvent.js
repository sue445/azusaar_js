function SearchEventBase(apiUrl, icon){
	this.apiUrl = apiUrl;
	this.icon = icon;
};
SearchEventBase.prototype = {
		maxCount : 100,
		totalResultCount : 0,

		search : function(query, year, month){
			var param = {
					query : query,
					year : year,
					month : month,
			};
			this.totalResultCount = 0;
			this.searchBase(this, 1, param);
		},

		searchBase : function(parent, start, param){
			param = param || {};
			var query = param.query || "";
			var year  = param.year;
			var month = param.month;
			var allReturn = param.allReturn || false;
			var dayUnique = param.dayUnique || false;

			if(azusaar.showPageLoadingMsg){
				azusaar.showPageLoadingMsg();
			}
			$.ajax({
				cache: ((parent.icon == "atnd" || parent.icon == "eventatnd") ? false : true),
				url: parent.apiUrl,
				traditional : true,
				async : true,
				type: "GET",
				timeout: 30000,
				data: {
					"keyword": azusaar.splitKeyword(query),
					"ym": azusaar.toYYYYMM(year, month),
					"format": ((parent.icon == "atnd" || parent.icon == "eventatnd") ? "jsonp" : "json"),
					"start": start,
					"count": parent.maxCount,
					"allReturn" : allReturn,
					"dayUnique" : dayUnique,
				},
				dataType: ((parent.icon == "atnd" || parent.icon == "eventatnd") ? "jsonp" : "json"),
				jsonp : "callback",
				error: function() {
					if(azusaar.searchFinish){
						azusaar.searchFinish();
					}
				},
				success : function(response, status){
					if(response.hash){
						response = response.hash;
					}

					var events;
					if(response.events && response.events.length > 0 && response.events[0] && response.events[0].event){
						events = response.events[0].event;
					} else if(response.event){
						events = response.event;
					} else{
						events = response.events;
					}

					if(status != "success" || !response || response.results_returned < 1 || !events){
						if(azusaar.searchFinish){
							azusaar.searchFinish();
						}
						return;
					}


					if(response.results_returned == parent.maxCount){
						parent.searchBase(parent, start+response.results_returned, param);
					}

					var eventCount = 0;
					for(var i = 0; i < events.length; i++){
						var startedAt = azusaar.parseDate(events[i].started_at);
						if(startedAt && startedAt.getFullYear() == year && startedAt.getRealMonth() == month){
							events[i].title = azusaar.trim(events[i].title);
							azusaar.addEvent(events[i], parent.icon);
							++eventCount;
						}
					}

					parent.totalResultCount += eventCount;
					azusaar.dispTotal();

					if(response.results_returned != parent.maxCount && azusaar.searchFinish){
						azusaar.searchFinish();
					}
				},
			});
		},

		searchDaily : function(query, year, month, day, limit) {
			var param = {
					query : query,
					year : year,
					month : month,
					day : day,
			};
			limit = limit || 100;
			this.searchDailyBase(this, 1, limit, param);
		},

		searchDailyBase : function(parent, start, count, param) {
			param = param || {};
			var query = param.query || "";
			var year  = param.year;
			var month = param.month;
			var day   = param.day;
			var allReturn = param.allReturn || false;
			var dayUnique = param.dayUnique || false;

			if(azusaar.showPageLoadingMsg){
				azusaar.showPageLoadingMsg();
			}
			$.ajax({
				cache: ((parent.icon == "atnd" || parent.icon == "eventatnd") ? false : true),
				traditional : true,
				async : true,
				type: "GET",
				url: parent.apiUrl,
				timeout: 30000,
				data: {
					"keyword": azusaar.splitKeyword(query),
					"ymd": azusaar.toYYYYMMDD(year, month, day),
					"format": ((parent.icon == "atnd" || parent.icon == "eventatnd") ? "jsonp" : "json"),
					"start": start,
					"count": count,
				},
				dataType: ((parent.icon == "atnd" || parent.icon == "eventatnd") ? "jsonp" : "json"),
				jsonp : "callback",
				error: function() {
					if(azusaar.searchFinish){
						azusaar.searchFinish();
					}
				},
				success : function(response, status){
					if(response.hash){
						response = response.hash;
					}

					var events;
					if(response.events && response.events.length > 0 && response.events[0] && response.events[0].event){
						events = response.events[0].event;
					} else if(response.event){
						events = response.event;
					} else{
						events = response.events;
					}

					if(status != "success" || !response || response.results_returned < 1 || !events){
						if(azusaar.searchFinish){
							azusaar.searchFinish();
						}
						return;
					}

					if(start == 1 && count==1){
						// nothing
					} else if(response.results_returned == count){
						searchDailyBase(parent, start+response.results_returned, count, param);
					}

					for(var i in events){
						var startedAt = azusaar.parseDate(events[i].started_at);
						if(startedAt.getFullYear() == year && startedAt.getRealMonth() == month && startedAt.getDate() == day){
							events[i].title = azusaar.trim(events[i].title);
							azusaar.addEvent(events[i], parent.icon);
						}
					}

					if(azusaar.searchFinish){
						azusaar.searchFinish();
					}
				},
			});
		},

};

var atnd = new SearchEventBase("http://api.atnd.org/events/", "atnd");
var eventatnd = new SearchEventBase("http://api.atnd.org/eventatnd/event/", "eventatnd");
var zusaar = new SearchEventBase("/api/zusaar", "zusaar");
var kokucheese = new SearchEventBase("/api/kokucheese", "kokucheese");
var partake = new SearchEventBase("/api/partake", "partake");
var connpass = new SearchEventBase("/api/connpass", "connpass");
