import { IDataItem } from "../models/IDataItem";

export const getFormatedData = (string: string | ArrayBuffer | null) => {
  if (typeof string === "string") {
    const headers = string.slice(0, string.indexOf("\r\n")).split(";");
    const contentString = string.slice(string.indexOf("\r\n") + 1);
    const rows = getContentRows(contentString);
    const temp: IDataItem[] = [];
    rows.forEach((item) => {
      const obj: IDataItem = {};
      for (let i = 0; i < item.length; i++) {
        obj.id = `${Math.random()} + ${i}`;
        obj[`${headers[i]}`] = item[i];
      }
      temp.push(obj);
    });
    return temp;
  }
};

const getContentRows = (string: string) => {
  const rowDelimiter = /(?<!;"[^"]*)\r\n(?![^"]*";)/; // find '\r\n' not standing in a substring with double quotes (negative lookbehind + negative lookahead)
  const rowItemsDelimiter = ";";
  const content = string
    .replaceAll(/(?<!\r)\n/g, "") // remove all '\n' not preceded by '\r' (negative lookbehind)
    .replaceAll(/;(?=\s+)/g, ",") // replace all ';' followed by one or more whitespaces with ',' (positive lookahead)
    .replaceAll("ü", "ü")
    .replaceAll(" %", "%")
    .replaceAll("¾", "3/4")
    .replaceAll(/\b(\w+)\u00b4(\w+)/g, "$1\u{0027}$2") // replace accute accent with apostrophe
    .replaceAll("SOL's", "SOL'S")
    .replaceAll("g/m2", "g/m²")
    .replaceAll(/(\d)\s+-\s+(\d)/g, "$1\u{2013}$2") // replace hyphen with en-dash between two digits
    .replaceAll(/(\d+)(g)([/])(m)(²)/g, "$1 $2$3$4$5")
    .replaceAll(/(g)([/])(m)(?!²)/g, "$1$2$3²")
    .replaceAll(/(\d+)(\s+)(gr)/g, "$1$2g/m²")
    .replaceAll(/(\d+)(\s+)(g)(?![/m²])/g, "$1$2g/m²")
    .replaceAll(/([(])\s+/g, "$1")
    .replaceAll(/\s+([)])/g, "$1")
    .split(rowDelimiter);

  const temp = [];
  for (let index = 0; index < content.length; index++) {
    temp.push(
      content[index]
        .replaceAll(/\s+"/g, "")
        .replaceAll(/"\s+/g, "")
        .replaceAll(/"/g, "")
        .split(rowItemsDelimiter)
    );
  }
  return temp;
};

export const createTableRow = (data: IDataItem[], object: IDataItem) => {
  const newObject: IDataItem = Object.fromEntries(
    Object.entries(object).map(([key, _]) => [key, ""])
  );
  newObject.id = `${Math.random()} + ${data.length}`;
  return newObject;
};

export const downloadCsvFile = (filename: string, data: IDataItem[]) => {
  const headers = getHeaders(data[0]);
  const rows = getRows(data);
  const csvFile = getCvsFile(headers, rows);
  const blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  if (link.download !== undefined) {
    // feature detection
    // Browsers that support HTML5 download attribute
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const getHeaders = (obj: IDataItem) => {
  return Object.keys(obj).filter((header) => header !== "id");
};

const getRows = (data: IDataItem[]) => {
  const rows: string[][] = [];
  data.forEach((obj) => {
    if (obj["id"]) delete obj["id"];
    const values: string[] = Object.values(obj).map((item: string) => {
      if (item.includes("\r\n")) {
        return '"' + item + '"';
      } else {
        return item;
      }
    });
    rows.push(values);
  });
  return rows;
};

const getCvsFile = (titles: string[], rows: string[][]) => {
  let csvFile = titles.join(";") + "\r\n";
  rows.forEach((rowArray) => {
    let row = rowArray.join(";");
    csvFile += row + "\r\n";
  });
  return csvFile;
};
