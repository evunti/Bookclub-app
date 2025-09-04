import { useState } from "react";

interface Book {
  id: string;
  title: string;
  author: string;
  pages: number;
}

type BookFormProps = {
  onSubmit: (data: Omit<Book, "id">) => void;
  onCancel: () => void;
  initialData?: Omit<Book, "id"> | null;
};

export default function BookForm({
  onSubmit,
  onCancel,
  initialData,
}: BookFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [pages, setPages] = useState<number>(initialData?.pages ?? 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, author, pages });
  };

  return (
    <div className="flex flex-row items-center justify-between bg-white/80 rounded-lg shadow p-2 w-full max-w-md">
      <form
        className="flex-1 flex flex-col gap-2 relative"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="mb-1 p-1 border rounded text-sm"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
          className="mb-1 p-1 border rounded text-sm"
        />
        <input
          type="number"
          value={pages === 0 ? "" : pages}
          onChange={(e) => setPages(Number(e.target.value))}
          placeholder="Pages"
          className="mb-1 p-1 border rounded text-sm w-20"
        />
        <div className="flex gap-2 mt-1 justify-end absolute right-0 bottom-0">
          <button
            type="button"
            onClick={onCancel}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-2 py-1 bg-emerald-400 text-white rounded hover:bg-emerald-500 text-sm"
          >
            {initialData ? "Update Book" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
