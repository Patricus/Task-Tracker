import { useState } from "react";
import useUser from "../Context/User";

function index() {
  const [name, setName] = useState("");
  const { logIn } = useUser();

  const handleLogin = e => {
    e.preventDefault();
    logIn(name);
  };
  return (
    <div className="justify-center items-center flex absolute w-full h-full">
      <form className="bg-slate-100 px-11 py-10 rounded-lg">
      <label className="font-bold text-lg" htmlFor="name">Name</label>
      <input className="border rounded-lg mx-4 text-center"
        type="text"
        name="name"
        id="name"
        onChange={e => setName(e.target.value)}
        value={name}
        placeholder="Enter user name"
      />
      <button className="bg-blue-500 rounded-lg px-2 py-1 text-white font-semibold" onClick={handleLogin}>Log In</button>
    </form>
    </div>
  );
}

export default index;
