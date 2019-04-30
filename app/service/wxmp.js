const Service = require('egg').Service;
class WxmpService extends Service {
    constructor(ctx) {
        super(ctx);
        this.accessData = ''
    }
    async login(code) {
        const {
            ctx
        } = this
        let accessData = await ctx.curl('https://api.weixin.qq.com/sns/oauth2/access_token', {
            data: {
                appid: 'wx2d9ac6b18b47fc86',
                secret: '8c5c36f2c1d651a0ff3cb6b465d5492a',
                code: code,
                grant_type: 'authorization_code'
            },
            dataType: 'json',
        });
        accessData = accessData.data
        this.accessData = accessData
        if (accessData.errcode) {
            return {}
        }


        let userInfo = await ctx.curl('https://api.weixin.qq.com/sns/userinfo', {
            data: {
                access_token: accessData.access_token,
                openid: accessData.openid,
                lang: 'zh_CN'
            },
            dataType: 'json',
        })
        return userInfo.data
    }
}

module.exports = WxmpService;