import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/all");
        setData(res.data.friends);
        console.log("Fetched data:", res.data.friends);
      } catch (err) {
        console.error("Error fetching data:", err);
        navigate("/login");
      }
    };
    fetchData();
  }, []);

  const handleAddFriend = async (friendId) => {
    try {
      const res = await axios.post("/api/add", { friendId });
      setFriends(res.data.friends);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const filteredFriends = data.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-6xl font-semibold">Users</h1>
      <input
        type="text"
        placeholder="Search friends..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mt-4 mb-4 p-2 border border-gray-300 rounded"
      />
      <ul>
        {filteredFriends.map((friend) => (
          <li key={friend._id}></li>
        ))}
      </ul>

      <dl className="max-w-full text-gray-900 ">
        {filteredFriends.map((friend) => (
          <div
            key={friend._id}
            className="flex pb-3 shadow-lg mt-3 p-3 justify-between items-center"
          >
            <div>
              <dt className="mb-1 text-lg font-semibold text-slate-800 ">
                {friend.name}
              </dt>
              <dd className="text-gray-500 md:text-lg dark:text-gray-400">
                {friend.email}
              </dd>
            </div>
            <button
              onClick={() => handleAddFriend(friend._id)}
              className="bg-blue-500 w-fit hover:bg-blue-700 h-fit text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Friends
            </button>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default Home;
