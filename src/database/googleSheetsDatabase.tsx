import { parse } from 'papaparse';
import $ from 'jquery';

const directoryKey = '2PACX-1vRUfbGxSFyI7zQs0e7n-ZckeJH3_e7niFh2SLcHFT7Z7lM_82R4Z8lbQVRNU85EKXtpJ7f-WkYT4ZFt';

export const getAllLineItems = new Promise(function(resolve, reject) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: 'https://cors-anywhere-cfb-refunder.herokuapp.com' + '/https://docs.google.com/spreadsheets/d/e/2PACX-1vRUfbGxSFyI7zQs0e7n-ZckeJH3_e7niFh2SLcHFT7Z7lM_82R4Z8lbQVRNU85EKXtpJ7f-WkYT4ZFt/pub?output=csv',
      dataType: "text",
      success: 
            function(results) {
              console.log('JQuery results: ' + results)
              var data = results.data
              resolve(data);
              console.log('JQuery data: ' + data)
            }
    });
  });
});