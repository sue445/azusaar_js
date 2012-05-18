var jalan = {
		search : function(lat, lng) {
			this.searchBase(lat, lng, function(h){
				var x = $(h).find("X").text();
				var y = $(h).find("Y").text();

				if(!x || !y || x == "999999999" || y == "999999999"){
					return;
				}

				var lngJ = (x / 3600 / 1000);
				var latJ = (y / 3600 / 1000);
				var lng = lngJ - latJ * 0.000046038 - lngJ * 0.000083043 + 0.010040;
				var lat = latJ - latJ * 0.00010695 + lngJ * 0.000017464 + 0.0046017;
				// マーカーが完全に重なると見づらいので若干ずらす
				lng += 0.0001;
				lat += 0.0001;
				var icon = new Y.Icon(jalan.getIcon($(h).find("Rating").text()));
				var marker = new Y.Marker(new Y.LatLng(lat, lng), {icon: icon, title: $(h).find("HotelName").text()});

				marker.bind("click", function(){
					map.ymap.closeInfoWindow();

					var content = $("<div/>")
						.append(
								$("<a/>")
									.attr("href", $(h).find("HotelDetailURL").text())
									.attr("target", "_top")
									.text("[じゃらん]" + $(h).find("HotelName").text())
						).append(
								$("<a/>")
									.attr("href", $(h).find("HotelDetailUrl").text())
									.attr("target", "_top")
									.append(
											$("<img/>")
												.attr("src", $(h).find("PictureURL").text())
												.attr("alt", $(h).find("PictureCaption").text())
												.attr("title", $(h).find("PictureCaption").text())
									)
						).append(
								$("<br/>")
						).append(
								$("<span/>")
									.append(
											$("<img/>").attr("src", rakuten.getStar($(h).find("Rating").text()))
									).append(
											$(h).find("Rating").text()
									).append(
											"&nbsp;&nbsp;"
									).append(
											($(h).find("SampleRateFrom").text()) ? "参考料金：" + $(h).find("SampleRateFrom").text() + "円" : ""
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
			var y = parseInt((lat * 1.000106961 - lng * 0.000017467 - 0.004602017) * 3600 * 1000);
			var x = parseInt((lng * 1.000083049 + lat * 0.000046047 - 0.010041046) * 3600 * 1000);
			$.ajax({
				cache: true,
				traditional : true,
				async : true,
				type: "GET",
				url: "/api/jalan",
				data: {
					x : x,
					y : y,
					range : 10,
					count : 100,
					pict_size : 0,
					xml_ptn : 1,
				},
				dataType: "json",
				success : function(response, status){
					if(status != "success"){
						alert("[searchJalan.js]\nAPIの取得に失敗");
						return;
					}

					var d = $("<div/>");
					$.jsonml(response).appendTo(d);
					$("Hotel", d).each(function() {
						hotelCallback(this);
					});

					finishCallback();
				},
			});
		},

		getIcon : function(score) {
			if(!score || score < 0.5){
				return "img/jalan_0star.png";
			} else if(score < 1.5){
				return "img/jalan_1star.png";
			} else if(score < 2.5){
				return "img/jalan_2stars.png";
			} else if(score < 3.5){
				return "img/jalan_3stars.png";
			} else if(score < 4.5){
				return "img/jalan_4stars.png";
			}
			return "img/jalan_5stars.png";
		},
};
