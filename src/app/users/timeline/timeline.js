import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import { useSendPushNotificationMutation } from "../usersApiSlice";

import { useSelector } from "react-redux";


const Timeline = (props) => {
  const user_scoket = useSelector((state) => state.login.socket);
  const [
    sendNotification,
    { isLoading: sendNotificationLoading, reset: sendNotificationMuatation },
  ] = useSendPushNotificationMutation();
  const handleDateClick = (arg) => {
    // console.log("arg", arg);
    // bind with an arrow function
    if (moment().diff(arg.date, "days") <= 0) {
      alert(arg.dateStr);
    }
  };
  const handleEventClick = (info) => {
    // bind with an arrow function
    // console.log("info.event.extendedProps", info.event.extendedProps);
    if (info.event.extendedProps.type) {
      alert(info.date);
    }
    sendNotification({ userId: 1 }); //TODO
    // socket.emit("sendNotification", { userId: user_info.id });
    const message = { to: 1, from: null, content: "test socket" };
    user_scoket.emit("dm", message);
  };

  console.log("user_scoket timeline", user_scoket);



  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      weekends={false}
      //   validRange={{ start: `${today}` }}
      selectable={true}
      selectAllow={function (select) {
        // console.log("select", select);
        // console.log(
        //   "moment().diff(select.start)",
        //   moment().diff(select.start, "days")
        // );
        return moment().diff(select.start, "days") < 0;
      }}
      events={[
        {
          //   title: "test",
          start: "2023-07-24",
          end: "2023-08-30",
          overlap: false,
          display: "background",
        },
        { title: "sick leave", type: "sick leave", date: "2023-08-28" },
      ]}
      dateClick={handleDateClick}
      eventClick={handleEventClick}
    />
  );
};

export default Timeline;
