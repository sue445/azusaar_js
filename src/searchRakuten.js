var rakuten = {
		search : function(lat, lng) {
			this.searchBase(lat, lng, function(h){
				var bas = h.hotelBasicInfo;

				var icon = new Y.Icon(rakuten.getIcon(bas.reviewAverage));
				var marker = new Y.Marker(new Y.LatLng(bas.latitude,bas.longitude), {icon: icon, title: bas.hotelName});

				marker.bind("click", function(){
					map.ymap.closeInfoWindow();

					var content = $("<div/>")
						.append(
								$("<a/>")
									.attr("href", bas.hotelInformationUrl)
									.attr("target", "_top")
									.text("[楽天トラベル]" + bas.hotelName)
						).append(
								$("<a/>")
									.attr("href", bas.hotelInformationUrl)
									.attr("target", "_top")
									.append(
											$("<img/>").attr("src", bas.hotelThumbnailUrl)
									)
						).append(
								$("<br/>")
						).append(
								$("<span/>")
									.append(
											$("<img/>").attr("src", rakuten.getStar(bas.reviewAverage))
									).append(
											bas.reviewAverage
									).append(
											"&nbsp;&nbsp;"
									).append(
											(bas.hotelMinCharge) ? "最安料金：" + bas.hotelMinCharge + "円" : ""
									)
						).append(
								$("<ul/>")
									.append(
											$("<li/>")
												.append(
														$("<a/>")
															.attr("href", bas.planListUrl)
															.attr("target", "_top")
															.text("宿泊プラン一覧")
												)
									).append(
											(bas.dpPlanListUrl) ?
												$("<li/>")
													.append(
															$("<a/>")
																.attr("href", bas.dpPlanListUrl)
																.attr("target", "_top")
																.text("航空券付き宿泊プラン一覧")
													)
											:
												$("")
									).append(
											$("<li/>")
												.append(
														$("<a/>")
															.attr("href", bas.reviewUrl)
															.attr("target", "_top")
															.text("お客さまの声")
												)
									)
						);
					map.ymap.openInfoWindow(this.latlng, content.html());
				});

				map.ymap.addFeature(marker);
			}, function(){
				map.searchFinish();
			});
		},

		searchBase : function(lat, lng, hotelCallback, finishCallback) {
			$.ajax({
				traditional : true,
				async : true,
				type: "GET",
				url: "http://api.rakuten.co.jp/rws/3.0/json",
				data: {
					"developerId": "16acb4ff674248c418c2c0a86ddd7f25",
					"affiliateId": "0e4bf612.78e44a99.0e4bf613.93f05879",
					"operation": "SimpleHotelSearch",
					"version": "2009-10-20",
					"latitude": lat,
					"longitude": lng,
					"datumType": 1,
					"searchRadius": 3,
					"responseType": "small",
					"allReturnFlag" : 1,
				},
				dataType: "jsonp",
				jsonp : "callBack",
				success : function(response, status){
					if(status != "success"){
						alert("[searchRakuten.js]\nAPIの取得に失敗");
						return;
					} else if(response.Header.Status != "Success"){
						alert("[searchRakuten.js]\nエラーコード:"+ response.Header.Status + "\nエラー詳細:" + response.Header.StatusMsg);
						return;
					}

					var hotels = response.Body.SimpleHotelSearch.hotel;
					for(var i = 0; i < hotels.length; i++){
						hotelCallback(hotels[i]);
					}

					finishCallback();
				},
			});
		},

		getIcon : function(score) {
			if(!score || score < 0.5){
				return "img/rakuten_0star.png";
			} else if(score < 1.5){
				return "img/rakuten_1star.png";
			} else if(score < 2.5){
				return "img/rakuten_2stars.png";
			} else if(score < 3.5){
				return "img/rakuten_3stars.png";
			} else if(score < 4.5){
				return "img/rakuten_4stars.png";
			}
			return "img/rakuten_5stars.png";
		},

		getStar : function(score) {
			if(!score || score < 0.25){
				return "img/star00.png";
			} else if(score < 0.75){
				return "img/star05.png";
			} else if(score < 1.25){
				return "img/star10.png";
			} else if(score < 1.75){
				return "img/star15.png";
			} else if(score < 2.25){
				return "img/star20.png";
			} else if(score < 2.75){
				return "img/star25.png";
			} else if(score < 3.25){
				return "img/star30.png";
			} else if(score < 3.75){
				return "img/star35.png";
			} else if(score < 4.25){
				return "img/star40.png";
			} else if(score < 4.75){
				return "img/star45.png";
			}
			return "img/star50.png";
		}
};
