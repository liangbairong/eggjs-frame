exports.login = async ctx => {
   let data= await ctx.service.wxmp.login(ctx.query.code)
    ctx.body = {
        errcode:0,
        data:data
    }

};

exports.getUserInfo = async ctx=> {
    const user = await ctx.app.mysql.select('user');
    ctx.body = {
      errcode: 0,
      data: user
    }
  }