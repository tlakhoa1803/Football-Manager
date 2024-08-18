import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";

const UserManager = () => {
  const API_BASE_URL = "http://localhost:8888"; // Thay đổi URL này tùy theo backend của bạn
  const accessToken = useSelector((state) => state.user.accessToken);

  // RoleSelect component
  const RoleSelect = ({ currentRole, onChange }) => {
    return (
      <select
        value={currentRole}
        onChange={(e) => onChange(e.target.value)}
        className="border p-2 rounded bg-white shadow-sm"
      >
        <option value="Guest">Guest</option>
        <option value="Manager">Manager</option>
        <option value="Member">Member</option>
        <option value="Admin">Admin</option>
      </select>
    );
  };

  // Function to update user's role
  const updateUserRole = async (userId, newRole) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/position/${userId}`,
        { position: newRole },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Role updated successfully");
      return response.data;
    } catch (error) {
      console.error("Error updating role:", error);
      throw error;
    }
  };

  // Function to delete user
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${API_BASE_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  // UserList component
  const UserList = () => {
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/user_all`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setUsersData(response.data.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchUsers();
    }, [accessToken]);

    const handleUpdateRole = async (userId, newRole) => {
      try {
        await updateUserRole(userId, newRole);
        const updatedUsers = [...usersData];
        const index = updatedUsers.findIndex((user) => user.id === userId);
        if (index !== -1) {
          updatedUsers[index].position = newRole;
          setUsersData(updatedUsers);
        }
      } catch (error) {
        console.error("Error updating role:", error);
      }
    };

    const handleDeleteUser = async (userId) => {
      try {
        await deleteUser(userId);
        const updatedUsers = usersData.filter((user) => user.id !== userId);
        setUsersData(updatedUsers);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };

    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Phân quyền người dùng</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 uppercase font-semibold text-sm border-b">Tên</th>
                <th className="py-3 px-4 uppercase font-semibold text-sm border-b">Email</th>
                <th className="py-3 px-4 uppercase font-semibold text-sm border-b">Vai trò</th>
                <th className="py-3 px-4 uppercase font-semibold text-sm border-b">Câu lạc bộ</th>
                <th className="py-3 px-4 uppercase font-semibold text-sm border-b">Phân quyền</th>
                <th className="py-3 px-4 uppercase font-semibold text-sm border-b">Xóa</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {usersData.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="py-3 px-4 border-r">{user.name}</td>
                  <td className="py-3 px-4 border-r">{user.email}</td>
                  <td className="py-3 px-4 border-r">{user.position}</td>
                  <td className="py-3 px-4 border-r">{user.clubName}</td>
                  <td className="py-3 px-4 border-r">
                    <RoleSelect
                      currentRole={user.position}
                      onChange={(newRole) => handleUpdateRole(user.id, newRole)}
                    />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button onClick={() => handleDeleteUser(user.id)}>
                      <FaTrash className="text-red-500 hover:text-red-700" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return <UserList />;
};

export default UserManager;
