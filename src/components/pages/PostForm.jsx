import React from "react";
import { useParams } from "react-router-dom";

import Default from "../templates/Default";
import AppLoading from "../organisms/AppLoading";

export default function PostForm() {
  const { userId } = useParams();

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const hadleFormSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    fetch(`https://63cf09718a780ae6e6710dbe.mockapi.io/users/${userId}/posts`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      setTitle("");
      setContent("");
      setIsLoading(false);
    });
  };

  return isLoading ? (
    <AppLoading />
  ) : (
    <Default>
      <div className="create-post">
        <h1>Criar</h1>

        <form onSubmit={hadleFormSubmit} className="create-post__form">
          <div className="create-post__form-name">
            <label htmlFor="name">Título</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="name"
              name="title"
            />
          </div>
          <div className="create-post__form-content">
            <label htmlFor="content">Conteúdo</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              name="content"
              id="content"
            ></textarea>
          </div>
          <button className="button-primary">Salvar</button>
        </form>
      </div>
    </Default>
  );
}
