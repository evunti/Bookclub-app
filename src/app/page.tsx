"use client";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";
import store from "./store";
import { addBookItem, updateBookItem, deleteBookItem } from "./itemsSlice";
import { v4 as uuidv4 } from "uuid";

import BookForm from "./components/form";

interface Book {
  id: string;
  title: string;
  author: string;
  pages: number;
  coverUrl?: string;
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
  const [coverUrls, setCoverUrls] = useState<{ [id: string]: string }>({});

  const handleFormSubmit = async (data: Omit<Book, "id">) => {
    if (editBook) {
      try {
        await fetch(`http://localhost:8000/${editBook.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data }),
        });
      } catch (error) {
        console.error("Failed to update book in DB", error);
      }
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === editBook.id ? { ...book, ...data } : book
        )
      );
      setEditBook(null);
    } else {
      // Add to DB
      let newBook: Book = { id: uuidv4(), ...data };
      try {
        const response = await fetch("http://localhost:8000/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBook),
        });
        if (response.ok) {
          const saved = await response.json();
          newBook = saved.id ? saved : newBook;
        }
      } catch (error) {
        console.error("Failed to add book to DB", error);
      }
      setBooks((prevBooks) => [...prevBooks, newBook]);
    }
    setShowBookForm(false);
  };

  const handleCancelForm = () => {
    setShowBookForm(false);
  };

  const handleDeleteBook = async (id: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    try {
      await fetch(`http://localhost:8000/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Failed to delete book from DB");
    }
  };

  const handleEditBook = (id: string) => {
    const bookToEdit = books.find((book) => book.id === id);
    if (bookToEdit) {
      setEditBook(bookToEdit);
      setShowBookForm(true);
    }
  };

  const fetchBooks = () => {
    fetch("http://localhost:8000/")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    // Find books missing coverUrl
    const booksMissingCover = books.filter((book) => !book.coverUrl);
    if (!booksMissingCover.length) return;
    (async () => {
      for (const book of booksMissingCover) {
        const url = await fetchCoverUrl(book.title, book.author);
        if (url) {
          try {
            await fetch(`http://localhost:8000/${book.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...book, coverUrl: url }),
            });
          } catch (error) {
            console.error("Failed to update book with coverUrl", error);
          }
        }
      }
      fetchBooks();
    })();
  }, [
    books
      .filter((book) => !book.coverUrl)
      .map((book) => book.id)
      .join(","),
  ]);

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
          <p> Books We've Read.</p>
          <div className="flex flex-col gap-8 w-full max-w-3xl">
            {books.map((book, id) => (
              <div
                key={book.id}
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
                  {/* comment out when not in use */}
                  <div>
                    <button
                      className="mt-2 px-2 py-1 bg-red-500 text-black rounded hover:bg-red-600 text-xs w-fit"
                      type="button"
                      onClick={() => handleDeleteBook(book.id)}
                    >
                      Delete
                    </button>
                    <span className="inline-block w-1"></span>
                    <button
                      className="mt-2 px-2 py-1 bg-gray-400 text-black rounded hover:bg-gray-600 text-xs w-fit"
                      type="button"
                      onClick={() => handleEditBook(book.id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div className="w-22 h-30 flex items-center justify-center bg-black rounded-md">
                  <img
                    className="object-contain w-full h-full "
                    src={
                      book.coverUrl ||
                      coverUrls[book.id] ||
                      "/images/placeholder.jpg"
                    }
                    alt={book.title}
                  />
                </div>
              </div>
            ))}
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
          <p id="contact"> Contact Us</p>
          <p className="text-sm">Please Don't.</p>
          <img
            className="p-2 rounded-2xl w-12 h-12 object-cover"
            src="/images/groupme.jpg"
            alt="GroupMe"
          />
        </div>
      </div>
    </div>
  );
}
