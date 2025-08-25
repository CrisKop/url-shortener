import React from "react";
import LinkItem from "./LinkItem";
import links from "../../../public/links.json";

const LinksList: React.FC = () => {
  const sortedLinks = links.sort(
    (a: LinkItemProps, b: LinkItemProps) =>
      Number(b.timesVisited) - Number(a.timesVisited)
  );

  const topLinks = sortedLinks.slice(0, 6);

  return (
    <div className="mx-auto max-w-screen-xl px-4 md:px-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Enlaces acortados más visitados.
        </h2>
        <span className="bg-[var(--highlight)] text-white text-sm py-1 px-3 rounded-full">
          {links.length} enlaces
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topLinks.map((link) => (
          <LinkItem
            key={link._id}
            _id={link._id}
            url={link.url}
            shortened={link.shortened}
            timesVisited={link.timesVisited}
            createdAt={link.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default LinksList;
