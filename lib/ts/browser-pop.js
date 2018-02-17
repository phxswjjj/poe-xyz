define(["require", "exports", "./ItemParser", "./tsg"], function (require, exports, ItemParser, tsg) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    $(function () {
        //default focus
        var itemDescCtrl = $('#item_desc');
        itemDescCtrl.focus();
        $('#btnOpenXYZ').click(function () {
            var itemDesc = itemDescCtrl.val();
            var item = new ItemParser.ItemContent(itemDesc);
            console.log(item);
            if (item.isValid && item.isIdentified) {
                var url = 'http://poedb.tw/xyz.php?league=Warbands&status=1&boc_min=1&name=' + item.name;
                window.open(encodeURI(url));
            }
        });
        $('#btnOpenTSG').click(function () {
            var itemDesc = itemDescCtrl.val();
            var item = new ItemParser.ItemContent(itemDesc);
            console.log(item);
            if (item.isValid) {
                var tsgItem = new tsg.ItemContent(item);
                if (tsgItem.parseItemNo()) {
                    chrome.tabs.create({
                        url: tsgItem.getViewUrl()
                    }, function (tab) {
                        console.log(tab);
                    });
                }
            }
        });
    });
});
//# sourceMappingURL=browser-pop.js.map