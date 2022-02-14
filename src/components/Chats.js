import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await auth.signOut();

    history.push("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("/");

      return;
    }
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": "11be3d8b-e20b-47ed-ab62-fe0560e65054",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users", formdata, {
              headers: {
                "private-key": "370549d6-ba78-41dc-ad7a-b68f2dac040e",
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.error(error));
        });
      });
  }, [user, history]);

  if (!user || loading) return "Loading...";

  return (
    <div className="chat-page">
      <div className="nav-bar">
        <div className="logo-tab">Unichat</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 60px)"
        projectID="11be3d8b-e20b-47ed-ab62-fe0560e65054"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
