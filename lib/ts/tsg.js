define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ItemContent = /** @class */ (function () {
        function ItemContent(item) {
            this.item = item;
            this.baseUrl = 'http://gametsg.techbang.com/poe/';
            this.src = item;
        }
        ItemContent.prototype.getViewUrl = function () {
            return this.baseUrl + 'index.php?view=item&item=' + this.itemNo;
        };
        ItemContent.prototype.parseItemNo = function () {
            var sender = this;
            var isSuccess = false;
            if (!sender.src.isValid)
                return false;
            //'http://gametsg.techbang.com/poe/index.php?k1=item&view=search&keyword=' + this.src.name;
            //var baseUrl = 'http://gametsg.techbang.com/poe/';
            var url = sender.baseUrl + 'index.php';
            console.log(url);
            $.ajax({
                async: false,
                type: 'GET',
                url: encodeURI(url),
                data: {
                    k1: 'item',
                    view: 'search',
                    keyword: sender.src.name
                },
                success: function (data) {
                    //console.log(resp);
                    var doc = $(data);
                    var itemHref = doc.find('#table_ a.color18.mid1').first();
                    var href = itemHref.attr('href');
                    var itemUrl = sender.baseUrl + href;
                    var aParser = function (url) {
                        var a = document.createElement('a');
                        a.href = url;
                        return a;
                    };
                    var parmsKV = aParser(itemUrl).search.split('&');
                    for (var i = 0; i < parmsKV.length; i++) {
                        var kv = parmsKV[i].split('=');
                        if (kv.length != 2)
                            continue;
                        var k = kv[0];
                        var v = kv[1];
                        if (k == 'item') {
                            sender.itemNo = v;
                            isSuccess = true;
                            break;
                        }
                    }
                }
            });
            return isSuccess;
        };
        ItemContent.prototype.fetchView = function (success) {
            var sender = this;
            if (!sender.itemNo)
                return;
            var url = sender.baseUrl + 'index.php';
            console.log(url);
            $.ajax({
                async: false,
                type: 'GET',
                url: encodeURI(url),
                data: {
                    item: sender.itemNo,
                    view: 'item'
                },
                success: function (data) {
                    var doc = $(data);
                    var itemDiv = doc.find('#poe_ui_item');
                    console.log(itemDiv);
                    success(itemDiv);
                }
            });
        };
        return ItemContent;
    }());
    exports.ItemContent = ItemContent;
});
//# sourceMappingURL=tsg.js.map