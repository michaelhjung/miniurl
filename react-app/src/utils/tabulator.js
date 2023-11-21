// import { Tabulator } from "tabulator-tables";
import { TabulatorFull } from "tabulator-tables";

export const initializeTable = (data, columns, selector, placeholder) => {
  const table = new TabulatorFull(selector, {
    data: data,
    columns: columns,
    layout: "fitColumns",
    resizableColumnFit: true,
    placeholder: placeholder,
  });
  return table;
};

// FORMATTERS:
export const formatShortUrl = (
  cell,
  formatterParams,
  onRendered,
  customTokenValue = null
) => {
  const baseUrl = window.location.origin;
  const token = cell?.getValue() || customTokenValue;
  return `${baseUrl}/${token}`;
};

// Example: Fri, Oct 13, 2023 2:32 PM (PST)
export const formatTimestampWithZone = (timestamp) => {
  const options = {
    // weekday: "short", // options: long, short, narrow
    year: "numeric", // options: numeric, 2-digit
    month: "short", // options: numeric, 2-digit, long, short, narrow
    day: "numeric", // options: numeric, 2-digit
    hour: "numeric", // options: numeric, 2-digit
    minute: "numeric", // options: numeric, 2-digit
    timeZoneName: "short", // options: short, long
  };
  const dateObj = new Date(timestamp);
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formatted = formatter.format(dateObj);

  return formatted;
};

// FILTERS:
export const filterShortUrl = (
  headerValue,
  rowValue,
  rowData,
  filterParams
) => {
  const formatted = formatShortUrl(null, null, null, rowValue);
  return formatted.toLowerCase().includes(headerValue.toLowerCase());
};

export const filterDate = (headerValue, rowValue, rowData, filterParams) => {
  const formattedDate = formatTimestampWithZone(rowValue);
  return formattedDate.toLowerCase().includes(headerValue.toLowerCase());
};
