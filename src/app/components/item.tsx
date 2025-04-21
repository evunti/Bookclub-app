import { useState } from "react";
import BookForm from "./form";

interface Book {
  id: number;
  title: string;
  author: string;
  pages: number;
}

interface BookItemProps {
  book: Book;
  onDelete: () => void;
  onEdit: () => void;
  isEditing: boolean;
  onSubmit: (data: Omit<Book, "id">) => void;
  onCancel: () => void;
}

export default function BookItem({
  book,
  onDelete,
  onEdit,
  isEditing,
  onSubmit,
  onCancel,
}: BookItemProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="ItemContainer">
      {isEditing ? (
        <BookForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          initialData={{
            title: book.title,
            author: book.author,
            pages: book.pages,
          }}
        />
      ) : (
        <div>
          <div>
            <h3>{book.title}</h3>
            <div>
              <button onClick={toggleDropdown}>...</button>
              <div
                className={`dropdownContent ${
                  dropdownVisible ? "visible" : ""
                }`}
              >
                <button onClick={onEdit}>Edit</button>
                <button onClick={onDelete}>Delete</button>
              </div>
            </div>
          </div>
          <div>
            <p>{book.author}</p>
          </div>
          <div>
            <p>{book.pages}</p>
          </div>
        </div>
      )}
    </div>
  );
}
