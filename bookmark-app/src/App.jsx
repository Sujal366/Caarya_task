import { useEffect, useState } from "react";
import "./App.css";
import Bookmark from "./components/Bookmark";
import Popup from "./components/Popup";
import { GoSearch } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import ExportButton from "./components/ExportButton";
import Fuse from "fuse.js";

function App() {
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [bookmarks, setBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("active");
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  
  const categories = [
    ...new Set(bookmarks.map((b) => b.category).filter(Boolean)),
  ];

  const fuseOptions = {
    keys: ["title", "notes", "tags"],
    threshold: 0.4,
  };

  const fuse = new Fuse(bookmarks, fuseOptions);

  const viewModes = ["active", "read-later", "archived"];

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
    if (!data.title || !data.url) {
      alert("Title and URL are required fields.");
      return;
    }
    const bookmarkData = localStorage.getItem("bookmarks");
    let bookmarks = bookmarkData ? JSON.parse(bookmarkData) : [];
    bookmarks.push({
      title: data.title,
      url: data.url,
      notes: data.notes ? data.notes : "",
      tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
      category: data.category ? data.category : "All",
      status: "active",
    });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    
    setBookmarks(bookmarks);
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
    <section className="flex flex-col items-center justify-start w-full h-screen p-2 sm:p-8">
      {/* // Header Section */}
      <div className="flex items-center justify-around sm:justify-between w-full border-b-2 border-gray-200 p-2">
        <h1 className="lg:text-4xl md:text-2xl text-md font-bold text-blue-400 text-start w-auto">
          Bookmark App
        </h1>
        <div className="flex items-center justify-end gap-2 md:gap-4 w-auto">
          <div className="flex items-center gap-2 w-1/4 sm:w-1/2 md:w-[200px] lg:w-[300px] border p-2 rounded">
            <GoSearch className="text-gray-500" />
            <input
              type="search"
              placeholder="Search..."
              className="outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              const nextIndex =
                (viewModes.indexOf(viewMode) + 1) % viewModes.length;
              setViewMode(viewModes[nextIndex]);
            }}
            className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md cursor-pointer"
          >
            {viewMode.charAt(0).toUpperCase() +
              viewMode.slice(1).replace("-", " ")}
          </button>

          <button
            onClick={() => setPopup(true)}
            className="flex items-center bg-blue-500 text-sm text-white p-2 rounded cursor-pointer hidden md:block"
          >
            <FaPlus className="inline mr-1" />
            Add Link
          </button>
          <ExportButton className="hidden md:block" />

          {/* Side Menu Button */}
          <div className="relative md:hidden">
            <IoMenu
              className="text-gray-500 text-2xl"
              onClick={() => setSideMenuOpen(!sideMenuOpen)}
            />
            {sideMenuOpen && (
              <div className="absolute flex flex-col gap-1 top-full right-1/2 bg-white shadow-lg rounded p-1 w-fit z-10">
                <button
                  onClick={() => setPopup(true)}
                  className="flex items-center bg-blue-500 text-xs text-white p-2 rounded cursor-pointer"
                >
                  <FaPlus className="inline mr-1" />
                  Add Link
                </button>
                <ExportButton className="md:hidden" />
              </div>
            )}
          </div>
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
              viewModes={viewModes}
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
