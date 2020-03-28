import "@babel/polyfill";

import homeSliderObject from './homeSlider';
import galleryObject from './gallery';
import './playersSlider';
import './runFacebook';
import './smoothScroll';
import './formHandling';
import Navi from './navigation';
import loadMore from './_loadMore';
import fixedMenu from './fixedMenu';

Navi._init();
homeSliderObject._init();
galleryObject._init();
fixedMenu._init();
loadMore._init();