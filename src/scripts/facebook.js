'use strict';
import axios from 'axios';
import feedJSON from './feed';

const config = {
  accessToken: 'EAADouq1OKuABAKqMZCg9EfDk2W8qXhmBVpzmfGTHrldMVue0Wba7UxdfNhszz8ph1sd6fnNX99b5DXwlwKnBAyu7fUOEZCzufzhYiT6IwZC9uZAdzJm8mZAwAC7iCb9LZAJmOQOrTcZBQ38HZBvIXDcUWZBvgTF8oDEwCuX3eOOXfExarbMnuSLiN',
  // accessToken: 'EAADouq1OKuABAGUHG0VpC8cM4VQRh6ggfiUTuj99pVZAO6UcmlZB2Bzer24YgsdNhujoKZCEFUdQVdLzVPYM6xwmR3pxnlnMQnxOwTKVNkXsxaAOff0raf09l2Xb0B0xCT5fUJZCh9lbx3sr7tx4H0ynZAkLdvg8DhSAk8PyDuAZDZD',
  // accessToken: 'EAAC8y0azdocBAKUZAkBcUQfNZCx3BcWpDlZCJlh4SsZCatutpKHaHSZBcdgtmarEBNZCcYOsAm8AND9HSUBlBRg6BZCj5IpYPvGZB4a73M1LGmsyE6T7WR4BEZCDwIWTskcpE2ZAt4rvNSSJDxlZBEZBS5Tfp9s1bqZBxxTf65KMfC7qkowZDZD',
  pageId: 133461083335748
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
      // const account = await this.api(
      //   `/${config.pageId}/?access_token=${config.accessToken}`,
      //   'GET'
      // );

      const name = document.createElement('p');

      name.classList.add('feed__heading');
      name.textContent = 'Fundacja Pretorians';

      resolve(name);
    });
  };

  getProfileImage = () => {
    return new Promise(async (resolve) => {
      // const profilImageData = await this.api(
      //   `/${config.pageId}/picture?&redirect=false`,
      //   'GET'
      // );

      // console.log(profilImageData.data.url);

      const image = document.createElement('img');
      //   {
      //     width,
      //     height,
      //     url
      //   } = profilImageData.data;

      image.classList.add('feed__heading-image');
      image.setAttribute('width', '50px');
      image.setAttribute('height', '50px');
      image.setAttribute('src', 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-1/cp0/p50x50/74180216_3143798862301940_1211112753779965952_n.png?_nc_cat=106&_nc_sid=dbb9e7&_nc_ohc=-dHcfoOPjh8AX8AyIs7&_nc_ht=scontent-waw1-1.xx&oh=c79f84668b52e5e1a1ae7b0674d78073&oe=5F44D150');

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
      `/${item.parent_id}`,
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
      `/${item.parent_id}`,
      'GET', {
        "fields": "id,full_picture,message,is_published,height,width,parent_id,attachments"
      });

    if (!parentPostData.hasOwnProperty('error')) {
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
        return this.getAlbum(item);
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
        return false;
        break;
    }
  };

  buildSingleFeed = (item, index) => {
    return new Promise(async (resolve) => {
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

      if (feedContent !== false) {
        feedWrapper.appendChild(feedContent);
      }

      resolve({
        element: feedWrapper,
        index
      });
    });
  };

  buildSchema = async () => {
    const newsFeed = await this.getNewsFeedList(),
          newsFeedBox = document.querySelector('.news-feed');

          const feedArray = await this.getNewsFeedDataInArray();
          // console.log(feedArray);
          // console.log(feedJSON);
          // debugger;

      if (newsFeed.hasOwnProperty('error')) {
        let arrayOfFeedWithIndex = await Promise.all(feedJSON.splice(0, 10).map((feed, index) => this.buildSingleFeed(feed, index)));

        arrayOfFeedWithIndex.sort(function (feed1, feed2) {
          return feed1.index - feed2.index;
        });

        arrayOfFeedWithIndex.map(item => {
          newsFeedBox.appendChild(item.element);
        })

        return true;
      }

      newsFeed.data.some(async (item, index) => {
        const pos = feedJSON.map(el => el.id).indexOf(item.id);

        if (pos === 0) {
          let arrayOfFeedWithIndex = await Promise.all(feedJSON.splice(0, 10).map((feed, index) => this.buildSingleFeed(feed, index)));

          arrayOfFeedWithIndex.sort(function (feed1, feed2) {
            return feed1.index - feed2.index;
          });

          arrayOfFeedWithIndex.map(item => {
            newsFeedBox.appendChild(item.element);
          })

          return true;
        } else if (pos === -1) {
          const feedArray = await this.getNewsFeedDataInArray();
          
          let arrayOfFeedWithIndex = await Promise.all(feedArray.map((feed, index) => this.buildSingleFeed(feed, index)));

          arrayOfFeedWithIndex.sort(function (feed1, feed2) {
            return feed1.index - feed2.index;
          });

          arrayOfFeedWithIndex.map(item => {
            newsFeedBox.appendChild(item.element);
          })

          return true;
        } else {
          const feedArray = await this.getNewsFeedDataInArray(pos);

          feedArray.reverse().map(item => {
            feedJSON.unshift(item);
          })

          let arrayOfFeedWithIndex = await Promise.all(feedJSON.map((feed, index) => this.buildSingleFeed(feed, index)));

          arrayOfFeedWithIndex.sort(function (feed1, feed2) {
            return feed1.index - feed2.index;
          });

          arrayOfFeedWithIndex.map(item => {
            newsFeedBox.appendChild(item.element);
          })

          //TODO Save to file
          return true;
        }
      });

    return true;
  };

  getNewsFeedDataInArray = (limit = 12) => {
    let feedArray = [];

    return new Promise(async (resolve) => {
      const newsFeed = await this.getNewsFeedList(limit);
      let newsFeedArray = await Promise.all(newsFeed.data.map((item, index) => this.getLinkedFeedData(item.id, index)));

      newsFeedArray.sort(function (feed1, feed2) {
        return feed1.id - feed2.id;
      });

      newsFeed.data.map((item, index) => {
        feedArray.push({
          ...item,
          linkedFeedData: newsFeedArray[index].linkedFeedData
        });
      });

      resolve(feedArray);
    });
  };

  getNewsFeedList = (limit = 12) => {
    return new Promise(async (resolve) => {
      const newsFeedData = await this.api(
        `/${config.pageId}/feed?limit=${limit}&access_token=${config.accessToken}`,
        'GET'
      );
      // console.log(newsFeedData);
      // debugger;

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