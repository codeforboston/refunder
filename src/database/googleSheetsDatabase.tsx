import { parse } from 'papaparse';

const key = '1uU_XuPUYlJbjhW13rBK_gOVdgc32u6iv-PbkJvZ-g3g';
const personal_key = '2PACX-1vRUfbGxSFyI7zQs0e7n-ZckeJH3_e7niFh2SLcHFT7Z7lM_82R4Z8lbQVRNU85EKXtpJ7f-WkYT4ZFt';

export const getAllLineItems = new Promise(function(resolve, reject) {
    parse('https://cors-anywhere-cfb-refunder.herokuapp.com/' + 'https://docs.google.com/spreadsheets/d/e/' + personal_key + '/pub?output=csv', {
              download: true,
              header: true,
              complete: function(results) {
                var data = results.data
                resolve(data);
              }
    });
}); 