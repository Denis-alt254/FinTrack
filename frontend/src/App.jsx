import { Login } from "./components/Login";
import { Register } from "./components/Register"
import { GetAllUsers } from "./services/user";

function App() {

  return (
    <>
      <Register />
      <Login />
      <button onClick={async() => {await GetAllUsers();}}>GetAllUsers</button>
    </>
  )
}

export default App;