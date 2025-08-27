import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className=" py-8 bg-gray-100 text-center text-gray-600 text-sm">
      <p>{new Date().getFullYear()} - ZapCut - Acortador de Links</p>
      <p>
        Creado por
        <Link
          className="text-[var(--highlight)] hover:text-[var(--primary)]"
          href="https://criskop.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          : CrisKop
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
