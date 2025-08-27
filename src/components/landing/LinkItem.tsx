import React from "react";
import Link from "next/link";

const LinkItem: React.FC<Link> = ({
  url,
  shortened,
  timesVisited,
  createdAt,
}) => {
  // Extraer el dominio para mostrar información
  const urlObj = new URL(url);
  const domain = urlObj.hostname;
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  // Formatear la fecha
  const formattedDate = new Date(createdAt).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full transform hover:-translate-y-1">
      <div className="p-5 flex-grow">
        <div className="flex items-center mb-4">
          <div className="bg-gray-100 p-2 rounded-full">
            <img
              src={faviconUrl}
              alt={`Logo de ${domain}`}
              className="w-8 h-8"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {domain}
            </h3>
            <p className="text-xs text-gray-500 truncate">{url}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center">
            <span className="text-xs text-gray-500 mr-1">Visitas:</span>
            <span className="text-sm font-medium">{timesVisited}</span>
          </div>
          <div className="text-xs text-gray-500">{formattedDate}</div>
        </div>
      </div>

      <div className="bg-[var(--highlight)] p-3 mt-auto">
        <Link
          href={`/${shortened}`}
          className="flex justify-between items-center text-white group"
        >
          <span className="font-medium">/{shortened}</span>
          <span className="bg-white bg-opacity-20 rounded-full p-1 group-hover:bg-opacity-30 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default LinkItem;
