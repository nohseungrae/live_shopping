import React from "react";
import { ViewPage } from "../pages/view_page";

declare global {
  interface Window {
    userKey: string;
  }
}

export const App: React.FC = () => {
  localStorage.setItem("userID", "437214");
  return <ViewPage />;
};
