# Advanced Reader View Chrome Extension

A distraction-free reading experience for articles and blog posts. This Chrome extension helps you focus on the content by removing clutter and providing customizable reading settings.

## Features

- **One-Click Activation**: Toggle reader mode with a single click
- **Smart Content Detection**: Automatically identifies and extracts the main article content
- **Customizable Reading Experience**:
  - Adjustable font size
  - Multiple font family options
  - Customizable line height
  - Three theme options:
    - Light mode
    - Sepia mode
    - Dark mode
- **Clean Interface**: Removes distracting elements like ads, sidebars, and navigation menus
- **Responsive Design**: Optimized reading width and spacing
- **Real-time Updates**: Changes are applied immediately without manual refresh

## Installation

1. Clone this repository or download the ZIP file
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

## Usage

1. Click the extension icon in your Chrome toolbar
2. Use the switch to activate/deactivate the reading view
3. Customize your reading experience using the settings panel:
   - Adjust font size using the slider
   - Select your preferred font family
   - Modify line height for better readability
   - Choose between light, sepia, or dark themes

## Technical Details

- Built with vanilla JavaScript
- Uses Chrome Extension Manifest V3
- Implements Mozilla's Readability.js for content extraction
- Stores user preferences in Chrome's local storage
- Real-time settings updates without page reload

## Dependencies

- [Readability.js](https://github.com/mozilla/readability) - Mozilla's content extraction library
- Chrome Extension APIs

## Development

### Project Structure

```
advanced-reader-extension/
├── manifest.json          # Extension configuration
├── background.js         # Background service worker
├── content.js           # Content script for page modification
├── lib/
│   └── readability.js   # Mozilla's content extraction library
├── popup/
│   ├── popup.html       # Extension popup interface
│   └── popup.js         # Popup functionality
├── icons/
│   └── icon48.png       # Extension icon
└── LICENSES/
    ├── LICENSE.md       # Main license file
    ├── THIRD-PARTY.md   # Third-party licenses
    └── LICENSE-Readability.md  # Readability.js license
```

### Building from Source

1. Clone the repository:
   ```bash
   git clone https://github.com/phoenixmantis/advanced-reader-extension.git
   ```

2. Install dependencies:
   - Download Readability.js from Mozilla's repository
   - Place it in the `lib` directory

3. Load the extension in Chrome:
   - Open `chrome://extensions/`
   - Enable Developer mode
   - Click "Load unpacked"
   - Select the extension directory

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the terms specified in the [LICENSE.md](LICENSES/LICENSE.md) file.

### Third-Party Licenses

This project includes third-party software with their respective licenses:
- Readability.js is licensed under the terms specified in [LICENSE-Readability.md](LICENSES/LICENSE-Readability.md)
- For more information about third-party licenses, please see [THIRD-PARTY.md](LICENSES/THIRD-PARTY.md)

## Acknowledgments

- [Mozilla Readability](https://github.com/mozilla/readability) for the content extraction library
- Chrome Extension documentation and community

## Support

If you encounter any issues or have suggestions, please:
1. Check the [Issues](https://github.com/phoenixmantis/advanced-reader-extension/issues) page
2. Create a new issue if your problem hasn't been reported

## Version History

- 0.0.1
  - Initial release
  - Basic reader mode functionality
  - Customizable reading settings
  - Theme support
  - Real-time settings updates 