const config = {
  accessToken: 'EAAKdJVkPDh0BADlgPBS0iDDBUlu4pmQ6ru5ZBCFHigdklGPPKjQPgDpRrWT77Nn944G33nmHAWNwYcY8W3oRpY8ewkjUV7u5UGPT9c89UOeMLZCaQOynDhKBpU9hN3hppvGTOqSc6KtetCXKRMSPy2ct7IMiojrqdcwuZBgggZDZD',
  appId: 735733686930973,
  pageId: 101389854814863,
  // pageId: 576662285862141,
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
  const image = document.createElement('img'),
      name = document.createElement('p'),
      headingBox = document.createElement('div');

      image.classList.add('post__image');
      name.classList.add('post__heading');
      name.textContent = 'Legion Pretorians';
      headingBox.classList.add('post__heading-box');

      headingBox.appendChild(image);
      headingBox.appendChild(name);

  FB.api(
    `/${config.pageId}/picture?access_token=${config.accessToken}`,
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
     const { width, height, url } = response.data;
     image.setAttribute('width', width);
     image.setAttribute('height', height);
     image.setAttribute('url', url);
    }
  );

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
      const translationsObject = document.querySelector('#translations-js'),
            lang = document.documentElement.lang,
            translation = translationsObject.dataset[lang],
            data = response.data;
      let posts = [];

      data.forEach(item => {
        let post = document.createElement('div'),
            postContent = document.createElement('p');
        post.classList.add('post');
        postContent.classList.add('post__content');

        if (item.story && item.message) {
          postContent = item.story + translation + item.message
        }
      })
      console.log(response);
    }
  );
}

window.fbAsyncInit = _init