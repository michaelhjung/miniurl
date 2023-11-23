import React, { useEffect } from "react";
import {
  filterDate,
  formatTimestampWithZone,
  initializeTable,
} from "../utils/tabulator";
import { ToastContainer, toast } from "react-toastify";
import { copyToClipboard } from "../utils/clipboard";
import { deleteUrl } from "../api/urls";

export const UserUrlsTable = ({ data }) => {
  const userUrlsSelector = "user-urls-table";

  const generateUserUrlsTable = async (data) => {
    const formattedData = data.map((url) => ({
      ...url,
      formattedShortUrl: `${window.location.origin}/${url.shortUrl}`,
    }));

    const rowContextMenu = [
      {
        label: "Go to original link",
        action: async (e, row) => {
          const { originalUrl } = row.getData();
          window.open(originalUrl, "blank");
        },
      },
      {
        label: "Go to shortened link",
        action: async (e, row) => {
          const { formattedShortUrl } = row.getData();
          window.open(formattedShortUrl, "blank");
        },
      },
      {
        label: "Delete URL",
        action: async (e, row) => {
          const { id } = row.getData();
          await deleteUrl(id);
          row.delete();
          toast.success("Successfully deleted URL");
        },
      },
    ];

    const columns = [
      {
        title: "Original URL",
        field: "originalUrl",
        headerFilter: "input",
        headerFilterPlaceholder: "Search",
        cellClick: (e, cell) => {
          copyToClipboard(cell.getValue());
          toast.success("Original URL copied to clipboard!");
        },
      },
      {
        title: "Shortened URL",
        field: "formattedShortUrl",
        headerFilter: "input",
        headerFilterPlaceholder: "Search",
        cellClick: (e, cell) => {
          copyToClipboard(cell.getValue());
          toast.success("Shortened URL copied to clipboard!");
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
        title: "Created Date",
        field: "createdAt",
        formatter: (cell) => formatTimestampWithZone(cell.getValue()),
        headerFilter: "input",
        headerFilterFunc: filterDate,
        headerFilterPlaceholder: "Search",
        width: 230,
        hozAlign: "center",
      },
    ];
    const placeholder = "No URLs created yet.";
    // const initialSort = [{ column: "createdAt", dir: "desc" }];

    initializeTable(
      `.${userUrlsSelector}`,
      formattedData,
      columns,
      rowContextMenu,
      placeholder
      // initialSort
    );
  };

  useEffect(() => {
    if (!data.length) return;

    generateUserUrlsTable(data);
  }, [data]);

  return (
    <div className="user-urls-container mt-5">
      <div className={userUrlsSelector}></div>
      <ToastContainer />
    </div>
  );
};
