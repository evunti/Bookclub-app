import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";
import store from "./store";
import { addBookItem, updateBookItem, deleteBookItem } from "./itemsSlice";

interface Book {
  id: number;
  title: string;
  author: string;
  pages: number;
}
type TaskFormProps = {
  onSubmit: (data: Omit<Book, "id">) => void;
  onCancel: () => void;
  initialData?: Omit<Book, "id"> | null;
};

export default function BookForm({
  onSubmit,
  onCancel,
  initialData,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState<number>(0);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAuthor(initialData.author || "");
      setPages(initialData.pages || Number);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { title, author, pages };
    onSubmit(formData);
  };
  return (
    <div>
      <form
        className="w-[600px] h-[300px] flex rounded-[10px] shadow-xl bg-gradient-to-r from-emarld-100 to-white border border-emarld-300"
        onSubmit={handleSubmit}
      >
        <div className="w-1/2 p-6 flex flex-col justify-between border-r border-emerald-400 bg-emerald-200 rounded-l-[10px]">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />

            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author"
              required
            />
          </div>
          <div>
            <input
              type="number"
              value={pages}
              onChange={(e) => setPages(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="w-1/2 p-6 flex flex-col justify-between bg-white rounded-r-[10px]">
          <button
            className=" flex justify-end"
            type="button"
            onClick={onCancel}
          >
            X
          </button>
          <button type="submit" onClick={() => dispatch(addBookItem())}>
            {initialData ? "Update Book" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
