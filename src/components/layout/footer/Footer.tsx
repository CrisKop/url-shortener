import React from "react";

function Footer() {
  return (
    <footer className=" py-8 bg-gray-100 text-center text-gray-600 text-sm">
      <p>{new Date().getFullYear()} UrlShortener</p>
    </footer>
  );
}

export default Footer;
