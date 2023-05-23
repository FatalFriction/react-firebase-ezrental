import ApiCalendar from "react-google-calendar-api";

const config = {
  clientId: "14211979679-gfhis040uk3cl7bm65j5vt7vhm46goqb.apps.googleusercontent.com",
  apiKey: "AIzaSyAbP1ui0VYxxeMUOhUv_du-6DfoSokVKDc",
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

const apiCalendar = new ApiCalendar(config);

export default apiCalendar;