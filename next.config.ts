import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["www.google.com"], // <— agrega todos los dominios que quieras usar
  },
};

module.exports = nextConfig;
