var holiday = {
		getHoliday : function(year, month, callback){
			$.ajax({
				url: "http://www.google.com/calendar/feeds/japanese__ja@holiday.calendar.google.com/public/full-noattendees",
				async : true,
				type: "GET",
				timeout: 30000,
				cache : false,
				data: {
					"alt" : "json-in-script",
					"start-min" : year + "-" + this.padding(month) + "-01",
					"start-max" : year + "-" + this.padding(month+1) + "-01",
				},
				dataType: "jsonp",
				jsonp : "callback",
				success : function(response, status){
					if(status == "success"){
						$.each(response.feed.entry, function(i, value){
							var ymd = value.gd$when[0].startTime.split("T")[0].split("-");
							callback({
								title : value.title.$t,
								day : ymd[2]*1,
							});
						});
					}
				},
			});
		},

		padding : function(value){
			return (value < 10) ? "0"+value : value;
		},
};
