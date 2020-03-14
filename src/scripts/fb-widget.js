const config = {
  accessToken: 'EAAKdJVkPDh0BAIXRa1bWk1yFCJQkz9aigTbtoI3JFfMIxHZArhuPpcvR6HdIRkwVgLZBIQJiHuSBXzWVXDbq5UVhuja1ZCkdZAUFOSRwEIoq2wOlGsFWAqPU6mQmZABaEcXEEOAWY5EwEa6vXVvyJRqTAcpZA458GxpsecnuMZBD55HZAIc8yca7',
  appId: 735733686930973,
  pageId: 101389854814863,
  userId: 2710807292372504
};

const _init = () => {
  FB.init({
    appId: config.appId,
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v6.0'
  });
  FB.AppEvents.logPageView();
  getNewsFeedData();
};

const getNameElement = () => {
  const name = document.createElement('p');
  name.classList.add('post__heading');
  FB.api(
    `/${config.userId}/accounts?access_token=${config.accessToken}`,
    'GET',
    function (response) {
      const account = response.data[0]
      name.textContent = account.name;
    }
  );

  return name;
};

const getEventById = (id) => {
  return FB.api(
    `/${config.pageId}/events?access_token=${config.accessToken}`,
    'GET',
    function (response) {
      return response.data.map(item => item.id === id)
    }
  );
};

const getProfileImage = () => {
  const image = document.createElement('img');
  image.classList.add('post__image');

  FB.api(
    `/${config.pageId}/picture?&redirect=false`,
    'GET',
    function (response) {
      const {
        width,
        height,
        url
      } = response.data;
      image.setAttribute('width', width);
      image.setAttribute('height', height);
      image.setAttribute('url', url);
    }
  );

  return image;
};

const createSignature = () => {
  const headingBox = document.createElement('div')
  newsFeedBox = document.querySelector('.news-feed');
  headingBox.classList.add('post__heading-box');

  headingBox.appendChild(getProfileImage());
  headingBox.appendChild(getNameElement());
  newsFeedBox.appendChild(headingBox);
};

const getNewsFeedData = () => {
  createSignature();

  // FB.api(
  //   `/${config.pageId}/feed?access_token=${config.accessToken}`,
  //   'GET',
  //   function (response) {
  //     const translationsObject = document.querySelector('#translations-js'),
  //           lang = document.documentElement.lang,
  //           translation = translationsObject.dataset[lang],
  //           data = response.data;
  //     let posts = [];

  //     data.forEach(item => {
  //       let post = document.createElement('div'),
  //           postContent = document.createElement('p');
  //       post.classList.add('post');
  //       postContent.classList.add('post__content');

  //       if (item.story && item.message) {
  //         postContent = item.story + translation + item.message
  //       }
  //     })
  //     console.log(response);
  //   }
  // );
};

window.fbAsyncInit = _init