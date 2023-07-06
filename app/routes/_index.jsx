import { useState, useEffect } from "react";
import useLoader from "../../hooks/useLoader";

export const meta = () => {
  return [
    { title: "Restaurant App" },
    { name: "Restaurant App that can add or delete restaurants from database", content: "Welcome to Restaurant app!" },
  ];
};

export default function Index() {

  const [restaurants] = useLoader('/api/burgers');

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Restaurant App</h1>
      <p>Welcome to Restaurant app!</p>
      <h2>Restaurants</h2>
      <ul>
        {
          Object.keys(restaurants).map((key) => (
            <li key={key}>
              <a href={`/restaurant/${key}`}>{restaurants[key].name}</a>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
