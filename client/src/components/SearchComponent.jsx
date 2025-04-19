import { useEffect, useState, useRef } from "react";
import { useUserData } from "../context/UserDataContext";

const SearchComponent = () => {
  const { friendData } = useUserData();

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    if (friendData) {
      const friendDataReady = Array.isArray(friendData)
        ? friendData.filter(
            (el) =>
              el.id &&
              el.firstname &&
              el.lastname &&
              el.age_this_year &&
              el.birth_day_of_week_this_year &&
              el.birth_day
          )
        : [];

      setData(friendDataReady);

      console.log("%c⧭", "color: #00736b vccccccc");
    }
  }, [friendData]);

  // Filtrage à chaque frappe
  useEffect(() => {
    const results = data
      .filter((person) => {
        const fullName = `${person.firstname} ${person.lastname}`.toLowerCase();
        return fullName.includes(query.toLowerCase());
      })
      .slice(0, 15); // max 15 résultats
    setFilteredResults(results);
  }, [query, data]);

  const scrollToItem = (id) => {
    const target = document.getElementById(`friend-${id}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });

      // Applique la classe highlight temporairement
      target.classList.add("highlight");

      // Retire la classe après 1s
      setTimeout(() => {
        target.classList.remove("highlight");
      }, 5000);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFilteredResults([]); // Ferme la liste
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      id="search-container"
      style={{
        display: "flex",
        width: "200px",
        padding: "8px",
        boxSizing: "border-box",
        borderRadius: "12px",
        border: "1px solid #ccc",
        background: "white",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        viewBox="0 -960 960 960"
        width="20px"
        fill="#5F6368"
        style={{ marginTop: "2px", marginRight: "2px" }}
      >
        <path d="M720-180 530.46-388.16q-30 24.77-69 38.77-39 14-80.69 14-102.55 0-173.58-71.01-71.03-71.01-71.03-173.54 0-102.52 71.01-173.6 71.01-71.07 173.54-71.07 102.52 0 173.6 71.03 71.07 71.03 71.07 173.58 0 42.85-14.38 81.85-14.39 39-38.39 67.84l200 200-42.15 42.16ZM380.77-395.38q77.31 0 130.96-53.66 53.66-53.65 53.66-130.96t-53.66-130.96q-53.65-53.66-130.96-53.66t-130.96 53.66Q196.15-657.31 196.15-580t53.66 130.96q53.65 53.66 130.96 53.66Z" />
      </svg>
      <input
        type="text"
        placeholder="Rechercher..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ border: "none", outline: "none", width: "100%" }}
      />

      {query && filteredResults.length > 0 && (
        <ul
          style={{
            listStyle: "none", // ❌ pas de bullet
            margin: 0,
            padding: 0,
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "white",
            border: "1px solid #ccc",
            borderTop: "none",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {filteredResults.map((person) => (
            <li
              key={person.id}
              style={{
                padding: "8px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
              }}
              onClick={() => {
                setQuery(`${person.firstname} ${person.lastname}.`);
                setFilteredResults([]);
                scrollToItem(person.id);
              }}
            >
              {person.firstname} {person.lastname}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
