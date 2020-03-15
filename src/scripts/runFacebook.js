'use strict';

import { Facebook } from './facebook';

const config = {
  accessToken: 'EAAKdJVkPDh0BAIXRa1bWk1yFCJQkz9aigTbtoI3JFfMIxHZArhuPpcvR6HdIRkwVgLZBIQJiHuSBXzWVXDbq5UVhuja1ZCkdZAUFOSRwEIoq2wOlGsFWAqPU6mQmZABaEcXEEOAWY5EwEa6vXVvyJRqTAcpZA458GxpsecnuMZBD55HZAIc8yca7',
  appId: 735733686930973,
  pageId: 101389854814863,
  userId: 2710807292372504
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
    console.log(data);
})();