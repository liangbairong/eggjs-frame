module.exports = app => {
    const { router, controller } = app;

    
    router.get('/index', controller.index.list);

    router.get('/book/list', controller.index.getBookList);

    //公众号
    router.get('/wxmp/common/login', controller.wxmp.login);
    router.get('/wxmp/user/info',controller.wxmp.getUserInfo)
    // 小程序
    router.get('/wxapp/common/login', controller.wxapp.login);
  }; 