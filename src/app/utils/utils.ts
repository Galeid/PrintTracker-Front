import * as FileSaver from 'file-saver';

export class Utils {
  static formatDate(dateToFormat: Date): string {
    const date = new Date(dateToFormat);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const anio = date.getFullYear().toString().slice(0);
    return `${dia}/${mes}/${anio}`;
  }

  static sameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  static capitalize(string: string) {
    let toCapitalize = string.toLowerCase();
    return (
      toCapitalize && toCapitalize[0].toUpperCase() + toCapitalize.slice(1)
    );
  }

  static isToday(fecha: Date) {
    return new Date(fecha).getDate() === new Date().getDate();
  }

  static isUnlockedDate(date: Date) {
    const item = localStorage.getItem('lockDate');
    if (!item) return false;
    const lockDate = new Date(+item);
    return new Date(date).getTime() > lockDate.getTime();
  }

  static exportExcel(dataToExport: any[], name: string) {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(dataToExport);
      const workbook = {
        Sheets: { data: worksheet },
        SheetNames: ['data'],
      };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, name);
    });
  }

  static saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
