import * as consts from '../consts';
import { getStorageActionType, getStorageBlockType, getStorageBlur, getStorageColor, getStorageTransition } from '../services';

function transition(delay) {
  return `opacity ${delay}ms, visibility ${delay}ms`;
}

function blur(radius) {
  return `blur(${radius}px)`;
}

export function getUrl() {
  const protocol = `${window.location.protocol}//`;
  const href = window.location.href.replace('www.', '');
  return href.slice(protocol.length);
}

export function updateBlockType(newValue) {
  const allBlocks = document.querySelectorAll(`.${consts.BLOCK_CLASS}`);
  allBlocks.forEach(async item => {
    if (newValue === consts.defaults.BLOCK_TYPE) {
      item.style.backgroundColor = await getStorageColor();
      item.style.backdropFilter = `unset`;
    } else {
      item.style.backdropFilter = blur(await getStorageBlur());
      item.style.backgroundColor = 'unset';
    }
  });
}

export function updateColor(newValue) {
  const allBlocks = document.querySelectorAll(`.${consts.BLOCK_CLASS}`);
  allBlocks.forEach(item => item.style.backgroundColor = newValue);
}

export function updateBlur(newValue) {
  const allBlocks = document.querySelectorAll(`.${consts.BLOCK_CLASS}`);
  allBlocks.forEach(item => item.style.backdropFilter = blur(newValue));
}

export function updateActionType(newValue) {
  const allBlocks = document.querySelectorAll(`.${consts.BLOCK_CLASS}`);
  allBlocks.forEach(item => item.dataset.action = newValue);
}

export function updateTransition(newValue) {
  const allBlocks = document.querySelectorAll(`.${consts.BLOCK_CLASS}`);
  allBlocks.forEach(item => item.style.transition = transition(newValue));
}

export function updateReviews(flag) {
  const url = getUrl();
  const queries = Object.keys(consts.reviewsQueries).reduce((acc, item) => (new RegExp(item)).test(url) ? acc.concat(consts.reviewsQueries[item]) : acc, []);
  queries?.forEach(query => {
    const element = document.querySelector(query);
    if (element) element.dataset.review = flag;
  });
}

function createBlock(element, bounds) {
  const BORDER_SIZE = 2;
  const BORDER_RADIUS = 2;

  const block = document.createElement('div');
  block.setAttribute('class', consts.BLOCK_CLASS);
  block.style.position = 'absolute';
  block.style.top = `${-BORDER_SIZE}px`;
  block.style.left = `${-BORDER_SIZE}px`;
  block.style.overflow = 'hidden';
  block.style.borderRadius = `${BORDER_RADIUS}px`;
  block.style.width = `${bounds.width + BORDER_SIZE * 2}px`;
  block.style.height = `${bounds.height + BORDER_SIZE * 2}px`;

  element.addEventListener('mouseenter', () => {
    if (+block.dataset.action === consts.defaults.ACTION_TYPE) {
      block.style.opacity = 0;
      block.style.visibility = 'hidden';
    }
  });
  element.addEventListener('mouseleave', () => {
    block.style.opacity = 1;
    block.style.visibility = 'visible';
  });
  block.addEventListener('click', (e) => {
    if (+block.dataset.action === consts.defaults.ACTION_TYPE) {
      if (block.style.visibility !== 'hidden') return;
      e.preventDefault();
    } else {
      e.preventDefault();
      block.style.opacity = 0;
      block.style.visibility = 'hidden';
    }
  });

  getStorageBlockType().then(async blockType => {
    if (blockType === consts.defaults.BLOCK_TYPE) {
      block.style.backgroundColor = await getStorageColor();
    } else {
      block.style.backdropFilter = blur(await getStorageBlur());
    }
  })

  getStorageTransition().then(delay => {
    block.style.transition = transition(delay);
  })

  getStorageActionType().then(actionType => {
    block.dataset.action = actionType;
  })

  return block;
}

export async function setBlock(element) {
  return new Promise((resolve) => {
    const bounds = element.getBoundingClientRect();
    const block = createBlock(element, bounds);
    const style = window.getComputedStyle(element);
    if (!style.position || style.position === 'static') {
      element.style.position = 'relative';
    }
    if (element.innerHTML) element.append(block);
    setTimeout(() => resolve());
  })
}
