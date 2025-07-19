import { useEffect, useState } from "react";
import "./App.css";
import Bookmark from "./components/Bookmark";
import Popup from "./components/Popup";
import { GoSearch } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import ExportButton from "./components/ExportButton";
import Fuse from "fuse.js";

function App() {
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [bookmarks, setBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("active");
  
  const categories = [
    ...new Set(bookmarks.map((b) => b.category).filter(Boolean)),
  ];

  const fuseOptions = {
    keys: ["title", "notes", "tags"],
    threshold: 0.4,
  };

  const fuse = new Fuse(bookmarks, fuseOptions);

  const filteredBookmarks = (() => {
    let results = bookmarks;

    if (searchQuery.trim()) {
      results = fuse.search(searchQuery).map((result) => result.item);
    }

    results = results.filter((b) =>
      selectedCategory === "All" ? true : b.category === selectedCategory
    );

    return results.filter((b) => (b.status || "active") === viewMode);
  })();


  const addNewBookmark = () => {
    const bookmarkData = localStorage.getItem("bookmarks");
    let bookmarks = bookmarkData ? JSON.parse(bookmarkData) : [];
    bookmarks.push({
      title: data.title,
      url: data.url,
      notes: data.notes ? data.notes : "",
      tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
      category: data.category,
      status: "active",
    });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    
    setData({});
    setPopup(false);
  };

  useEffect(() => {
    const stored = localStorage.getItem("bookmarks");
    if (stored) {
      setBookmarks(JSON.parse(stored));
    }
  }, [popup]);

  return (
    <section className="flex flex-col items-center justify-start w-full h-screen">
      {/* // Header Section */}
      <div className="flex items-center justify-between w-full border-b-2 border-gray-200 p-4">
        <h1 className="text-4xl font-bold text-blue-400">Bookmark App</h1>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 border p-2 rounded">
            <GoSearch className="text-gray-500" size={20} />
            <input
              type="search"
              placeholder="Search..."
              className="outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 justify-center mb-4">
            {["active", "read-later", "archived"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded-md capitalize ${
                  viewMode === mode ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {mode.replace("-", " ")}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPopup(true)}
            className="flex items-center bg-blue-500 text-white p-2 rounded cursor-pointer"
          >
            <FaPlus className="inline mr-1" size={20} />
            Add Link
          </button>
          <ExportButton />
        </div>
      </div>

      {/* Category Buttons */}
      <div className="flex gap-2 flex-wrap justify-center my-4">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1 rounded-md text-gray-600 cursor-pointer ${
              selectedCategory === cat
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* // Bookmark List Section */}
      <div className="w-full max-w-4xl px-4 grid gap-4">
        {searchQuery && (
          <p className="text-center text-sm text-gray-500 mb-2">
            Showing results for: <strong>{searchQuery}</strong>
          </p>
        )}
        {filteredBookmarks.length === 0 ? (
          <p className="text-center text-gray-500">No bookmarks found.</p>
        ) : (
          filteredBookmarks.map((bookmark, index) => (
            <Bookmark
              key={index}
              data={bookmark}
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
            />
          ))
        )}
      </div>

      {/* // Popup Section */}
      {popup && (
        <Popup
          data={data}
          setData={setData}
          setPopup={setPopup}
          addNewBookmark={addNewBookmark}
          categories={categories}
        />
      )}
    </section>
  );
}

export default App;
