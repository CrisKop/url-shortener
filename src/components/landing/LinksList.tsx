"use client";

import React, { useEffect, useState } from "react";
import LinkItem from "./LinkItem";

const LinksList: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLinks() {
      try {
        const res = await fetch("/api/link"); // ← tu endpoint
        if (!res.ok) throw new Error("Error al obtener los links");

        const data = await res.json();
        setLinks(data); // ya viene ordenado y limitado en el backend
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchLinks();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-screen-xl px-4 md:px-8 text-center">
        <p className="text-gray-500">Cargando enlaces...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 md:px-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Links más visitados.
        </h2>
        <span className="bg-[var(--highlight)] text-white text-sm py-1 px-3 rounded-full">
          6 / {links.length} links
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
          <LinkItem
            key={link._id?.toString()}
            _id={link._id?.toString()}
            url={link.url}
            shortened={link.shortened}
            timesVisited={link.timesVisited}
            createdAt={link.createdAt}
            updatedAt={link.updatedAt}
          />
        ))}
      </div>
    </div>
  );
};

export default LinksList;
