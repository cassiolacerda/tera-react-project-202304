import React from "react";
import { useParams } from "react-router-dom";

import Default from "../templates/Default";

import AppLoading from "../organisms/AppLoading";
import UserBio from "../molecules/UserBio";
import PostListWrapper from "../molecules/PostListWrapper";

export default function UserBlog() {
  const { userId } = useParams();

  const [user, setUser] = React.useState({});
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    Promise.all([
      fetch(`https://63cf09718a780ae6e6710dbe.mockapi.io/users/${userId}`).then(
        (response) => response.json()
      ),
      fetch(
        `https://63cf09718a780ae6e6710dbe.mockapi.io/users/${userId}/posts`
      ).then((response) => response.json()),
    ]).then(([userResponse, postsResponse]) => {
      setUser(userResponse);
      setPosts(postsResponse);
      setIsLoading(false);
    });
  }, [userId]);

  return isLoading ? (
    <AppLoading />
  ) : (
    <Default>
      <div className="user-blog">
        <UserBio user={user} />
        <PostListWrapper posts={posts} />
      </div>
    </Default>
  );
}
