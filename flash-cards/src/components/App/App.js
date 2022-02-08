import React from "react";
import { Content } from "../Content/Content";
import { Dashboard } from "../Dashboard/Dashboard";
import { LandingPage } from "../LandingPage/LandingPage";
import { LogIn } from "../LogIn/LogIn";
import { SignUp } from "../SignUp/SignUp";
import { Nav } from "../Nav/Nav";

export const App = () => {
  const [currentPage, setCurrentPage] = React.useState("landingPage");

  const renderPage = () => {
    switch (currentPage) {
      case "logIn":
        return <LogIn setCurrentPage={setCurrentPage} />;
      case "dashboard":
        return <Dashboard />;
      case "signUp":
        return <SignUp setCurrentPage={setCurrentPage} />;
      case "landingPage":
      default:
        return <LandingPage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <Content>
      <Nav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </Content>
  );
};
