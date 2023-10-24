import React from "react";
import { Link } from "react-router-dom";

import { GlobalContext } from "../../contexts/GlobalContext";

export default function UserListItem(props) {
  const { currentUser } = React.useContext(GlobalContext);

  const classNames = [
    "users__list-item",
    ...(currentUser === props.user.id.toString() ? ["active"] : []),
  ].join(" ");

  return (
    <Link to={`/users/${props.user.id}`} className={classNames}>
      <div className="users__list-item-photo">
        <img src={props.user.avatar} className="responsive avatar" alt="" />
      </div>
      <div className="users__list-item-name">
        {props.user.fn} {props.user.ln}
      </div>
    </Link>
  );
}
