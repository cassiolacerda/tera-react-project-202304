import React from "react";
import { useNavigate } from "react-router-dom";

import AppLoading from "../organisms/AppLoading";
import { GlobalContext } from "../../contexts/GlobalContext";

import logo from "../../images/logo.svg";
import styles from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();

  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { currentUser, setCurrentUser } = React.useContext(GlobalContext);

  React.useEffect(() => {
    fetch("https://63cf09718a780ae6e6710dbe.mockapi.io/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      });
  }, []);

  const handleUserChange = (e) => setCurrentUser(e.target.value);

  const handleButtonClick = (e) => navigate(`/users/${currentUser}`);

  return isLoading ? (
    <AppLoading />
  ) : (
    <div className={`${styles.home} center`}>
      <div className={styles.logo}>
        <img src={logo} className="responsive" alt="" />
      </div>
      <select
        defaultValue={currentUser}
        onChange={handleUserChange}
        className={styles.selectUsers}
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
      {!!currentUser && (
        <button onClick={handleButtonClick} className="button-primary">
          Entrar
        </button>
      )}
    </div>
  );
}
