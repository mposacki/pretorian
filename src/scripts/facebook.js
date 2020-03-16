'use strict';

const config = {
  accessToken: 'EAAKdJVkPDh0BAIXRa1bWk1yFCJQkz9aigTbtoI3JFfMIxHZArhuPpcvR6HdIRkwVgLZBIQJiHuSBXzWVXDbq5UVhuja1ZCkdZAUFOSRwEIoq2wOlGsFWAqPU6mQmZABaEcXEEOAWY5EwEa6vXVvyJRqTAcpZA458GxpsecnuMZBD55HZAIc8yca7',
  pageId: 101389854814863,
  userId: 2710807292372504
};

export class Facebook {
  getScript = () => {
    return new Promise((resolve) => {
      if (window.FB) {
        resolve(window.FB);
      }

      const id = 'facebook-jssdk';
      const fjs = document.querySelectorAll('script')[0];
      if (document.getElementById(id)) {
        return;
      }

      const js = document.createElement('script');
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';

      js.addEventListener('load', () => {
        Object.assign(this, {
          AppEvents: window.FB.AppEvents,
          Canvas: window.FB.Canvas,
          Event: window.FB.Event,
          Frictionless: window.FB.Frictionless,
          XFBML: window.FB.XFBML,
        });

        resolve(window.FB);
      });

      fjs.parentNode.insertBefore(js, fjs);
    });
  }

  init = (params = {}) => {
    return new Promise(async (resolve) => {
      const FB = await this.getScript();
      FB.init(params);

      resolve(FB);
    });
  }

  api = (...params) => {
    return new Promise(async (resolve) => {
      const FB = await this.getScript();

      const callback = (response) => {
        resolve(response);
      };

      if (params.length > 3) {
        params = params.slice(0, 3);
      }

      params.push(callback);

      FB.api(...params);
    });
  }

  getNameElement = () => {
    return new Promise(async (resolve) => {
      const profileNameData = await this.api(
        `/${config.userId}/accounts?access_token=${config.accessToken}`,
        'GET'
      );

      const account = profileNameData.data[0],
            name = document.createElement('p');

      name.classList.add('feed__heading');
      name.textContent = account.name;

      resolve(name);
    });
  };

  getProfileImage = () => {
    return new Promise(async (resolve) => {
      const profilImageData = await this.api(
        `/${config.pageId}/picture?&redirect=false`,
        'GET'
      );

      const image = document.createElement('img'),
        {
          width,
          height,
          url
        } = profilImageData.data;

      image.classList.add('feed__image');
      image.setAttribute('width', width);
      image.setAttribute('height', height);
      image.setAttribute('src', url);

      resolve(image);
    });
  };

  getDate = (date) => {
    if (date !== '') {
      let timeArray = date.split('T'),
        dateFormat = timeArray[0].split('-').reverse().join('.'),
        timeFormat = timeArray[1].split('+')[0];
      return `${dateFormat} ${timeFormat}`;
    } else {
      return '';
    }
  };

  //Content of feed (post and shared post)
  getPost = (item) => {
    const feedMessage = document.createElement('p');
    feedMessage.classList.add('feed__message');
    feedMessage.textContent = item.message;

    return feedMessage;
  };

  getPostShared = async (item) => {
    const parentPostData = await this.api(
      `/${item.parent_id}?access_token=${config.accessToken}`,
      'GET', {
        "fields": "id,full_picture,message,is_published,height,width,parent_id,attachments"
      });

      const postSharedContent = document.createElement('div'),
            postSharedContentMessage = document.createElement('p'),
            headingBox = await this.buildHeadingBox(item);

      postSharedContent.classList.add('feed__content');
      postSharedContentMessage.classList.add('feed__content-message');
      postSharedContentMessage.textContent = parentPostData.message;

      postSharedContent.appendChild(headingBox);
      postSharedContent.appendChild(postSharedContentMessage);

      return postSharedContent;
  };

  //Content of feed (post and shared post)

  buildHeadingBox = async (item) => {
    const headingBox = document.createElement('div'),
          feedTime = document.createElement('p'),
          headingBoxContent = document.createElement('div');
    const profileImage = await this.getProfileImage();
    const profileName = await this.getNameElement();

    if (item.story && (item.story.indexOf('zaktualizował(a)') !== -1 || item.story.indexOf('dodał(a)') !== -1)) {
      profileName.textContent = item.story;
    }

    if (item.hasOwnProperty('created_time')) {
      feedTime.textContent = this.getDate(item.created_time);
    } else {
      feedTime.textContent = '';
    }

    feedTime.classList.add('feed__time');
    headingBox.classList.add('feed__heading-box');
    headingBoxContent.classList.add('feed__heading-box-content');

    headingBox.appendChild(profileImage);
    headingBoxContent.appendChild(profileName);
    headingBoxContent.appendChild(feedTime);

    headingBox.appendChild(headingBoxContent);

    return headingBox;
  };

  checkFeedContentType = async (item) => {
    if (!item.hasOwnProperty('attachments') && item.parent_id) {
      return await this.getPostShared(item);
    }

    // switch (item.attachments.data[0].type) {
    //   case 'album':
    //     return item.parent_id ? await getAlbumShared(item) : getAlbum(item);
    //     break;
    //   case 'event':
    //     return item.message ? await getEventShared(item) : getEvent(item);
    //     break;
    //   case 'photo':
    //     return item.parent_id ? await getPhotoShared(item) : getPhoto(item);
    //     break;
    //   case 'cover_photo':
    //     return item.parent_id ? await getCoverPhotoShared(item) : getCoverPhoto(item);
    //     break;
    //   case 'profile_media':
    //     return item.parent_id ? await getProfileMediaShared(item) : getProfileMedia(item);
    //     break;
    //   case 'video_autoplay':
    //     return item.parent_id ? await getVideoShared(item) : getVideo(item);
    //     break;
    // }

    return false;
  };

  buildSingleFeed = async (item) => {
    const feedWrapper = document.createElement('div'),
          headingBox = await this.buildHeadingBox(item),
          feedContent = await this.checkFeedContentType(item.linkedFeedData);
    feedWrapper.classList.add('feed');
    feedWrapper.appendChild(headingBox);

    if (item.message) {
      const feedMessage = document.createElement('p');
      feedMessage.classList.add('feed__message');
      feedMessage.textContent = item.message;
      feedWrapper.appendChild(feedMessage);
    }
    
    if(feedContent !== false) {
      feedWrapper.appendChild(feedContent);
    }

    return feedWrapper;
  };

  buildSchema = async () => {
    const feedArray = await this.getNewsFeedDataInArray(),
          newsFeedBox = document.querySelector('.news-feed');
    console.log(feedArray);
    feedArray.map(async (feed, index) => {
      if (feed.linkedFeedData.is_published) {
        let feedElement = await this.buildSingleFeed(feed, index);
        newsFeedBox.appendChild(feedElement);
      }
    });

    return true;
  };

  getNewsFeedDataInArray = () => {
    let feedArray = [];

    return new Promise(async (resolve) => {
      const newsFeed = await this.getNewsFeedList();

      let newsFeedArray = await Promise.all(newsFeed.data.map((item, index) => this.getLinkedFeedData(item.id, index)));

      newsFeedArray.sort(function (feed1, feed2) {
        return feed1.id - feed2.id;
      });

      newsFeed.data.map((item, index) => {
        feedArray.push({
          ...item,
          linkedFeedData: newsFeedArray[index].linkedFeedData
        });
      })

      resolve(feedArray);
    });
  };

  getNewsFeedList = () => {
    return new Promise(async (resolve) => {
      const newsFeedData = await this.api(
        `/${config.pageId}/feed?access_token=${config.accessToken}`,
        'GET'
      );

      resolve(newsFeedData);
    });
  };

  getLinkedFeedData = (id, index) => {
    return new Promise(async (resolve) => {
      const linkedFeedData = await this.api(
        `/${id}?access_token=${config.accessToken}`,
        'GET', {
          "fields": "id,full_picture,message,is_published,height,width,parent_id,attachments"
        });

      resolve({
        linkedFeedData,
        id: index
      });
    });
  };
}