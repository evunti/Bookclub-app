"use client";
import { useState } from "react";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";
import store from "./store";
import { addBookItem, updateBookItem, deleteBookItem } from "./itemsSlice";

import BookForm from "./components/form";
import BookItem from "./components/item";
import { deleteBookItem } from "./itemsSlice";

interface Book {
  id: number;
  title: string;
  author: string;
  pages: number;
  // url: string;
}
function CreateBookItem() {
  const dispatch = useDispatch<AppDispatch>();
  const BookItmes = useSelector((state: RootState) => state.books.BookItmes);

  const handleDeleteBook = (index: number) => {
    dispatch(deleteBookItem({ index }));
  };

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
            <div className=" grid mx-auto mb-[10%] grid-cols-3 ">
              <img
                className="p-2"
                src="/src/app/images/I'm glad.jpeg"
                id="book 1"
              />

              <img
                className="p-2"
                src="./images/all the lovers.jpeg"
                id="book 2"
              />
              <img className="p-2" src="./images/educated.jpeg" id="book 3" />
              <img
                className="p-2"
                src="./images/Hitchhiker's guide.jpeg"
                id="book 4"
              />
              <img className="p-2" src="./images/persuasion.jpeg" id="book 5" />
            </div>
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
}
