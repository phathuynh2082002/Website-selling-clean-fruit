import React from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import Footer from "./../components/Footer";
import { BrowserRouter } from "react-router-dom";
import { useQuery } from "react-query"

const HomeScreen = ({ match, location }) => {
  window.scrollTo(0, 0);
  const query = new URLSearchParams(location.search);

  const keyword = match.params.keyword;
  let pagenumber = match.params.pagenumber;
  const categorize = match.params.categorize;
  const page = query.get('page');

  if (page) {
    pagenumber = page;
  }

  return (
    <div>
      <Header />
      <ShopSection keyword={keyword} pagenumber={pagenumber} categorize={categorize}/>
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
