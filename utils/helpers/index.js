import { useMessage } from "naive-ui";
const message = useMessage();

export const formatCurrency = (number) => {
    if(!number) return 0;
    if(typeof +number !== 'number') return 0;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    return formatter.format(number);
  }



  export function timeFormatter(value) {
    if (!value || value === '' || (typeof value !== 'string')) return "--";
    
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return "--";
    
    const [_, year, month, day] = match;
    return `${day}/${month}/${year}`;
  }

  export function setMaxText (text, max) {
    if (!text) return "";
    if (text.length > max) {
      return `${text.substring(0, max)}...`;
    }
    return text;
  }