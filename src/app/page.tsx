"use client";
import { Provider } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";
import store from "./store";
import { addBookItem, updateBookItem, deleteBookItem } from "./itemsSlice";
import { v4 as uuidv4 } from "uuid";

import BookForm from "./components/form";
import { UserContext } from "./lib/user";

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

  const handleDeleteBook = (id: string) => {
    dispatch(deleteBookItem(id));
  };
}

export default function AddBook() {
  return (
    <Provider store={store}>
      <AddBookContent />
    </Provider>
  );
}

function AddBookContent() {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.items.allBookItems);
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [showBookForm, setShowBookForm] = useState(false);
  const [coverUrls, setCoverUrls] = useState<{ [id: string]: string }>({});
  const { isAdmin, handleLogIn } = useContext(UserContext);

  const handleFormSubmit = async (data: Omit<Book, "id">) => {
    if (editBook) {
      try {
        await fetch(`http://localhost:8000/${editBook.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data }),
        });
        dispatch(updateBookItem({ id: editBook.id, data }));
      } catch (error) {
        console.error("Failed to update book in DB", error);
      }
      setEditBook(null);
    } else {
      // Fetch coverUrl before adding new book
      let coverUrl: string | undefined = undefined;
      try {
        coverUrl = (await fetchCoverUrl(data.title, data.author)) || undefined;
      } catch (error) {
        console.error("Failed to fetch coverUrl", error);
      }
      let newBook: Book = { id: uuidv4(), ...data, coverUrl };
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
        dispatch(addBookItem(newBook));
      } catch (error) {
        console.error("Failed to add book to DB", error);
      }
    }
    setShowBookForm(false);
  };

  const handleCancelForm = () => {
    setShowBookForm(false);
  };

  const handleDeleteBook = async (id: string) => {
    dispatch(deleteBookItem(id));
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
      .then((data) => {
        dispatch({ type: "books/setBookItems", payload: data });
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

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
                  {isAdmin && (
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
                  )}
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

          {isAdmin && (
            <div className="flex gap-4 mt-4">
              <button
                className="px-4 py-2 border-b-emerald-800  rounded shadow hover:bg-green-100 "
                type="button"
                onClick={() => setShowBookForm(true)}
              >
                Add Book
              </button>
            </div>
          )}
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
