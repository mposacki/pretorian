'use strict';

import { Facebook } from './facebook';
import 'mediaCheck/js/mediaCheck-min';

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

    await FB.buildSchema();
})();