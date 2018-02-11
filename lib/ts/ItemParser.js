define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ItemContent = /** @class */ (function () {
        function ItemContent(sContent) {
            this.sContent = sContent;
            this.isValid = false;
            this.isIdentified = false;
            this.rawData = sContent;
            this.raws = sContent.split('\n');
            var rawCnt = this.raws.length;
            this.isIdentified = (function (raws) {
                if (!raws)
                    return false;
                var rawCnt = raws.length;
                for (var i = rawCnt - 1; i >= 0; i--) {
                    if (raws[i] == '--------') {
                        break;
                    }
                    else if (raws[i] == '未鑑定') {
                        return false;
                    }
                }
                return true;
            })(this.raws);
            this.rare = (function (raws) {
                if (raws && raws.length > 0 && raws[0].match(/^稀有度: .*/)) {
                    return raws[0].substring(5);
                }
                return '';
            })(this.raws);
            this.isValid = (function (item) {
                if (!item.raws)
                    return false;
                var rawCnt = item.raws.length;
                for (var i = 1; i < rawCnt; i++) {
                    if (item.raws[i] == '--------') {
                        if (item.rare == '傳奇') {
                            item.category = item.raws[i - 1];
                            item.name = item.raws[i - 2];
                        }
                        else {
                            item.name = item.raws[i - 1];
                        }
                        return true;
                    }
                }
                return false;
            })(this);
        }
        return ItemContent;
    }());
    exports.ItemContent = ItemContent;
});
//# sourceMappingURL=ItemParser.js.map