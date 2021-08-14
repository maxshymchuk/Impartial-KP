let loader;

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.from == "loader") {
    loader = sender.tab.id;
  }
  if (message.from == "hider"){
    chrome.tabs.sendMessage(loader, message);
  }
});
