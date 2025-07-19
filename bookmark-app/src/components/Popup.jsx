import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Popup = ({ data, setData, setPopup, addNewBookmark, categories }) => {
  const [newCategory, setNewCategory] = useState("");
  const [showNewInput, setShowNewInput] = useState(false);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-lg  rounded-lg w-96 h-auto">
      <h2 className="text-xl font-semibold text-blue-400">Add Bookmark</h2>
      <form
        className="flex flex-col justify-start mt-4 gap-2"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="border border-black p-2 rounded w-full text-black"
          required
        />
        <input
          type="url"
          placeholder="URL"
          value={data.url}
          onChange={(e) => setData({ ...data, url: e.target.value })}
          className="border border-black p-2 rounded w-full text-black"
          required
        />
        <textarea
          placeholder="Notes"
          value={data.notes}
          onChange={(e) => setData({ ...data, notes: e.target.value })}
          className="border border-black p-2 rounded w-full text-black resize-none"
        ></textarea>
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={data.tags}
          onChange={(e) => setData({ ...data, tags: e.target.value })}
          className="border border-black p-2 rounded w-full text-black"
        />
        <select
          value={data.category}
          onChange={(e) => {
            if (e.target.value === "newCustomCategory") {
              setShowNewInput(true);
            } else {
              setData({ ...data, category: e.target.value });
            }
          }}
          className="border border-black p-2 rounded w-full text-black"
        >
          <option value="">Select Category</option>
          {data.category &&
            !categories.includes(data.category) &&
            data.category !== "newCustomCategory" && (
              <option value={data.category}>{data.category}</option>
            )}
          {categories
            .filter((cat) => cat !== "All")
            .map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          <option value="newCustomCategory">+ Add New Category</option>
        </select>
        {showNewInput && (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="New category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 border border-gray-300 px-3 py-2 rounded-md text-black"
            />
            <button
              className="bg-blue-600 text-white px-3 py-2 rounded-md"
              onClick={() => {
                const trimmed = newCategory.trim();
                setData({ ...data, category: trimmed });
                setNewCategory("");
                setShowNewInput(false);
              }}
            >
              Add
            </button>
          </div>
        )}

        <button
          value="Add Bookmark"
          className="text-white p-2 rounded w-full cursor-pointer bg-blue-500 hover:bg-blue-600 "
          onClick={addNewBookmark}
        >
          Add Bookmark
        </button>
      </form>

      <button
        onClick={() => {
          setPopup(false);
          setData({
            title: "",
            url: "",
            notes: "",
            tags: "",
            category: "All",
          });
          setNewCategory("");
          setShowNewInput(false);
        }}
        className="mt-2 text-red-500 hover:bg-red-100 p-2 rounded-full absolute top-2 right-2 cursor-pointer"
      >
        <RxCross2 />
      </button>
    </div>
  );
};

export default Popup;
