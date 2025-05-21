"use client";
import { useState } from "react";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";
import store from "./store";
import { addBookItem, updateBookItem, deleteBookItem } from "./itemsSlice";

import BookForm from "./components/form";

interface Book {
  id: number;
  title: string;
  author: string;
  pages: number;
  // url: string;
}
function CreateBookItem() {
  const dispatch = useDispatch<AppDispatch>();
  const BookItmes = useSelector((state: RootState) => state.items.allBookItems);

  const handleDeleteBook = (index: number) => {
    dispatch(deleteBookItem(index));
  };
}

export default function AddBook() {
  const [books, setBooks] = useState<Book[]>([]);
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [showBookForm, setShowBookForm] = useState(false);

  const handleFormSubmit = (data: Omit<Book, "id">) => {
    if (editBook) {
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === editBook.id ? { ...book, ...data } : book
        )
      );
      setEditBook(null);
    } else {
      const newBook: Book = { id: Date.now(), ...data };
      setBooks((prevBooks) => [...prevBooks, newBook]);
    }
    setShowBookForm(false);
  };

  const handleCancelForm = () => {
    setShowBookForm(false);
  };

  const handleDeleteBook = (id: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const handleEditBook = (id: number) => {
    const bookToEdit = books.find((book) => book.id === id);
    if (bookToEdit) {
      setEditBook(bookToEdit);
      setShowBookForm(true);
    }
  };

  return (
    <div>
      <div>
        <title>Book Club</title>
      </div>
      <div>
        <div
          id="hero"
          className="flex flex-col max-w-full p-[25%] items-center bg-[length:100%] h-auto"
        >
          <div className="flex flex-col items-center opacity-100">
            <p className="font-bold text-xl">Girls Book Club</p>
            <p>We meet monthly.</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-10 mb-20 text-xl mt-20">
          <p>Some Books We've Read.</p>
          {/* Book list with info and image side by side */}
          <div className="flex flex-col gap-8 w-full max-w-3xl">
            {[
              {
                title: "I'm Glad My Mom Died",
                author: "Jennette McCurdy",
                pages: 320,
                image: "/src/app/images/I'm glad.jpeg",
              },
              {
                title: "All the Lovers in the Night",
                author: "Mieko Kawakami",
                pages: 224,
                image: "/src/app/images/all the lovers.jpeg",
              },
              {
                title: "Educated",
                author: "Tara Westover",
                pages: 352,
                image: "/src/app/images/educated.jpeg",
              },
              {
                title: "The Hitchhiker's Guide to the Galaxy",
                author: "Douglas Adams",
                pages: 224,
                image: "/src/app/images/Hitchhiker's guide.jpeg",
              },
              {
                title: "Persuasion",
                author: "Jane Austen",
                pages: 279,
                image: "/src/app/images/persuasion.jpeg",
              },
            ].map((book, idx) => (
              <div
                key={idx}
                className="flex flex-row items-center justify-between bg-white/80 rounded-lg shadow p-4"
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{book.title}</span>
                  <span className="text-sm text-gray-600">
                    by {book.author}
                  </span>
                  <span className="text-xs text-gray-500">
                    {book.pages} pages
                  </span>
                </div>
                <img
                  className="w-24 h-32 object-cover rounded-md ml-6"
                  src={book.image}
                  alt={book.title}
                />
              </div>
            ))}
          </div>
          {/* End book list */}
          <button
            className=""
            type="button"
            onClick={() => setShowBookForm(true)}
          >
            Add Book
          </button>

          {showBookForm && (
            <BookForm
              onSubmit={handleFormSubmit}
              onCancel={handleCancelForm}
              initialData={editBook}
            />
          )}
        </div>
        <div className="flex flex-col items-center">
          <p>Contact Us</p>
          <p className="text-sm">Please Don't.</p>
          <img className="p-2" src=".src/app/images/groupme.jpg" />
        </div>
      </div>
    </div>
  );
}
