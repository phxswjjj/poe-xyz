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
                    var findHrefItem = function (items) {
                        var result = undefined;
                        items.each(function (i, el) {
                            var obj = $(el);
                            if (obj.text() == sender.src.name) {
                                result = obj;
                                return false;
                            }
                        });
                        return {
                            isSuccess: !result ? false : true,
                            out: result
                        };
                    };
                    var doc = $(data);
                    var res = findHrefItem(doc.find('#table_ a.color18.mid1'));
                    if (!res.isSuccess) {
                        res = findHrefItem(doc.find('#table_int a.color18.mid1'));
                    }
                    console.log(res);
                    if (res.isSuccess) {
                        var hrefItem = res.out;
                        var href = hrefItem.attr('href');
                        console.log(href);
                        if (href.indexOf('?') == 0) {
                            href = href.substr(1);
                        }
                        var parmsKV = href.split('&');
                        for (var i = 0; i < parmsKV.length; i++) {
                            var kv = parmsKV[i].split('=');
                            if (kv.length != 2)
                                continue;
                            var k = kv[0];
                            var v = kv[1];
                            if (k.toUpperCase() == 'ITEM') {
                                sender.itemNo = v;
                                isSuccess = true;
                                break;
                            }
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