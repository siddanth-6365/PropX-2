import { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";

export default function BaseLayout({ children, account, web3Handler }) {
  return (
    <>
      <Header account={account} web3Handler={web3Handler} />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
