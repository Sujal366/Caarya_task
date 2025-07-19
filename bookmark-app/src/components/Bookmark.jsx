import React, { useState } from 'react'
import { MdDeleteOutline, MdOutlineBookmark } from "react-icons/md";

const Bookmark = ({ data, bookmarks, setBookmarks, viewModes }) => {
    const [hovered, setHovered] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [showViewMenu, setShowViewMenu] = useState(false);

    const deleteBookmark = () => {
        const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        const updatedBookmarks = bookmarks.filter(bookmark => bookmark.url !== data.url);
        localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
        window.location.reload();
    }

  return (
    <div
      className={`flex flex-col items-start justify-between p-4 bg-white text-black rounded-lg w-full relative`}
    >
      {!confirmDelete ? (
        <div
          className="w-full"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col items-start">
              <a
                href={data.url}
                className="font-semibold text-lg text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.title}
              </a>
              {data.notes && (
                <p className="font-semibold text-sm text-gray-400">
                  Notes: {data.notes}
                </p>
              )}
            </div>
            <p className="font-semibold text-sm text-gray-400">
              {data.category}
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-wrap gap-1 mt-2 text-xs text-gray-600">
              {data.tags.map((tag, idx) => (
                <span key={idx} className="bg-gray-200 px-2 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          {hovered && (
            <div className="flex items-center gap-2 absolute bottom-2 right-2">
              <div
                className="relative"
                onMouseEnter={() => setShowViewMenu(true)}
                onMouseLeave={() => setShowViewMenu(false)}
              >
                <MdOutlineBookmark
                  className="text-blue-400 rounded-full cursor-pointer"
                  size={20}
                />
                {showViewMenu && (
                  <div className="absolute right-0 top-full w-27 bg-white rounded-md p-2 shadow-lg flex flex-col items-start z-10 border border-gray-300">
                    {viewModes.map((mode, index) => (
                      <p
                        key={index}
                        className={`cursor-pointer hover:bg-gray-200 w-full text-start p-2 rounded-md ${
                          data.status === mode ? "bg-gray-200" : ""
                        }`}
                        onClick={() => {
                          const updated = { ...data, status: mode };
                          const updatedBookmarks = bookmarks.map((b) =>
                            b.url === data.url ? updated : b
                          );
                          localStorage.setItem(
                            "bookmarks",
                            JSON.stringify(updatedBookmarks)
                          );
                          setBookmarks(updatedBookmarks);
                        }}
                      >
                        {mode.charAt(0).toUpperCase() + mode.slice(1).replace("-", " ")}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <MdDeleteOutline
                className="text-red-400 rounded-full cursor-pointer"
                size={20}
                onClick={() => setConfirmDelete(true)}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-white text-black rounded-lg w-full">
          <p className="text-red-500 font-semibold mb-2">
            Are you sure you want to delete this bookmark?
          </p>
          <div className="flex gap-2">
            <button
              className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-md cursor-pointer text-sm"
              onClick={deleteBookmark}
            >
              Yes, Delete
            </button>
            <button
              className="bg-gray-400 hover:bg-gray-200 text-black px-4 py-2 rounded-md cursor-pointer text-sm"
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookmark