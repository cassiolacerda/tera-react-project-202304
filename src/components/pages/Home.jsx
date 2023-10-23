import React from "react";
import { useNavigate } from "react-router-dom";

import AppLoading from "../organisms/AppLoading";

import logo from "../../images/logo.svg";

export default function Home(props) {
  const navigate = useNavigate();

  const [users, setUsers] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://63cf09718a780ae6e6710dbe.mockapi.io/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      });
  }, []);

  const handleUserChange = (e) => props.setCurrentUser(e.target.value);

  const handleButtonClick = (e) => navigate(`/users/${props.currentUser}`);

  return isLoading ? (
    <AppLoading />
  ) : (
    <div className="home center">
      <div className="home__logo">
        <img src={logo} className="responsive" alt="" />
      </div>
      <select
        defaultValue={props.currentUser}
        onChange={handleUserChange}
        className="home__select-users"
      >
        <option value="">Selecionar usuário</option>
        {users
          .sort((a, b) => a.fn.localeCompare(b.fn))
          .map((user) => (
            <option value={user.id} key={user.id}>
              {user.fn} {user.ln}
            </option>
          ))}
      </select>
      {!!props.currentUser && (
        <button onClick={handleButtonClick} className="button-primary">
          Entrar
        </button>
      )}
    </div>
  );
}
