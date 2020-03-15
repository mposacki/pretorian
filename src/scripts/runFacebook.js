'use strict';

import { Facebook } from './facebook';

const config = {
  appId: 735733686930973
};

const FB = new Facebook();

(async () => {
    await FB.init({
      appId: config.appId,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v6.0'
    });

    const data = await FB.buildSchema();
})();