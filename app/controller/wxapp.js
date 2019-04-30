exports.login = async ctx => {
    
    let data= await ctx.service.wxapp.login(ctx.query.code,ctx.query.user_info)
     ctx.body = {
         errcode:0,
         data:data
     }
 
 };

 exports.getUserInfo = async ctx=> {
    const user = await ctx.app.mysql.get('user');
    ctx.body = {
      errcode: 0,
      data: user
    }
  }
 
