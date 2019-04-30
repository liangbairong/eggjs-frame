// app/controller/news.js
const Controller = require('egg').Controller;

class IndexController extends Controller {
  async list() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const newsList = await ctx.service.index.list(page);
    await ctx.render('index.tpl', { list: newsList });
  }
  
  async getBookList(){
    const ctx = this.ctx;
    const list = await ctx.service.reptile.list(2);
    ctx.body=list
  }
}

module.exports = IndexController;

