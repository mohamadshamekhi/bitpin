import React from "react";
import Container from "../container/container";
import Header from "./header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout({ children }) {
  return (
    <main>
      <Header />
      <Container>{children}</Container>

      <ToastContainer />
    </main>
  );
}

export default Layout;
