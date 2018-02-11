define(["require", "exports", "./ItemParser"], function (require, exports, ItemParser) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    $(function () {
        //default focus
        var itemDescCtrl = $('#item_desc');
        itemDescCtrl.focus();
        $('#btnSearch').click(function () {
            var itemDesc = itemDescCtrl.val();
            var item = new ItemParser.ItemContent(itemDesc);
            console.log(item);
            if (item.isValid && item.isIdentified) {
                var url = 'http://poedb.tw/xyz.php?league=Warbands&status=1&boc_min=1&name=' + item.name;
                window.open(encodeURI(url));
            }
        });
    });
});
//# sourceMappingURL=browser-pop.js.map