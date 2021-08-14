import * as consts from './consts';

function promisify(storage, defaultValue) {
  return new Promise(resolve => chrome.storage.sync.get(storage, value => resolve(value[storage] !== undefined ? value[storage] : defaultValue)));
}

export async function getStorageBlockType() {
  return promisify(consts.storage.BLOCK_TYPE, consts.defaults.BLOCK_TYPE);
}

export async function setStorageBlockType(blockType) {
  chrome.storage.sync.set({ [consts.storage.BLOCK_TYPE]: blockType });
}

export async function getStorageColor() {
  return promisify(consts.storage.COLOR, consts.defaults.COLOR);
}

export async function setStorageColor(color) {
  chrome.storage.sync.set({ [consts.storage.COLOR]: color });
}

export async function getStorageBlur() {
  return promisify(consts.storage.BLUR, consts.defaults.BLUR);
}

export async function setStorageBlur(blur) {
  chrome.storage.sync.set({ [consts.storage.BLUR]: blur });
}

export async function getStorageActionType() {
  return promisify(consts.storage.ACTION_TYPE, consts.defaults.ACTION_TYPE);
}

export async function setStorageActionType(actionType) {
  chrome.storage.sync.set({ [consts.storage.ACTION_TYPE]: actionType });
}

export async function getStorageTransition() {
  return promisify(consts.storage.TRANSITION, consts.defaults.TRANSITION);
}

export async function setStorageTransition(transition) {
  chrome.storage.sync.set({ [consts.storage.TRANSITION]: transition });
}

export async function getStorageIsReviews() {
  return promisify(consts.storage.IS_REVIEWS, consts.defaults.IS_REVIEWS);
}

export async function setStorageIsReviews(isReviews) {
  chrome.storage.sync.set({ [consts.storage.IS_REVIEWS]: isReviews });
}
