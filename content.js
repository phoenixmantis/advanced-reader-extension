// Default settings
const DEFAULT_SETTINGS = {
  fontSize: 18,
  fontFamily: 'Georgia, serif',
  lineHeight: 1.6,
  bgColor: '#f4ecd8',
  textColor: '#000',
  maxWidth: '800px',
  margin: '40px auto'
};

// Activate reader mode
function activateReaderMode() {
  console.log('Activating reader mode...');
  const documentClone = document.cloneNode(true);
  const article = new Readability(documentClone).parse();

  if (!article) {
    console.error('Content could not be analyzed');
    return;
  }

  chrome.storage.local.get(['readerSettings'], (result) => {
    const settings = result.readerSettings || DEFAULT_SETTINGS;
    console.log('Applying settings:', settings);
    
    const readerView = createReaderView(article, settings);
    const style = createStyles(settings);

    document.body.innerHTML = '';
    document.head.appendChild(style);
    document.body.appendChild(readerView);
    console.log('Reader mode activated successfully');
  });
}

// Create reader view container
function createReaderView(article, settings) {
  const readerView = document.createElement('div');
  readerView.id = 'reader-view';
  readerView.innerHTML = `
    <div class="reader-header">
      <h1>${article.title}</h1>
      ${article.byline ? `<div class="byline">${article.byline}</div>` : ''}
    </div>
    <div class="reader-content">${article.content}</div>
  `;
  return readerView;
}

// Create style element
function createStyles(settings) {
  const style = document.createElement('style');
  style.textContent = `
    body {
      background: ${settings.bgColor};
      color: ${settings.textColor};
      font-size: ${settings.fontSize}px;
      font-family: ${settings.fontFamily};
      line-height: ${settings.lineHeight};
      margin: 0;
      padding: 20px;
    }
    #reader-view {
      max-width: ${settings.maxWidth};
      margin: ${settings.margin};
      padding: 20px;
    }
    .reader-header {
      margin-bottom: 2em;
    }
    .reader-header h1 {
      font-size: 2em;
      margin-bottom: 0.5em;
    }
    .byline {
      color: #666;
      font-style: italic;
    }
    .reader-content {
      font-size: 1.1em;
    }
    .reader-content img {
      max-width: 100%;
      height: auto;
    }
  `;
  return style;
}

// Initialize on page load
chrome.storage.local.get(['isReaderModeActive'], (result) => {
  if (result.isReaderModeActive) {
    activateReaderMode();
  }
});

// Message listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message:', request);
  
  if (request.action === 'toggleReaderMode') {
    console.log('Toggling reader mode:', request.isActive);
    if (request.isActive) {
      activateReaderMode();
    } else {
      window.location.reload();
    }
    sendResponse({success: true});
  } else if (request.action === 'updateSettings') {
    console.log('Updating settings');
    activateReaderMode();
    sendResponse({success: true});
  } else if (request.action === 'refreshView') {
    console.log('Refreshing view');
    activateReaderMode();
    sendResponse({success: true});
  }
  
  return true; // Keep the message channel open for async response
});
