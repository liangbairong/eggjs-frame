const Service = require('egg').Service;
class WxappService extends Service {
    constructor(ctx) {
        super(ctx);

    }
    async login(code, user_info) {
        const {
            ctx
        } = this
        if (!user_info) {
            return 'userInfo为空'
        }
        let accessData = await ctx.curl('https://api.weixin.qq.com/sns/jscode2session', {
            data: {
                appid: 'wx66d1535c033b5d45',
                secret: '58d6862ded6be9a3c85c4ed608ef0861',
                js_code: code,
                grant_type: 'authorization_code',

            },
            dataType: 'json',
        });
        accessData = accessData.data
        if (accessData.openid) {
            user_info = JSON.parse(user_info)
            let my = await ctx.app.mysql.get('user', {
                openid: accessData.openid
            })
            console.log(my)
            if (my) {
                 // 更新
                 const row = {
                    openid: accessData.openid,
                    session_key:accessData.session_key,
                    nickname: user_info.nickName,
                    headimgurl: user_info.avatarUrl
                };

                const options = {
                    where: {
                        openid: accessData.openid
                    }
                };
                const upResult = await ctx.app.mysql.update('user', row, options); // 更新 posts 表中的记录
                // 更新失败
                if (upResult.affectedRows !== 1) {
                    return '数据库储存失败'
                }
               
            } else {
                // 插入数据库
                const inResult = await ctx.app.mysql.insert('user', {
                    // user_id: accessData.openid,
                    openid: accessData.openid,
                    session_key:accessData.session_key,
                    nickname: user_info.nickName,
                    headimgurl: user_info.avatarUrl,

                }); 
                // 插入失败
                if (inResult.affectedRows !== 1) {
                    return '数据库储存失败1'
                }
            }
        }


        return accessData
    }
}

module.exports = WxappService;