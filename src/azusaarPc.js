function AzusaarPc(){};
AzusaarPc.prototype = new AzusaarBase();

var azusaar = new AzusaarPc();
(function($, az){
	az.basePath = "/";
	az.totalCount = 0;
	az.siteCounts = {};

	az.addEvent = function(e, icon){
		var day = az.parseDate(e.started_at).getDate();
		var li = $("<li/>").addClass(icon);

		var mapUrl = null;
		if(e.lat && e.lon){
			mapUrl = "map.html?lat=" + e.lat + "&lng=" + e.lon + "&place=" + e.place;
		} else if(e.address){
			mapUrl = "map.html?address=" + e.address + "&place=" + e.place;
		}

		if(mapUrl){
			(function(e){
				var a = $("<a/>")
					.attr("href",  "javascript:void(0);return false;")
					.attr("title",  "「" + e.place + "」周辺の地図とホテル")
					.click(function(){
						$("#mapDialogId").dialog({title: "「" + e.place + "」周辺の地図とホテル"}).dialog("open");
						$("#modalIframeId").attr("src", mapUrl);
						return false;
					})
					.append(
							$("<img/>").attr("src", "img/compass.png")
					);
				li.append(a);
				//tb_init(a);
			})(e);
		}

		var link = $("<a/>")
			.attr("href", e.event_url)
			.attr("alt", e.title)
			.attr("title", e.title)
			.text(e.title);
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
						var windowHeight = azusaar.getBrowserHeight() * 0.9;
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
					.attr("title", az.currentDate.getRealMonth() + "月" + d + "日のイベント")
					.css("white-space", "nowrap")
					.dialog({
						autoOpen: false,
						width : 800,
						zIndex : 50,
					});
			})(day);
		}

		if(count >= 4){
			$("#dayCount" + day).text(count + "件");
		}

		++az.totalCount;

		if(!az.siteCounts[icon]){
			az.siteCounts[icon] = 0;
		}
		++az.siteCounts[icon];
	};

	az.dispTotal = function(){
		$("#total").text(az.totalCount);
		az.dispSiteCount("#countAtnd", "atnd");
		az.dispSiteCount("#countEventAtnd", "eventatnd");
		az.dispSiteCount("#countZusaar", "zusaar");
		az.dispSiteCount("#countKokucheese", "kokucheese");
		az.dispSiteCount("#countPartake", "partake");
		az.dispSiteCount("#countConnpass", "connpass");
	};

	az.dispSiteCount = function(target, name){
		var count = !az.siteCounts[name] ? 0 : az.siteCounts[name];
		$(target).text( "("+count+")" );
	};

	az.showPageLoadingMsg = function(){
		$("#loading").css("visibility", "visible");
	};

	az.searchFinish = function(){
		--az.searchCount;
		if(az.searchCount <= 0){
			$("#loading").css("visibility", "hidden");
		}
	};

	az.dispHotKeyword = function(){
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
												azusaar.searchBase(azusaar.currentDate);
												return false;
											})
											.text(that.keyword)
									)
						);
				});
			},
		});
	};
})(jQuery, azusaar);
