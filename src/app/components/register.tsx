import { useState } from "react";
import UserForm from "./userform";

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

interface UserProps {
  user: User;
  onDelete: () => void;
  onEdit: () => void;
  isEditing: boolean;
  onSubmit: (data: Omit<User, "id">) => void;
  onCancel: () => void;
}

export default function User({
  user,
  onDelete,
  onEdit,
  isEditing,
  onSubmit,
  onCancel,
  children,
}: UserProps & { children?: React.ReactNode }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="UserContainer">
      {isEditing ? (
        <>
          {children}
          <UserForm
            onSubmit={onSubmit}
            onCancel={onCancel}
            initialData={{
              username: user.username,
              email: user.email,
              password: user.password,
            }}
          />
        </>
      ) : (
        <div>
          <div>
            <h3>{user.username}</h3>
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
            <p>{user.email}</p>
          </div>
        </div>
      )}
    </div>
  );
}
