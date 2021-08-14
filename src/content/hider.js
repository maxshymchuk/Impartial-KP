import * as consts from '../consts';
import { getStorageIsReviews } from '../services';
import { setBlock, updateBlockType, updateColor, updateBlur, updateActionType, updateTransition, updateReviews, getUrl } from './utils';

chrome.storage.onChanged.addListener((changes) => {
  for (let key in changes) {
    switch (key) {
      case consts.storage.BLOCK_TYPE:
        updateBlockType(changes[key].newValue);
        break;
      case consts.storage.COLOR:
        updateColor(changes[key].newValue);
        break;
      case consts.storage.BLUR:
        updateBlur(changes[key].newValue);
        break;
      case consts.storage.ACTION_TYPE:
        updateActionType(changes[key].newValue);
        break;
      case consts.storage.TRANSITION:
        updateTransition(changes[key].newValue);
        break;
      case consts.storage.IS_REVIEWS:
        updateReviews(changes[key].newValue);
      default: break;
    }
  }
});

function hider() {
  return new Promise((resolve, reject) => {
    const url = getUrl();
    const ratingTargets = Object.keys(consts.ratingQueries).reduce((acc, item) => (new RegExp(item)).test(url) ? acc.concat(consts.ratingQueries[item]) : acc, []);
    const reviewsTargets = Object.keys(consts.reviewsQueries).reduce((acc, item) => (new RegExp(item)).test(url) ? acc.concat(consts.reviewsQueries[item]) : acc, []);
    if (!ratingTargets.length && !reviewsTargets.length) reject('Elements not found');
    const observer = new MutationObserver(() => {
      const ratingBlocks = ratingTargets.length ? document.querySelectorAll(ratingTargets?.join(',')) : null;
      ratingBlocks?.forEach(async rating => {
        const isUnset = !rating.querySelector(`.${consts.BLOCK_CLASS}`);
        if (rating && isUnset) await setBlock(rating);
      });
      const reviewsBlocks = reviewsTargets.length ? document.querySelectorAll(reviewsTargets?.join(',')) : null;
      reviewsBlocks?.forEach(async review => {
        if (review) {
          const flag = await getStorageIsReviews();
          review.style.display = flag ? 'block' : 'none';
        }
      });
    });
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    resolve();
  })
}

hider().then(() => chrome.runtime.sendMessage({ from: "hider" }), err => console.log(err));
