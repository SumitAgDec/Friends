import { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex items-center justify-center h-screen gap-7 bg-gray-100">
        <Link to="/home">
          <div className="box p-8 shadow-md font-semibold">All Users</div>
        </Link>

        <Link to="/myFriends">
          <div className="box p-8 shadow-md font-semibold">Friends</div>
        </Link>
      </div>
    </>
  );
}

export default App;
