import * as ItemParser from './ItemParser';

export class ItemContent {
    readonly baseUrl: string = 'http://gametsg.techbang.com/poe/';
    src: ItemParser.ItemContent;
    itemNo: string;
    constructor(public item: ItemParser.ItemContent) {
        this.src = item;
    }
    getViewUrl(): string{
        return this.baseUrl + 'index.php?view=item&item=' + this.itemNo;
    }
    parseItemNo(): boolean {
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
            success: function (data: string) {
                //console.log(resp);
                var doc = $(data);
                var itemHref = doc.find('#table_ a.color18.mid1').first();
                var href = itemHref.attr('href');
                var itemUrl = sender.baseUrl + href;
                var aParser = (url): HTMLAnchorElement => {
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
                    if(k == 'item'){
                        sender.itemNo = v;
                        isSuccess = true;
                        break;
                    }
                }
            }
        });
        return isSuccess;
    }
    fetchView(success: (view: JQuery<HTMLElement>) => void): void{
        var sender = this;
        if(!sender.itemNo)
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
            success: function (data: string) {
                var doc = $(data);
                var itemDiv = doc.find('#poe_ui_item');
                console.log(itemDiv);
                success(itemDiv);
            }
        });
    }
}