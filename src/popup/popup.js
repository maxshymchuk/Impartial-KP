import { 
  getStorageBlockType, 
  setStorageBlockType, 
  getStorageColor, 
  setStorageColor, 
  getStorageBlur, 
  setStorageBlur, 
  getStorageActionType, 
  setStorageActionType, 
  getStorageTransition, 
  setStorageTransition, 
  getStorageIsReviews, 
  setStorageIsReviews 
} from '../services';
import './popup.css';

function setBlockType(blockTypeSelect, index) {
  const colorItem = document.getElementById('item-color');
  const blurItem = document.getElementById('item-blur');
  if (!blockTypeSelect || !colorItem || !blurItem) return;
  blockTypeSelect.selectedIndex = index;
  if (index === 0) {
    colorItem.classList.remove('hidden');
    blurItem.classList.add('hidden');
  } else {
    colorItem.classList.add('hidden');
    blurItem.classList.remove('hidden');
  }
  setStorageBlockType(index);
}

function setColor(colorPicker, color) {
  const colorPickerLabel = document.getElementById('item-color-picker-label');
  if (!colorPicker || !colorPickerLabel) return;
  colorPicker.value = color;
  colorPickerLabel.innerText = color;
  setStorageColor(color);
}

function setBlur(blurInput, blur) {
  if (!blurInput) return;
  blurInput.value = blur;
  setStorageBlur(blur);
}

function setActionType(actionTypeSelect, index) {
  if (!actionTypeSelect) return;
  actionTypeSelect.selectedIndex = index;
  setStorageActionType(index);
}

function setTransition(transitionInput, transition) {
  if (!transitionInput) return;
  transitionInput.value = transition;
  setStorageTransition(transition);
}

function setIsReviews(reviewsCheckbox, flag) {
  if (!reviewsCheckbox) return;
  reviewsCheckbox.checked = flag;
  setStorageIsReviews(flag);
}

window.addEventListener('load', async () => {
  const reloader = document.getElementById('help-reload');
  const blockTypeSelect = document.getElementById('item-block-select');
  const colorPicker = document.getElementById('item-color-picker');
  const blurInput = document.getElementById('item-blur-input');
  const actionTypeSelect = document.getElementById('item-type-action-select');
  const transitionInput = document.getElementById('item-transition-input');
  const reviewsCheckbox = document.getElementById('item-reviews-checkbox');

  setBlockType(blockTypeSelect, await getStorageBlockType());
  setColor(colorPicker, await getStorageColor());
  setBlur(blurInput, await getStorageBlur());
  setActionType(actionTypeSelect, await getStorageActionType());
  setTransition(transitionInput, await getStorageTransition());
  setIsReviews(reviewsCheckbox, await getStorageIsReviews());

  reloader?.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
    });
  });

  blockTypeSelect?.addEventListener('change', (e) => {
    setBlockType(blockTypeSelect, e.target.selectedIndex);
  })

  colorPicker?.addEventListener('input', (e) => {
    const colorPickerLabel = document.getElementById('item-color-picker-label');
    colorPickerLabel.innerText = e.target.value.toString().toUpperCase();
  })

  colorPicker?.addEventListener('change', (e) => {
    setColor(colorPicker, e.target.value.toString().toUpperCase());
  })

  blurInput?.addEventListener('change', (e) => {
    setBlur(blurInput, parseInt(e.target.value, 10));
  })

  actionTypeSelect?.addEventListener('change', (e) => {
    setActionType(actionTypeSelect, e.target.selectedIndex);
  })

  transitionInput?.addEventListener('change', (e) => {
    setTransition(transitionInput, parseInt(e.target.value, 10));
  })
  
  reviewsCheckbox?.addEventListener('change', (e) => {
    setIsReviews(reviewsCheckbox, e.target.checked);
  })
});