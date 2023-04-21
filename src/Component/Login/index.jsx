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
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        onChange={e => setName(e.target.value)}
        value={name}
      />
      <button onClick={handleLogin}>Log In</button>
    </form>
  );
}

export default index;
