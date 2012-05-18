var map = {
		lat : null,
		lng : null,
		place : null,
		ymap: null,
		address: null,
		searchCount: 0,

		init : function(){
			var address = $.query.get("address");
			this.place = $.query.get("place");

			if(azusaar.isParam(address)){
				this.getLatLng(address, function(latlng) {
					map.lat = latlng.lat();
					map.lng = latlng.lng();
					map.address = address;
					map.initBase();
				});
			} else{
				this.lat = $.query.get("lat");
				this.lng = $.query.get("lng");
				this.initBase();
			}
		},

		initBase : function() {
			this.ymap = new Y.Map("map_canvas", {
				configure : {
					scrollWheelZoom : true,
				}
			});
			this.ymap.drawMap(new Y.LatLng(this.lat, this.lng), 17, Y.LayerSetId.NORMAL);
			this.ymap.addControl(new Y.LayerSetControl());
			this.ymap.addControl(new Y.ScaleControl());
			this.ymap.addControl(new Y.SliderZoomControlVertical());

			this.addPlaceMarker(this.lat, this.lng, this.place);
			this.ymap.bind("click", function(){
				map.ymap.closeInfoWindow();
			});

			this.searchCount = 2;
			rakuten.search(this.lat, this.lng);
			jalan.search(this.lat, this.lng);
		},

		addPlaceMarker : function(lat, lng, title) {
			var icon = new Y.Icon("img/villa.png");
			var marker = new Y.Marker(new Y.LatLng(lat,lng), {icon: icon, title: title});
			marker.bind("click", function(){
				map.ymap.closeInfoWindow();
				var title = this.title;
				if(map.address){
					title += "<br/>(" + map.address + ")";
				}
				map.ymap.openInfoWindow(this.latlng, title);
			});
			this.ymap.addFeature(marker);
		},

		getLatLng : function(address, callback) {
			$.ajax({
				traditional : true,
				async : true,
				type: "GET",
				url: "http://api.geodosu.com/v2/geo_pp",
				data: {
					apiKey : "sue445",
					address : address,
					output : "json",
				},
				dataType: "jsonp",
				jsonp : "callback",
				success : function(response, status){
					if(status == "success"){
						map.callGeoCoder(response.result.addresses.pre_processed, callback);
					} else{
						map.callGeoCoder(address, callback);
					}
				},
			});
		},

		/*
		callGeoCoder : function(address, callback) {
			var request = { query : address };
			var geocoder = new Y.GeoCoder();
			geocoder.execute( request , function( ydf ) {
				if ( ydf.features.length > 0 ) {
					var latlng = ydf.features[0].latlng;
					callback(latlng);
				} else{
					alert("住所が見つかりません[address="+ address +"]");
				}
			} );
		},
		*/
		callGeoCoder : function(address, callback) {
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({
				address: address
			}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					for (var i in results) {
						if (results[i].geometry) {
							var latlng = results[i].geometry.location;
							callback(latlng);
							break;
						}
					}
				} else{
					alert("住所が見つかりません[address="+ address +"]");
				}
			});
		},

		searchFinish : function() {
			this.searchCount--;
			if(this.searchCount <= 0){
				$("#loading").hide();
			}
		}
};
