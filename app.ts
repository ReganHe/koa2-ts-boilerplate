import 'reflect-metadata'; // this shim is required
import { createKoaServer, useContainer as routingUseContainer } from 'routing-controllers';
import { useContainer as ormUseContainer, createConnection } from 'typeorm';
import { Container } from 'typedi';

import currentUserChecker from './app/helpers/currentUserChecker';
import authorizationChecker from './app/helpers/authorizationChecker';

// 使用立即执行匿名函数（IIFE）简化入口
(async () => {
  try {
    // config ioc container
    routingUseContainer(Container);
    ormUseContainer(Container);
    // synchronize all db models
    await createConnection();
    // create koa server
    const app = createKoaServer({
      authorizationChecker,
      currentUserChecker,
      controllers: [__dirname + '/app/apis/*.js'],
      middlewares: [__dirname + '/lib/middlewares/*.js'],
      defaultErrorHandler: true,
    });
    // start listen
    const nodeEnv = process.env.NODE_ENV || 'development';
    const port = process.env.PORT || 4001;
    app.listen(port, () => console.log('server started， port ' + port + ' env ' + nodeEnv));
  } catch (error) {
    console.log('Error: ', error);
  }

})();
