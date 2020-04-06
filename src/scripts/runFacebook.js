'use strict';

import { Facebook } from './facebook';
import 'mediaCheck/js/mediaCheck-min';

const config = {
  // appId: 255888469142240
  appId: 207581250549383
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