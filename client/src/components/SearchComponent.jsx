import React, { useEffect, useState, useRef } from "react";

const SearchComponent = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const searchRef = useRef(null);
  // Fetch les données une seule fois
  useEffect(() => {
    async function importAllFriend() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/friend/`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    }

    importAllFriend();
  }, []);

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
    <div id="search-container" style={{ position: "relative", width: "300px" }}>
      <input
        type="text"
        placeholder="Rechercher..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          boxSizing: "border-box",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
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
