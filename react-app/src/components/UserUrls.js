import React, { useEffect } from "react";
import {
  filterDate,
  filterShortUrl,
  formatShortUrl,
  formatTimestampWithZone,
  initializeTable,
} from "../utils/tabulator";

export const UserUrls = ({ data }) => {
  const userUrlsSelector = "user-urls-table";

  const generateUserUrlsTable = async (data) => {
    const deepCopyData = JSON.parse(JSON.stringify(data));
    const columns = [
      {
        title: "Original URL",
        field: "originalUrl",
        headerFilter: "input",
        headerFilterPlaceholder: "Search",
      },
      {
        title: "Shortened URL",
        field: "shortUrl",
        formatter: formatShortUrl,
        headerFilter: "input",
        headerFilterFunc: filterShortUrl,
        headerFilterPlaceholder: "Search",
      },
      {
        title: "Hits",
        field: "hits",
        headerFilter: "number",
        headerFilterPlaceholder: "Search",
        width: 90,
        hozAlign: "center",
      },
      {
        title: "Created At",
        field: "createdAt",
        formatter: (cell) => formatTimestampWithZone(cell.getValue()),
        headerFilter: "input",
        headerFilterFunc: filterDate,
        headerFilterPlaceholder: "Search",
        width: 230,
        hozAlign: "center",
      },
      {
        title: "Updated At",
        field: "updatedAt",
        formatter: (cell) => formatTimestampWithZone(cell.getValue()),
        headerFilter: "input",
        headerFilterFunc: filterDate,
        headerFilterPlaceholder: "Search",
        width: 230,
        hozAlign: "center",
      },
    ];
    const placeholder = "No URLs created yet.";

    initializeTable(deepCopyData, columns, `.${userUrlsSelector}`, placeholder);
  };

  useEffect(() => {
    if (!data.length) return;

    generateUserUrlsTable(data);
  }, [data]);

  return (
    <div className="user-urls-container mt-5">
      <div className={userUrlsSelector}></div>
    </div>
  );
};
