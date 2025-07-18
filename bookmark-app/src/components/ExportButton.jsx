import React, { useState } from 'react';
import exportFromJSON from "export-from-json";

const ExportButton = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const data = JSON.parse(localStorage.getItem("bookmarks")) || [];

    const handleExportJSON = () => {
        exportFromJSON({ data, fileName: "bookmarks", exportType: exportFromJSON.types.json });
    };

    const handleExportCSV = () => {
      exportFromJSON({data, fileName: "bookmarks", exportType: exportFromJSON.types.csv, fields: ["title", "url", "notes", "tags", "category"]});
    };


  return (
    <div className="relative">
    <div
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className="cursor-pointer flex items-center gap-2 p-2 bg-white text-gray-700 rounded-md hover:bg-blue-500 hover:text-white"
      >
      <p>Export Data</p>
    </div>
      {dropdownOpen && (
          <div className="absolute right-0 top-full mt-4 w-48 bg-white rounded-md p-4 flex flex-col items-center gap-2 exportbtn__popup z-10 shadow-lg">
          <button
            onClick={handleExportJSON}
            className="text-sm w-full bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 cursor-pointer"
            >
            Export as JSON
          </button>
          <button
            onClick={handleExportCSV}
            className="text-sm w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 cursor-pointer"
            >
            Export as CSV
          </button>
        </div>
      )}
    </div>
  );
}

export default ExportButton