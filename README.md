# image-description
Uses third-party API to give description to images and output as CSV

## Notes
- The image recognition API used is from [DocsBot.ai](https://docsbot.ai).
- No API key is required but may face IP rate limiting.
- Delay between requests is set to 15 second to avoid rate limiting.
- The output CSV file will contain the image filename and its description.

## Usage
1. Place your images in the `images` directory.
2. Edit the `index.js` file to set the correct path for your , and the output csv filename.
3. Run the script using Node.js:
   ```bash
   node index.js
   ```
4. The output will be saved in the specified CSV file.

## Requirements
- Node.js installed on your machine.
- Images in the `images` directory must be in a supported format (e.g., JPG, PNG).
- Images in the `images` directory must be compressed to reduce size.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.