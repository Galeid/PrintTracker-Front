export class Utils {
  static formatDate(dateToFormat: Date): string {
    const date = new Date(dateToFormat);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const anio = date.getFullYear().toString().slice(0);
    return `${dia}/${mes}/${anio}`;
  }

  static capitalize(string: string) {
    return string && string[0].toUpperCase() + string.slice(1);
  }

  static isToday(fecha: Date) {
    return new Date(fecha).getDate() === new Date().getDate();
  }
}
