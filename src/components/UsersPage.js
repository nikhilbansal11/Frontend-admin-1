import React, { useState, useEffect } from "react";

// Inline CSS styles
const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
    backgroundColor: "#f7f7f7",
    minHeight: "100vh"
  },
  header: {
    color: "#2c3e50",
    marginBottom: "20px",
    textAlign: "center"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
  },
  th: {
    backgroundColor: "#34495e",
    color: "#ecf0f1",
    padding: "10px",
    border: "1px solid #ddd"
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center"
  },
  button: {
    margin: "0 5px",
    padding: "5px 10px",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer"
  },
  addButton: {
    backgroundColor: "#27ae60",
    color: "#fff"
  },
  editButton: {
    backgroundColor: "#2980b9",
    color: "#fff"
  },
  deleteButton: {
    backgroundColor: "#c0392b",
    color: "#fff"
  },
  form: {
    margin: "20px 0",
    padding: "15px",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    borderRadius: "5px",
    maxWidth: "400px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "3px"
  },
  label: {
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px"
  }
};

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  // Updated state to include password along with the other fields.
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: ""
  });
  const [isCreating, setIsCreating] = useState(false);
  const url = "https://meridian-backend-postdeployment-testing.onrender.com";

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${url}/users`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle input changes for the form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create a new user (using /signup endpoint)
  const createUser = async () => {
    try {
      const res = await fetch(`${url}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Failed to create user");
      await res.json();
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        password: ""
      });
      setIsCreating(false);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // Update an existing user
  const updateUser = async (userId) => {
    try {
      const res = await fetch(`${url}/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Failed to update user");
      await res.json();
      setEditingUser(null);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        password: ""
      });
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a user
  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`${url}/users/${userId}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete user");
      await res.json();
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // Handle form submission for create or update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      updateUser(editingUser.id);
    } else {
      createUser();
    }
  };

  // Set the form for editing an existing user
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      role: user.role || "",
      password: "" // require re-entering password when editing
    });
    setIsCreating(true);
  };

  // Reset form for new creation
  const handleNewUser = () => {
    setEditingUser(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      password: ""
    });
    setIsCreating(true);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>User Management Dashboard</h1>
      <button
        style={{ ...styles.button, ...styles.addButton }}
        onClick={handleNewUser}
      >
        Add New User
      </button>
      {isCreating && (
        <form style={styles.form} onSubmit={handleSubmit}>
          <h2>{editingUser ? "Edit User" : "Create New User"}</h2>
          <label style={styles.label} htmlFor="firstName">
            First Name:
          </label>
          <input
            style={styles.input}
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <label style={styles.label} htmlFor="lastName">
            Last Name:
          </label>
          <input
            style={styles.input}
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <label style={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            style={styles.input}
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label style={styles.label} htmlFor="role">
            Role:
          </label>
          <input
            style={styles.input}
            type="text"
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
          <label style={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            style={styles.input}
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            style={{ ...styles.button, ...styles.editButton }}
            type="submit"
          >
            {editingUser ? "Update User" : "Create User"}
          </button>
          <button
            style={{ ...styles.button, ...styles.deleteButton }}
            type="button"
            onClick={() => {
              setIsCreating(false);
              setEditingUser(null);
              setFormData({
                firstName: "",
                lastName: "",
                email: "",
                role: "",
                password: ""
              });
            }}
          >
            Cancel
          </button>
        </form>
      )}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>First Name</th>
            <th style={styles.th}>Last Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td style={styles.td}>{user.id}</td>
                <td style={styles.td}>{user.firstName}</td>
                <td style={styles.td}>{user.lastName}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.role}</td>
                <td style={styles.td}>
                  <button
                    style={{ ...styles.button, ...styles.editButton }}
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.deleteButton }}
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={styles.td} colSpan="6">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
