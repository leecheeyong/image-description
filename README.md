# image-description
Uses third-party API to give description to images and output as CSV

<a href="https://npmjs.com/loh"><img src="https://badge.fury.io/js/loh.svg"></a>

## Notes
- The image recognition API used is from [DocsBot.ai](https://docsbot.ai).
- No API key is required but may face IP rate limiting.
- Delay between requests is set to 15 second to avoid rate limiting.
- The output CSV file will contain the image filename and its description.

## Usage
1. Install the npm package 
   ```bash
   npm install -g image-description
   yarn global add image-description
   npx image-description
   ```
2. Place your images in a directory (folder).
3. An example command for analyzing images in the `images` folder and save the output description in `descriptions.csv`:
   ```bash
   image-description -d ./images -o descriptions.csv
   ```
4. The output will be saved in the specified CSV file.

## Requirements
- Node.js installed on your machine.
- Images in the `images` directory must be in a supported format (e.g., JPG, PNG).
- Images in the `images` directory must be compressed to reduce size.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.