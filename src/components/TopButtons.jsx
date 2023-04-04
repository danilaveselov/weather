import React from "react";

function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "London",
    },
    {
      id: 2,
      title: "Exeter",
    },
    {
      id: 3,
      title: "Andover",
    },
    {
      id: 4,
      title: "Edinburgh",
    },
    {
      id: 5,
      title: "Glasgow",
    },
  ];
  return (
    <div className="flex items-center justify-around my-6">
      {cities.map(({ id, title }) => (
        <button
          key={id}
          className="text-white text-lg font-medium"
          onClick={() => setQuery({ q: title })}
        >
          {title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
