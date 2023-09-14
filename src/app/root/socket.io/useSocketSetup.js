import { useContext, useEffect } from "react";

const useSocketSetup = (socket, setMessages, setUnreadNotifications, setInitPersistedNotifications, setUnreadNotificationsNumber) => {
  //TODO
  useEffect(() => {
    socket.connect();
    socket.on("friends", (friendList) => {
      // setFriendList(friendList);
    });
    socket.on("messages", (messages) => {
      setMessages(messages);
    });
    socket.on("persistednn", (persistetnn) => {
      setInitPersistedNotifications(persistetnn)
    });
    socket.on("dm", (message) => {
      setUnreadNotifications((prevMsgs) => [message, ...prevMsgs]);
      setUnreadNotificationsNumber((prevMsgs) => [message, ...prevMsgs]);
    });
    socket.on("connected", (status, username) => {
      // setFriendList((prevFriends) => {
      //   return [...prevFriends].map((friend) => {
      //     if (friend.username === username) {
      //       friend.connected = status;
      //     }
      //     return friend;
      //   });
      // });
    });
    socket.on("connect_error", () => {
      // setUser({ loggedIn: false });
    });
    return () => {
      socket.off("connect_error");
      socket.off("connected");
      socket.off("friends");
      socket.off("messages");
      socket.off("dm");
    };
  }, [setMessages, socket]);
};

export default useSocketSetup;
