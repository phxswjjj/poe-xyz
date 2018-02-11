import * as ItemParser from './ItemParser';

$(function () {
    //default focus
    var itemDescCtrl = $('#item_desc');
    itemDescCtrl.focus();

    $('#btnSearch').click(function () {
        var itemDesc = itemDescCtrl.val() as string;
        let item = new ItemParser.ItemContent(itemDesc);
        console.log(item);
        if (item.isValid && item.isIdentified) {
            var url = 'http://poedb.tw/xyz.php?league=Warbands&status=1&boc_min=1&name=' + item.name;
            window.open(encodeURI(url));
        }
    });
});

