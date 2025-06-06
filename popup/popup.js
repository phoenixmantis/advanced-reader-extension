// popup.js

// DOM elements
const elements = {
  readerMode: document.getElementById('readerMode'),
  fontSize: document.getElementById('fontSize'),
  fontFamily: document.getElementById('fontFamily'),
  lineHeight: document.getElementById('lineHeight'),
  lightTheme: document.getElementById('lightTheme'),
  sepiaTheme: document.getElementById('sepiaTheme'),
  darkTheme: document.getElementById('darkTheme'),
  refreshView: document.getElementById('refreshView')
};

// Theme settings
const THEMES = {
  light: {
    bgColor: '#ffffff',
    textColor: '#000000'
  },
  sepia: {
    bgColor: '#f4ecd8',
    textColor: '#5b4636'
  },
  dark: {
    bgColor: '#1a1a1a',
    textColor: '#ffffff'
  }
};

// Toggle reader mode
function toggleReaderMode() {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.storage.local.get(['isReaderModeActive'], (result) => {
      const newState = !result.isReaderModeActive;
      chrome.storage.local.set({ isReaderModeActive: newState }, () => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'toggleReaderMode',
          isActive: newState
        });
      });
    });
  });
}

// Refresh reader view
function refreshReaderView() {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.storage.local.get(['isReaderModeActive'], (result) => {
      if (!result.isReaderModeActive) {
        console.log('Reader mode is not active, activating first...');
        chrome.storage.local.set({ isReaderModeActive: true }, () => {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'toggleReaderMode',
            isActive: true
          });
        });
      } else {
        console.log('Refreshing reader view...');
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'refreshView'
        }, (response) => {
          if (chrome.runtime.lastError) {
            console.error('Error refreshing view:', chrome.runtime.lastError);
          } else {
            console.log('Refresh response:', response);
          }
        });
      }
    });
  });
}

// Update settings
function updateSettings(newSettings) {
  chrome.storage.local.get(['readerSettings'], (result) => {
    const currentSettings = result.readerSettings || {};
    const updatedSettings = { ...currentSettings, ...newSettings };
    
    chrome.storage.local.set({ readerSettings: updatedSettings }, () => {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'updateSettings',
          settings: updatedSettings
        });
      });
    });
  });
}

// Event listeners
elements.readerMode.addEventListener('change', toggleReaderMode);
elements.refreshView.addEventListener('click', refreshReaderView);

elements.fontSize.addEventListener('change', (e) => {
  updateSettings({ fontSize: parseInt(e.target.value) });
});

elements.fontFamily.addEventListener('change', (e) => {
  updateSettings({ fontFamily: e.target.value });
});

elements.lineHeight.addEventListener('change', (e) => {
  updateSettings({ lineHeight: parseFloat(e.target.value) });
});

elements.lightTheme.addEventListener('click', () => {
  updateSettings(THEMES.light);
});

elements.sepiaTheme.addEventListener('click', () => {
  updateSettings(THEMES.sepia);
});

elements.darkTheme.addEventListener('click', () => {
  updateSettings(THEMES.dark);
});

// Load current settings
chrome.storage.local.get(['readerSettings', 'isReaderModeActive'], (result) => {
  const settings = result.readerSettings || {};
  
  elements.fontSize.value = settings.fontSize || 18;
  elements.fontFamily.value = settings.fontFamily || 'Georgia, serif';
  elements.lineHeight.value = settings.lineHeight || 1.6;
  elements.readerMode.checked = result.isReaderModeActive || false;
});
