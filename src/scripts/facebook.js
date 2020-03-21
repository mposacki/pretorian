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

      if (!parentPostData.hasOwnProperty('error')) {
        const postSharedContent = document.createElement('div'),
          postSharedContentMessage = document.createElement('p'),
          headingBox = await this.buildHeadingBox(item);

        postSharedContent.classList.add('feed__content');
        postSharedContentMessage.classList.add('feed__content-message');
        postSharedContentMessage.textContent = parentPostData.message;

        postSharedContent.appendChild(headingBox);
        postSharedContent.appendChild(postSharedContentMessage);

        return postSharedContent;
      } else {
        return false;
      }
  };

  //Content of feed (album and shared album)
  getAlbum = (item) => {
    const feedImageBox = document.createElement('div'),
          feedMainImage = document.createElement('img'),
          imageNumber = document.createElement('span'),
          albumLength = item.attachments.data[0].subattachments.data.length;

    feedImageBox.classList.add('feed__image-box');

    feedMainImage.classList.add('feed__image');
    feedMainImage.setAttribute('src', item.attachments.data[0].subattachments.data[0].media.image.src);
    feedImageBox.appendChild(feedMainImage);

    imageNumber.classList.add('feed__counter');
    imageNumber.textContent = `+${albumLength - 1}`;
    feedImageBox.appendChild(imageNumber);

    return feedImageBox;
  }

  getAlbumShared = async (item) => {
    const parentPostData = await this.api(
      `/${item.parent_id}?access_token=${config.accessToken}`,
      'GET', {
        "fields": "id,full_picture,message,is_published,height,width,parent_id,attachments"
      });

    const feedContent = document.createElement('div'),
          album = this.getAlbum(parentPostData),
          headingBox = await this.buildHeadingBox(item),
          parentMessage = document.createElement('p');

    feedContent.classList.add('feed__content');
    feedContent.appendChild(album);
    feedContent.appendChild(headingBox);

    parentMessage.classList.add('feed__content-message');
    if(parentPostData.hasOwnProperty('error')) {
      parentMessage.textContent = item.attachments.data[0].title;
    } else {
      parentMessage.textContent = parentPostData.message;
    }
    feedContent.appendChild(parentMessage);

    return feedContent;
  }

  //Content of feed (event and shared event)
  getEvent = (item) => {
    const feedContent = document.createElement('div'),
          feedMainImage = document.createElement('img'),
          eventName = document.createElement('p');

    feedContent.classList.add('feed__content');

    feedMainImage.classList.add('feed__image');
    feedMainImage.setAttribute('src', item.attachments.data[0].media.image.src);
    feedContent.appendChild(feedMainImage);

    eventName.classList.add('feed__event-name');
    eventName.textContent = item.attachments.data[0].title;
    feedContent.appendChild(eventName);

    return feedContent;
  }

  //Content of feed (photo and shared photo)
  getPhoto = (item) => {
    const image = document.createElement('img');

    image.classList.add('feed__image');
    image.setAttribute('src', item.attachments.data[0].media.image.src);

    return image;
  }

  //Content of feed (cover photo and shared cover photo)
  getCoverPhotoShared = (item) => {
    const image = this.getPhoto(item),
          feedContent = document.createElement('div'),
          description = document.createElement('p');

    feedContent.classList.add('feed__content');
    description.classList.add('feed__content-message');
    description.textContent = item.attachments.data[0].title;
    feedContent.appendChild(image);
    feedContent.appendChild(description);

    return feedContent;
  }

  //Content of feed (profile media and shared profile media)
  getProfileMedia = (item) => {
    const image = document.createElement('img');

    image.classList.add('feed__image');
    image.classList.add('feed__image--profile');
    image.setAttribute('src', item.attachments.data[0].media.image.src);

    return image;
  }

  //Content of feed (profile media and shared profile media)
  getVideo = (item) => {
    const video = document.createElement('video');

    video.classList.add('feed__video');
    video.setAttribute('src', item.attachments.data[0].media.source);
    video.setAttribute('controls', "controls");

    return video;
  }

  getVideoShared = async (item) => {
    const parentPostData = await this.api(
      `/${item.parent_id}?access_token=${config.accessToken}`,
      'GET', {
        "fields": "id,full_picture,message,is_published,height,width,parent_id,attachments"
      });

    if(!parentPostData.hasOwnProperty('error')) {
      const feedContent = document.createElement('div'),
        video = this.getVideo(item),
        parentMessage = document.createElement('p');

      feedContent.classList.add('feed__content');
      feedContent.appendChild(video);

      parentMessage.classList.add('feed__content-message');
      parentMessage.textContent = parentPostData.message;
      feedContent.appendChild(parentMessage);

      return feedContent;
    } else {
      return false;
    }
  }

  buildHeadingBox = async (item) => {
    const headingBox = document.createElement('div'),
          feedTime = document.createElement('p'),
          headingBoxContent = document.createElement('div');
    const profileImage = await this.getProfileImage();
    const profileName = await this.getNameElement();

    if (item.story) {
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
    if (!item.hasOwnProperty('attachments')) {
      return item.parent_id ? await this.getPostShared(item) : false;
    }

    switch (item.attachments.data[0].type) {
      case 'album':
        return item.hasOwnProperty('parent_id') ? await this.getAlbumShared(item) : this.getAlbum(item);
        break;
      case 'event':
        return this.getEvent(item);
        break;
      case 'photo':
        return this.getPhoto(item);
        break;
      case 'cover_photo':
        return item.hasOwnProperty('parent_id') ? this.getCoverPhotoShared(item) : this.getPhoto(item);
        break;
      case 'profile_media':
        return this.getProfileMedia(item);
        break;
      case 'video_autoplay':
        return item.hasOwnProperty('parent_id') ? await this.getVideoShared(item) : this.getVideo(item);
        break;
      default:
        console.log(item);
        return false;
        break;
    }
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