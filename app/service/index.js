// app/service/news.js
const Service = require('egg').Service;

class IndexService extends Service {
  async list(page = 1) {

    return [
        { id: 1, title: 'this is news 1', url: '/news/1' },
        { id: 2, title: 'this is news 2', url: '/news/2' }
      ]
  }
}

module.exports = IndexService;