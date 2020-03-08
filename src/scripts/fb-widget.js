const config = {
  accessToken: 'EAAKdJVkPDh0BADlgPBS0iDDBUlu4pmQ6ru5ZBCFHigdklGPPKjQPgDpRrWT77Nn944G33nmHAWNwYcY8W3oRpY8ewkjUV7u5UGPT9c89UOeMLZCaQOynDhKBpU9hN3hppvGTOqSc6KtetCXKRMSPy2ct7IMiojrqdcwuZBgggZDZD',
  appId: 735733686930973,
  pageId: 101389854814863,
  userId: 2710807292372504,
}
const _init = () => {
  FB.init({
    appId: config.appId,
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v6.0'
  });
  FB.AppEvents.logPageView();
  getNewsFeedData();
}

const getNewsFeedData = () => {
  FB.api(
    `/${config.pageId}/feed?access_token=${config.accessToken}`,
    'GET', {
      "perms": [
        "manage_pages",
        "pages_show_list",
        "public_profile"
      ],
      "user_id": config.userId,
      "app_id": config.appId
    },
    function (response) {
      console.log(response);
    }
  );
}

window.fbAsyncInit = _init