import { parse } from 'papaparse';

const directoryKey = '2PACX-1vRUfbGxSFyI7zQs0e7n-ZckeJH3_e7niFh2SLcHFT7Z7lM_82R4Z8lbQVRNU85EKXtpJ7f-WkYT4ZFt';

export const getAllLineItems = new Promise(function(resolve, reject) {
  parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vRB4E_6RnpLP1wWMjqcwsUvotNATB8Np3OntlXb7066ULcAHI9oqqRhucltFifPTYNd7DRNRE56oTdt/pub?output=csv', {
            download: true,
            header: true,
            complete: function(results) {
              var data = results.data
              resolve(data);
              console.log(data)
            }
          });
});