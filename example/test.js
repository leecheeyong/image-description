import { exec } from 'child_process';

// This script executes a command to run a Node.js application
// that processes images in a specified directory and outputs results to a CSV file.
// Images in the './images' directory must be compressed to a smaller size before running the script.
// Use JpegOptimizer e.g jpegoptim --size=100k *.JPG
// description.csv will have the output of the processed images.

exec('node ../index.js --dir ./images --output description.csv -w 5000', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error output: ${stderr}`);
    return;
  }
  console.log(`${stdout.trim()}`);
});

