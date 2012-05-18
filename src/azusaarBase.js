function getMonthEndDay(year, month) {
	var date = new Date(year, month+1, 1);
	return date.addDate(-1).getDate();
}
Date.prototype.getRealMonth = function(){
	return this.getMonth() + 1;
};
Date.prototype.addDate = function(inc) {
	return inc ? new Date(this.getFullYear(), this.getMonth(), this.getDate()+inc) : this;
};
Date.prototype.addMonth = function(inc) {
	if(!inc){
		return this;
	}

	var nextMonthLastDay = getMonthEndDay(this.getFullYear(), this.getMonth()+inc);
	var day = this.getDate();
	if(day > nextMonthLastDay){
		day = nextMonthLastDay;
	}
	return new Date(this.getFullYear(), this.getMonth()+inc, day);
};
Date.prototype.sameMonth = function(date) {
	return date && this.getFullYear() == date.getFullYear() && this.getMonth() == date.getMonth();
};

(function($){
	$.fn.extend({
		check: function(isCheck) {
			return this.each(
					function() {
						this.checked = (isCheck) ? true : false;
					}
			);
		},
	});
})(jQuery);

function AzusaarBase(){};
AzusaarBase.prototype = {
		currentDate : null,
		query : "",
		isSearchAtnd : true,
		isSearchEventAtnd : true,
		isSearchZusaar : true,
		isSearchKokucheese : true,
		isSearchPartake : true,
		isSearchConnpass : true,
		searchCount : 0,

		initParameter : function(){
			var today = new Date();
			var year = $.query.get("y");
			var month = $.query.get("m");
			var day = $.query.get("d");

			this.query = $.query.get("q");
			this.isSearchAtnd = this.isSearch($.query.get("at"));
			this.isSearchEventAtnd = this.isSearch($.query.get("ea"));
			this.isSearchZusaar = this.isSearch($.query.get("zu"));
			this.isSearchKokucheese = this.isSearch($.query.get("ko"));
			this.isSearchPartake = this.isSearch($.query.get("pa"));
			this.isSearchConnpass = this.isSearch($.query.get("co"));

			if(this.isSearchAtnd){
				this.searchCount++;
			}
			if(this.isSearchEventAtnd){
				this.searchCount++;
			}
			if(this.isSearchZusaar){
				this.searchCount++;
			}
			if(this.isSearchKokucheese){
				this.searchCount++;
			}
			if(this.isSearchPartake){
				this.searchCount++;
			}
			if(this.isSearchConnpass){
				this.searchCount++;
			}

			if(!this.isParam(this.query)){
				this.query = "";
			}

			if(!this.isParam(year)){
				year = today.getFullYear();
			}

			if(!this.isParam(month)){
				month = today.getRealMonth();
			}

			if(!this.isParam(day)){
				day = today.getDate();
				if(day > getMonthEndDay(year, month-1)){
					day = getMonthEndDay(year, month-1);
				}
			}

			this.currentDate = new Date(year, month-1, day);

			$("#query").val(this.query.replace(/\+/g," "));
			$("#year").text(year);
			$("#month").text(month);
			$("#day").text(day);
		},

		initCalendar : function(year, month){
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
					.append(
						$("<span/>").text(day)
					).append(
						$("<div/>")
							.addClass("events")
							.append(
								$("<ul/>").addClass("event")
							)
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
		},

		isParam : function(obj){
			return obj && obj !== true && obj !== false;
		},

		toYYYYMM : function(year, month){
			if(month < 10){
				month = "0" + month;
			}
			return "" + year + month;
		},

		toYYYYMMDD : function(year, month, day){
			if(day < 10){
				day = "0" + day;
			}
			return this.toYYYYMM(year, month) + day;
		},

		parseDate : function(str){
			if(str && str.match(/(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)/)){
				return new Date(RegExp.$1, RegExp.$2-1, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6);
			}
			return null;
		},

		splitKeyword : function(str){
			if(str){
				return str.replace(/[\+\s　]+/g, " ").split(" ");
			}
			return "";
		},

		checkValue : function(id){
			if($('#'+id).attr('checked')){
				return "1";
			} else{
				return "0";
			}
		},

		isSearch : function(value){
			return value == "1" || !this.isParam(value);
		},

		initEventCheck : function(){
			$("#checkAtnd").check(this.isSearchAtnd);
			$("#checkEventAtnd").check(this.isSearchEventAtnd);
			$("#checkZusaar").check(this.isSearchZusaar);
			$("#checkKokucheese").check(this.isSearchKokucheese);
			$("#checkPartake").check(this.isSearchPartake);
			$("#checkConnpass").check(this.isSearchConnpass);
		},

		searchAll : function() {
			var year = this.currentDate.getFullYear();
			var month = this.currentDate.getRealMonth();

			if(this.isSearchAtnd){
				atnd.search(this.query, year, month);
			}
			if(this.isSearchEventAtnd){
				eventatnd.search(this.query, year, month);
			}
			if(this.isSearchZusaar){
				zusaar.search(this.query, year, month);
			}
			if(this.isSearchKokucheese){
				kokucheese.search(this.query, year, month);
			}
			if(this.isSearchPartake){
				partake.search(this.query, year, month);
			}
			if(this.isSearchConnpass){
				connpass.search(this.query, year, month);
			}
		},

		searchBase : function(d){
			var param = this.createSearchParam(d);
			location.href = this.basePath + param;
		},

		createSearchParam : function(d) {
			var q = $("#query").val();
			var y = d.getFullYear();
			var m = d.getRealMonth();

			var atnd = this.checkValue("checkAtnd");
			var eventatnd = this.checkValue("checkEventAtnd");
			var zusaar = this.checkValue("checkZusaar");
			var kokucheese = this.checkValue("checkKokucheese");
			var partake = this.checkValue("checkPartake");
			var connpass = this.checkValue("checkConnpass");

			var param = $.query.set("q", q).set("y", y).set("m", m).set("at", atnd).set("ea", eventatnd).set("zu", zusaar).set("ko", kokucheese).set("pa", partake).set("co", connpass).toString();
			return param;
		},

		trim : function(str){
			if(str){
				return str.replace(/[\s　]+/g, " ");
			}
			return "";
		},

		createYmds : function(year, month) {
			var ymdArray = [];

			this.eachMonth(year, month, function(day) {
				ymdArray.push(azusaar.toYYYYMMDD(year, month, day));
			});

			return ymdArray;
		},

		eachMonth : function(year, month, callback) {
			var date = new Date(year, month-1, 1);
			var day = 1;

			while(date.getRealMonth() == month){
				callback(day);
				date = date.addDate(1);
				day++;
			}
		},

		createDays : function(year, month) {
			var dayArray = [];

			this.eachMonth(year, month, function(day) {
				dayArray.push(day);
			});

			return dayArray;
		},

		getBrowserHeight : function() {
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
		},
};
