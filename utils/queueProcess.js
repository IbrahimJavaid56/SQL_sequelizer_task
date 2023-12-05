import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import Queue from 'bull';

const DownloadQueue = new Queue('downloadCsvFiles');


  async function downloadFile(fileName) {
    try {
      const currentModuleUrl = new URL(import.meta.url);
      const currentDir = path.dirname(currentModuleUrl.pathname);
      console.log(currentDir);
      // removing the leading backslash from currentDir
      const uploadFolderPath = path.join(currentDir.substr(1), '..', 'uploads');
      const fileUrl = path.join(uploadFolderPath, `${fileName}.csv`);
      console.log('fileUrl-->', fileUrl);
  
      const downloadFolderPath = path.join(os.homedir(), 'Downloads');
      console.log('downloadFolderPath-->', downloadFolderPath);
  
      // Check if the file exists before proceeding
      try {
        await fs.access(fileUrl, fs.constants.F_OK);
      } catch (err) {
        console.error(`File ${fileName} does not exist in the uploads folder.`);
        throw new Error(`File ${fileName} not found`);
      }
  
      const localFilePath = path.join(downloadFolderPath, `${fileName}.csv`);
  
      // Performing  actual download
      await fs.copyFile(fileUrl, localFilePath);
      console.log(`File ${fileName} has been successfully downloaded to the download folder.`);
  
      // Delete the file after successful download
      await fs.unlink(fileUrl);
      console.log('File deleted successfully');
    } catch (err) {
      console.error('Error during download process:', err);
      throw err;
    }
  }
  
  // DownloadQueue process function
  DownloadQueue.process(async (job) => {
    try {
      await downloadFile(job.data.fileName);
    } catch (err) {
      console.error(`Error processing download for file ${job.data.fileName}:`, err);
    }
  });
  
  DownloadQueue.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error: ${err.message}`);
  });
  
export { DownloadQueue };
