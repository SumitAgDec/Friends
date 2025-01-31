import React, { useState, useEffect } from "react";
import axios from "axios";

function MyFriends() {
  const [myFriends, setMyFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getseletedFriends = async () => {
      await axios
        .get("/api/selectedFriends")
        .then((response) => {
          setMyFriends(response.data.friends);
          console.log(response.data.friends);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getseletedFriends();
  }, []);

  const handleRemoveFriend = async (friendId) => {
    try {
      const res = await axios.post("/api/removeFriend", { friendId });
      setMyFriends(res.data.friends);
      window.location.reload();
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  const filteredFriends = myFriends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-6xl font-semibold">Friends</h1>
      <input
        type="text"
        placeholder="Search friends..."
        className="mt-4 mb-4 p-2 border border-gray-300 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
              onClick={() => handleRemoveFriend(friend._id)}
              className="bg-red-500 w-fit hover:bg-red-700 h-fit text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Remove Friends
            </button>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default MyFriends;
