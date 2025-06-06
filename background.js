const DEFAULT_SETTINGS = {
  fontSize: 18,
  fontFamily: 'Georgia, serif',
  lineHeight: 1.6,
  bgColor: '#f4ecd8',
  textColor: '#000',
  maxWidth: '800px',
  margin: '40px auto'
};


chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    readerSettings: DEFAULT_SETTINGS,
    isReaderModeActive: false
  });
});


chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get(['isReaderModeActive'], (result) => {
    const newState = !result.isReaderModeActive;
    chrome.storage.local.set({ isReaderModeActive: newState }, () => {
      chrome.tabs.sendMessage(tab.id, {
        action: 'toggleReaderMode',
        isActive: newState
      });
    });
  });
}); 