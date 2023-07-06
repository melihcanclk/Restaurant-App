import { useState, useEffect } from "react";

export const meta = () => {
  return [
    { title: "Restaurant App" },
    { name: "Restaurant App that can add or delete restaurants from database", content: "Welcome to Restaurant app!" },
  ];
};

export default function Index() {

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/burgers")
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data.data);
        console.log(data.data)
      });
  }, []);


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
