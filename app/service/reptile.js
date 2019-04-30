const Service = require('egg').Service;
const cheerio = require('cheerio')
var iconv = require('iconv-lite'); //转码 解决乱码

var md5 = require('js-md5');  //md5
// 爬虫
class ReptileService extends Service {
    // 书籍列表
    async list(page = 1) {
        const {
            ctx
        } = this
        let html = await ctx.curl('https://www.biquge5.com/shuku/6/allvisit-0-'+page+'.html', {
            headers:{
                'content-type':'text/html; charset=gbk'
            }
        });
        var change_data = iconv.decode(html.data,'gbk'); 
        var $ = cheerio.load(change_data);
        let data=[]
        let list=$(".list-group .list-group-item");
        console.log(list.length)
        list.each(function(){
            let dom=$(this).find('.row div').eq(0).find('a');
            let temp={
                book_id:md5(dom.attr('href')),
                title:dom.text(),
                href:dom.attr('href'),
                new_section:$(this).find('.row div').eq(1).find('a').text(),
                author:$(this).find('.row div').eq(2).find('a').text(),
                update_time:$(this).find('.row div').eq(3).text(),
            }
            data.push(temp)
        })
        console.log(data)

        return data
    }
    // 章节
    async section(url) {
        const {
            ctx
        } = this
        let html = await ctx.curl(url, {
            headers:{
                'content-type':'text/html; charset=gbk'
            }
        });
        var change_data = iconv.decode(html.data,'gbk'); 
        var $ = cheerio.load(change_data);
        $("#list li").each(function(){
            $(this).find('a').text();
        })
        let data={
            book_id:md5(url),
            title:$("#info").find('h1').text(),
            list:[]
        }
    }
}

module.exports = ReptileService;