import { parse } from 'papaparse';
import { ResolveFunc, RejectFunc, Database } from './DatabaseInterface';

// The key from the CFB hosted sheet, not yet published to the web though
// const key = '1uU_XuPUYlJbjhW13rBK_gOVdgc32u6iv-PbkJvZ-g3g';
// The key from the same dataset, hosted on Bryce's Google Account, published to the web
const personal_key = '2PACX-1vRUfbGxSFyI7zQs0e7n-ZckeJH3_e7niFh2SLcHFT7Z7lM_82R4Z8lbQVRNU85EKXtpJ7f-WkYT4ZFt';

export class GoogleSheetsDatabase extends Database {
  dbDownloadExecutor(resolve: ResolveFunc, reject: RejectFunc): void {
    // Use papaparse's parse function to structure the sheets data into an array of objects
    // Go through a CORS-anywhere proxy (https://github.com/asg017/cors-anywhere-observable/)
    parse('https://cors-anywhere-cfb-refunder.herokuapp.com/https://docs.google.com/spreadsheets/d/e/' + personal_key + '/pub?output=csv', {
      download: true,
      header: true,
      complete: function (results) {
        var data = results.data
        resolve(data);
      }
    });
  }
}

export { GoogleSheetsDatabase as MainDatabase };