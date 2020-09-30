import { parse } from 'papaparse';

export const getAllLineItems = new Promise(function(resolve, reject) {
    parse('https://cors-anywhere-cfb-refunder.herokuapp.com' + '/https://docs.google.com/spreadsheets/d/e/2PACX-1vRUfbGxSFyI7zQs0e7n-ZckeJH3_e7niFh2SLcHFT7Z7lM_82R4Z8lbQVRNU85EKXtpJ7f-WkYT4ZFt/pub?output=csv', {
              download: true,
              header: true,
              complete: function(results) {
                var data = results.data
                resolve(data);
              }
    });
}); 