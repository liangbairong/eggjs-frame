exports.keys = 'sdjjjsjjdsdjsjdjsjdjkskd'

// 添加 view 配置
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};

exports.cors = {
  origin: ['*'],
}

exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: '193.112.217.5',
    // 端口号
    port: '3308',
    // 用户名
    user: 'root',
    // 密码
    password: 'ROOTSHSHjsjj192ssc..?',
    // 数据库名
    database: 'dome',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};


module.middleware = ['errorHandler'];
module.errorHandler = {
  match: '/',
}

// 报错处理
exports.onerror = {
  errorPageUrl: (err, ctx) => ctx.errorPageUrl || '/500',
  json: (err, ctx) => {
    ctx.body = {
      errcode: err.status,
      errinfo: err.message
    }
  }
};

// an accept detect function that mark all request with `x-requested-with=XMLHttpRequest` header accepts json.
function accepts(ctx) {
  if (ctx.get('x-requested-with') === 'XMLHttpRequest') return 'json';
  return 'html';
}