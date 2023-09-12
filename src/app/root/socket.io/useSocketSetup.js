import { useContext, useEffect } from "react";

const useSocketSetup = (socket, setFriendList, setMessages) => {
  console.log("socket hook", socket);
  useEffect(() => {
    socket.connect();
    socket.on("friends", (friendList) => {
      setFriendList(friendList);
    });
    socket.on("messages", (messages) => {
      console.log("messages", messages);
      // setMessages(messages);
    });
    socket.on("dm", (message) => {
      console.log("mesages front hook on dm", message);
      // setMessages(prevMsgs => [message, ...prevMsgs]);
    });
    socket.on("connected", (status, username) => {
      setFriendList((prevFriends) => {
        return [...prevFriends].map((friend) => {
          if (friend.username === username) {
            friend.connected = status;
          }
          return friend;
        });
      });
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
  }, [setFriendList, setMessages, socket]);
};

export default useSocketSetup;
