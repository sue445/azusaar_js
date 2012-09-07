if (!this.azusaar) {
	var azusaar = {};
}

azusaar.userinfo = (function() {
	// public methods
	function main(params){
		$.ajax({
			async : true,
			url : "/auth/userInfo",
			dataType : "json"
		}).done(function(res, status){
			if(status != "success"){
				return;
			}

			if(res.screenName){
				showLoginedHeader(res.screenName, res.profileImageUrl);

				if(params){
					searchAtnd(params, res.screenName);
					searchEventAtnd(params, res.screenName);
					searchZusaar(params, res.zusaarId);
					searchConnpass(params, res.connpassId);
					searchPartake(params, res.partakeId);
				}
			} else{
				showNotLoginedHeader();
			}
		});
	}


	return {
		main : main
	};

	// private methods
	function showLoginedHeader(screenName, profileImageUrl){
		$("<li>").append(
			$("<a/>").attr("href", "/home/").append(
				$("<img>").attr({src:profileImageUrl, width:24, height:24})
			).append(
				$("<span>").text(" " + screenName)
			)
		).appendTo($("#userInfoArea"));

		$("<li>").append(
			$("<a/>").attr("href", "/home/").text("ホーム")
		).appendTo($("#userInfoArea"));

		$("<li>").append(
			$("<a/>").attr("href", "/auth/logout").text("ログアウト")
		).appendTo($("#userInfoArea"));
	}

	function showNotLoginedHeader(){
		$("<li>").append(
			$("<a/>").attr("href", "/home/").text("Twitterでログイン")
		).appendTo($("#userInfoArea"));
	}

	function searchAtnd(params, screenName){
		if(screenName){
			azusaar.event.atnd.searchMonthly({year: params.year, month: params.month, twitter_id: screenName});
			azusaar.event.atnd.searchMonthly({year: params.year, month: params.month, owner_twitter_id: screenName});
		}
	}

	function searchEventAtnd(params, screenName){
		if(screenName){
			azusaar.event.eventatnd.searchMonthly({year: params.year, month: params.month, twitter_id: screenName});
			azusaar.event.eventatnd.searchMonthly({year: params.year, month: params.month, owner_twitter_id: screenName});
		}
	}

	function searchZusaar(params, zusaarId){
		if(zusaarId){
			azusaar.event.zusaar_origin.searchMonthly({year: params.year, month: params.month, user_id: zusaarId});
			azusaar.event.zusaar_origin.searchMonthly({year: params.year, month: params.month, owner_id: zusaarId});
		}
	}

	function searchConnpass(params, connpassId){
		if(connpassId){
			azusaar.event.connpass.searchMonthly({year: params.year, month: params.month, nickname: connpassId});
			azusaar.event.connpass.searchMonthly({year: params.year, month: params.month, owner_nickname: connpassId});
		}
	}

	function searchPartake(params, partakeId){
		if(partakeId){
			azusaar.event.partake_user.searchMonthly({year: params.year, month: params.month, user_id: partakeId});
			azusaar.event.partake_user.searchMonthly({year: params.year, month: params.month, owner_id: partakeId});
		}
	}
}());
