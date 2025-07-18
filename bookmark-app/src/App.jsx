import { useEffect, useState } from "react";
import "./App.css";
import Bookmark from "./components/Bookmark";
import Popup from "./components/Popup";
import { GoSearch } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";

function App() {
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [bookmarks, setBookmarks] = useState([]);
  
  const [categories, setCategories] = useState(["Work", "Personal"]);


  const filteredBookmarks =
    selectedCategory === "All"
      ? bookmarks
      : bookmarks.filter((b) => b.category === selectedCategory);


  const addNewBookmark = () => {
    const bookmarkData = localStorage.getItem("bookmarks");
    let bookmarks = bookmarkData ? JSON.parse(bookmarkData) : [];
    bookmarks.push({
      title: data.title,
      url: data.url,
      notes: data.notes ? data.notes : "",
      tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
      category: data.category,
    });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    setBookmarks(bookmarks);
    if (data.category && !categories.includes(data.category)) {
      setCategories((prev) => [...prev, data.category]);
    }
    setData({});
    setPopup(false);
  };

  useEffect(() => {
    const stored = localStorage.getItem("bookmarks");
    if (stored) {
      setBookmarks(JSON.parse(stored));
    }
  }, [popup]); // re-run when popup closes (after adding)

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
            />
          </div>
          <button
            onClick={() => setPopup(true)}
            className="flex items-center bg-blue-500 text-white p-2 rounded cursor-pointer"
          >
            <FaPlus className="inline mr-1" size={20} />
            Add Link
          </button>
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
        {filteredBookmarks.length === 0 ? (
          <p className="text-center text-gray-500">No bookmarks found.</p>
        ) : (
          filteredBookmarks.map((bookmark, index) => (
            <Bookmark key={index} data={bookmark} />
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
          setCategories={setCategories}
        />
      )}
    </section>
  );
}

export default App;
