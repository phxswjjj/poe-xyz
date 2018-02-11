
export class ItemContent {
    isValid: boolean;
    rare: string;
    category: string;
    name: string;
    isIdentified: boolean;
    rawData: string;
    raws: string[];
    constructor(public sContent: string) {
        this.isValid = false;
        this.isIdentified = false;

        this.rawData = sContent;
        this.raws = sContent.split('\n');
        var rawCnt = this.raws.length;

        this.isIdentified = ((raws: string[]) => {
            if (!raws) return false;
            var rawCnt = raws.length;
            for (var i = rawCnt - 1; i >= 0; i--) {
                if (raws[i] == '--------') {
                    break;
                } else if (raws[i] == '未鑑定') {
                    return false;
                }
            }
            return true;
        })(this.raws);

        this.rare = ((raws: string[]) => {
            if (raws && raws.length > 0 && raws[0].match(/^稀有度: .*/)) {
                return raws[0].substring(5);
            }
            return '';
        })(this.raws);

        this.isValid = ((item) => {
            if (!item.raws) return false;
            var rawCnt = item.raws.length;
            for (var i = 1; i < rawCnt; i++) {
                if (item.raws[i] == '--------') {
                    if (item.rare == '傳奇') {
                        item.category = item.raws[i - 1];
                        item.name = item.raws[i - 2];
                    } else {
                        item.name = item.raws[i - 1];
                    }
                    return true;
                }
            }
            return false;
        })(this);
    }
}