document.getElementsByTagName("html")[0].style.opacity = 0;
document.getElementsByTagName("html")[0].style.transition = 'opacity 0.3s';

chrome.runtime.onMessage.addListener((req) => {
  if (req) setTimeout(() => document.getElementsByTagName("html")[0].style.opacity = 1);
});

chrome.runtime.sendMessage({ from: "loader" });
