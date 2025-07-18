import React, { useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";

const Bookmark = ({ data }) => {
    const [hovered, setHovered] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const deleteBookmark = () => {
        const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        const updatedBookmarks = bookmarks.filter(bookmark => bookmark.url !== data.url);
        localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
        window.location.reload();
    }

  return (
    <div
      className={`flex flex-col items-start justify-between p-4 bg-white text-black rounded-lg w-full h-[110px] relative`}
    >
    {!confirmDelete ?  (
    <div className='w-full' onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start">
          <a
            href={data.url}
            className="font-semibold text-lg text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Title: {data.title}
          </a>
          {data.notes && (
            <p className="font-semibold text-sm text-gray-400">
              Notes: {data.notes}
            </p>
          )}
        </div>
          <p className="font-semibold text-sm text-gray-400">{data.category}</p>
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
        <div
          className="text-red-500 p-2 rounded-full absolute bottom-0 right-0 cursor-pointer"
          onClick={() => setConfirmDelete(true)}
        >
          <MdDeleteOutline className="text-red-400" size={20} />
        </div>
      )}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center bg-white text-black rounded-lg w-full">
      <p className="text-red-500 font-semibold mb-2">Are you sure you want to delete this bookmark?</p>
      <div className="flex gap-2">
        <button
          className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={deleteBookmark}
        >
          Yes, Delete
        </button>
        <button
          className="bg-gray-400 hover:bg-gray-200 text-black px-4 py-2 rounded-md cursor-pointer"
          onClick={() => setConfirmDelete(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  )}
    </div>
  )
}

export default Bookmark