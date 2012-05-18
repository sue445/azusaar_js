function AzusaarSmart(){};
AzusaarSmart.prototype = new AzusaarBase();

var azusaar = new AzusaarSmart();
(function($, az){
	az.basePath = "/smart/";
	az.totalCount = 0;
	az.events = [];

	az.addEvent = function(e, icon){
		var date = az.parseDate(e.started_at);
		var day = date.getDate();

		if($("#day" + day)){
			if(!az.events[day]){
				var dailyUrl = "daily.html" + this.createSearchParam(date) + "&d=" + day;
				az.events[day] = 1;
				$("#day" + day)
					.addClass("date_has_event")
					.attr("cal_link_to", dailyUrl)
					.attr("rel", "external");
				$("#day" + day + " ul.event")
					.append(
						$("<li/>")
							.append(
								$("<span/>").addClass("title").text(az.formatDate(date))
							).append(
								$("<span/>").addClass("desc").text(e.title)
							)
					).append(
						$("<li/>")
							.append(
								$("<span/>").addClass("title").text("all evnets")
							).append(
								$("<span/>").addClass("desc").text("click")
							)
					);
			} else{
				++az.events[day];
			}
		}

		if($("#pageDaily")){
			az.addEventPage(e, icon);
		}
	};

	az.dispTotal = function(){
		$("#total").text(az.totalCount);
	};

	az.bindEvent = function(){
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
				})

				// (we're using chaining on the popup) now animate it's opacity and position
				.animate({
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
	};

	az.formatDate = function(date){
		return date.getRealMonth() + "/" + date.getDate();
	};

	az.addEventPage = function(e, icon){
		$("#pageDaily ul[data-role='listview']")
			.append(
				$("<li/>")
					.append(
						$("<a/>")
							.addClass("listEvent")
							.addClass(icon)
							.attr("href", e.event_url)
							.text(e.title)
					)
			).listview('refresh')
		;

	};

	az.squeeze = function(){
		var ym = $("#yearMonth").val().split("/");
		var date = new Date(ym[0], ym[1]-1, 1);
		az.searchBase(date);
	};

	az.showPageLoadingMsg = function(){
		$.mobile.showPageLoadingMsg();
	};

	az.searchFinish = function(){
		--az.searchCount;
		if(az.searchCount <= 0){
			$.mobile.hidePageLoadingMsg();
			az.bindEvent();
		}
	};

	az.initSearchBtn = function() {
		$("#searchBtn").attr("href", "search.html" + az.createSearchParam(az.currentDate));
	};

	az.searchAll = function(){
		var year = this.currentDate.getFullYear();
		var month = this.currentDate.getRealMonth();
		var query = this.query;

		$.when(
				this.isSearchZusaar ? zusaar.search(query, year, month) : null,
				this.isSearchKokucheese ? kokucheese.search(query, year, month) : null,
				this.isSearchPartake ? partake.search(query, year, month) : null
		).then(function() {
			if(az.isSearchAtnd){
				az.searchCount--;
			}
			if(az.isSearchEventAtnd){
				az.searchCount--;
			}
			if(az.isSearchConnpass){
				az.searchCount--;
			}
			for(var day = 1; day <= 31; day++){
				if(!az.events[day]){
					if(az.isSearchAtnd){
						az.searchCount++;
						atnd.searchDaily(query, year, month, day, 1);
					}
					if(az.isSearchEventAtnd){
						az.searchCount++;
						eventatnd.searchDaily(query, year, month, day, 1);
					}
					if(az.isSearchConnpass){
						az.searchCount++;
						connpass.searchDaily(query, year, month, day, 1);
					}
				}
			}
		});
	}


})(jQuery, azusaar);

function searchSmart(query, year, month){
	var param = {
			query : query,
			year : year,
			month : month,
			allReturn : true,
			dayUnique : true,
	};
	this.totalResultCount = 0;
	this.searchBase(this, 1, param);
}

zusaar.search = searchSmart;
kokucheese.search = searchSmart;
partake.search = searchSmart;
