import { useState, useEffect } from "react";

interface Book {
  id: string;
  title: string;
  author: string;
  pages: number;
  coverUrl?: string;
}

interface CardWithEditProps {
  book: Book;
  onSubmit: (data: Omit<Book, "id">) => void;
  onCancel: () => void;
}

const fetchCoverUrl = async (
  title: string,
  author: string
): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://bookcover.longitood.com/bookcover?book_title=${encodeURIComponent(
        title
      )}&author_name=${encodeURIComponent(author)}`
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data.url || null;
  } catch (error) {
    return null;
  }
};

export default function CardWithEdit({
  book,
  onSubmit,
  onCancel,
}: CardWithEditProps) {
  const [editedTitle, setEditedTitle] = useState(book.title);
  const [editedAuthor, setEditedAuthor] = useState(book.author);
  const [editedPages, setEditedPages] = useState(book.pages);
  const [coverUrl, setCoverUrl] = useState(book.coverUrl || "");

  useEffect(() => {
    async function updateCover() {
      if (editedTitle && editedAuthor) {
        const url = await fetchCoverUrl(editedTitle, editedAuthor);
        setCoverUrl(url || "");
      } else {
        setCoverUrl("");
      }
    }
    updateCover();
  }, [editedTitle, editedAuthor]);

  const handleSave = () => {
    onSubmit({
      title: editedTitle,
      author: editedAuthor,
      pages: editedPages,
      coverUrl,
    });
  };

  return (
    <div className="flex flex-row items-center justify-between bg-white/80 rounded-lg shadow p-4">
      <div className="flex flex-col gap-2 flex-1">
        <input
          type="text"
          className="border border-emerald-800 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 font-semibold bg-white/90"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          className="border border-emerald-800 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/90"
          value={editedAuthor}
          onChange={(e) => setEditedAuthor(e.target.value)}
          placeholder="Author"
        />
        <input
          type="number"
          className="border border-emerald-800 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/90"
          value={editedPages}
          onChange={(e) => setEditedPages(Number(e.target.value))}
          placeholder="Pages"
          min={1}
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-emerald-800 text-white rounded shadow hover:bg-green-600 font-bold"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-black rounded shadow hover:bg-gray-600 font-bold"
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="w-22 h-30 flex items-center justify-center bg-black rounded-md ml-4">
        <img
          className="object-contain w-full h-full rounded-md"
          src={coverUrl || "/images/placeholder.jpg"}
          alt={editedTitle}
        />
      </div>
    </div>
  );
}
