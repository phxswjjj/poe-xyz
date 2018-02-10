$(function(){
	//default focus
	var itemDescCtrl = $('#item_desc');
	itemDescCtrl.focus();
	
	$('#btnSearch').click(function(){
		var itemDesc = itemDescCtrl.val();
		var descList = itemDesc.split('\n');
		var descCount = descList.length;
		//未鑑定不要執行
		for(var i = descCount - 1; i >= 0; i--){
			if(descList[i] == '--------'){
				break;
			} else if(descList[i] == '未鑑定'){
				itemDesc.val('未鑑定');
				return;
			}
		}

		for(var i = 0; i < 3; i++){
			if(descList[i] == '--------'){
				var itemName = descList[i - 1];
				var url = 'http://poedb.tw/xyz.php?league=Warbands&status=1&boc_min=1&name=' + itemName;
				window.open(encodeURI(url));
				return;
			}
		}
	});
});

