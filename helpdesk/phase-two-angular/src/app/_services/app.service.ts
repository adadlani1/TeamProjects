import {Injectable} from '@angular/core';

@Injectable()
export class AppService {

  DownloadFile(data, filename = 'data', headerList) {
    const csvData = this.ConvertToCSV(data, headerList);
    console.log(csvData);
    // an immutable blob is called
    const blob = new Blob(['\ufeff' + csvData], {type: 'text/csv;charset=utf-8;'});
    const downloadLink = document.createElement('a');
    const url = URL.createObjectURL(blob);

    downloadLink.setAttribute('href', url);
    downloadLink.setAttribute('download', filename + '.csv');
    downloadLink.style.visibility = 'hidden';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  // takes in the data from json and the headers of the data
  ConvertToCSV(objArray, headerList) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';
    for (const index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (const index in headerList) {
        const head = headerList[index];
        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }
}
