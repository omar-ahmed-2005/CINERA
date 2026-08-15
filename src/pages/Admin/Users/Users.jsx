import React, { useEffect, useMemo, useState } from "react";

import {
  Search,
  Users as UsersIcon,
  User,
  Trash2,
  ShieldCheck,
} from "lucide-react";

import "./Users.css";

const USERS_KEY = "cineraUsers";
const CURRENT_USER_KEY = "cineraUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // ==============================
  // LOAD USERS
  // ==============================

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    try {
      const savedUsers =
        localStorage.getItem(USERS_KEY);

      if (savedUsers) {
        const parsedUsers =
          JSON.parse(savedUsers);

        if (Array.isArray(parsedUsers)) {
          setUsers(parsedUsers);
          return;
        }
      }

      // لو مفيش cineraUsers
      // نشوف المستخدم الحالي

      const currentUser =
        localStorage.getItem(
          CURRENT_USER_KEY
        );

      if (currentUser) {
        try {
          const parsedUser =
            JSON.parse(currentUser);

          setUsers([parsedUser]);
        } catch {
          setUsers([]);
        }
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error(
        "Failed to load users:",
        error
      );

      setUsers([]);
    }
  };

  // ==============================
  // DELETE USER
  // ==============================

  const handleDelete = (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${
        user.name || "this user"
      }?`
    );

    if (!confirmed) {
      return;
    }

    const updatedUsers =
      users.filter(
        (item) =>
          item.email !== user.email
      );

    setUsers(updatedUsers);

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(updatedUsers)
    );
  };

  // ==============================
  // SEARCH
  // ==============================

  const filteredUsers = useMemo(() => {
    const value =
      search.toLowerCase().trim();

    if (!value) {
      return users;
    }

    return users.filter((user) => {
      const name =
        user.name || "";

      const email =
        user.email || "";

      return (
        name
          .toLowerCase()
          .includes(value) ||
        email
          .toLowerCase()
          .includes(value)
      );
    });
  }, [users, search]);

  return (
    <main className="admin-users">

      <div className="users-container">

        {/* ============================== */}
        {/* HEADER */}
        {/* ============================== */}

        <section className="users-header">

          <div>

            <p className="users-label">
              CINERA ADMIN
            </p>

            <h1>
              Users
            </h1>

            <p>
              Manage CINERA users and account
              information.
            </p>

          </div>

          <div className="users-count">

            <UsersIcon size={18} />

            <span>
              {users.length} users
            </span>

          </div>

        </section>

        {/* ============================== */}
        {/* SEARCH */}
        {/* ============================== */}

        <section className="users-controls">

          <div className="users-search">

            <Search size={19} />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search users..."
            />

          </div>

        </section>

        {/* ============================== */}
        {/* USERS TABLE */}
        {/* ============================== */}

        {filteredUsers.length > 0 ? (

          <section className="users-table">

            <div className="users-table-header">

              <span>
                USER
              </span>

              <span>
                EMAIL
              </span>

              <span>
                STATUS
              </span>

              <span>
                ACTION
              </span>

            </div>

            {filteredUsers.map(
              (user, index) => (

                <div
                  className="user-row"
                  key={
                    user.email ||
                    `user-${index}`
                  }
                >

                  {/* USER */}

                  <div className="user-info">

                    <div className="user-avatar">
                      <User size={19} />
                    </div>

                    <div>

                      <strong>
                        {user.name ||
                          "CINERA User"}
                      </strong>

                      <span>
                        User #{index + 1}
                      </span>

                    </div>

                  </div>

                  {/* EMAIL */}

                  <span className="user-email">
                    {user.email ||
                      "No email"}
                  </span>

                  {/* STATUS */}

                  <span className="user-status">

                    <span />

                    Active

                  </span>

                  {/* ACTION */}

                  <button
                    className="user-delete"
                    onClick={() =>
                      handleDelete(
                        user
                      )
                    }
                    title="Delete user"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              )
            )}

          </section>

        ) : (

          <section className="users-empty">

            <UsersIcon size={42} />

            <h2>
              No users found
            </h2>

            <p>
              {search
                ? "Try another search."
                : "No registered users are available yet."}
            </p>

          </section>

        )}

        {/* ============================== */}
        {/* ADMIN NOTICE */}
        {/* ============================== */}

        <section className="users-notice">

          <ShieldCheck size={19} />

          <div>

            <strong>
              Admin User Management
            </strong>

            <p>
              User data is currently stored
              locally in this application.
              A backend database can be
              connected later for persistent
              account management.
            </p>

          </div>

        </section>

      </div>

    </main>
  );
};

export default Users;