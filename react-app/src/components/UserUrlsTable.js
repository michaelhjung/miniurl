import React, { useEffect } from "react";
import {
  filterDate,
  formatTimestampWithZone,
  initializeTable,
} from "../utils/tabulator";
import { copyToClipboard } from "../utils/clipboard";

export const UserUrlsTable = ({ data }) => {
  const userUrlsSelector = "user-urls-table";

  const generateUserUrlsTable = async (data) => {
    const formattedData = data.map((url) => ({
      ...url,
      formattedShortUrl: `${window.location.origin}/${url.shortUrl}`,
    }));

    const columns = [
      {
        title: "Original URL",
        field: "originalUrl",
        headerFilter: "input",
        headerFilterPlaceholder: "Search",
      },
      {
        title: "Shortened URL",
        field: "formattedShortUrl",
        headerFilter: "input",
        headerFilterPlaceholder: "Search",
        cellClick: (e, cell) => {
          copyToClipboard(cell.getValue());
        },
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

    initializeTable(
      formattedData,
      columns,
      `.${userUrlsSelector}`,
      placeholder
    );
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
