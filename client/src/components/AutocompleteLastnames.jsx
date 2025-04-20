import React, { useState, useEffect, useRef, useMemo } from "react";
import { useUserData } from "../context/UserDataContext";

export default function AutocompleteLastnames() {
  const { friendData } = useUserData();
  const lastnames = useMemo(() => {
    if (!Array.isArray(friendData)) return [];
    const uniqueMap = new Map();
    for (const el of friendData) {
      if (el.lastname) {
        const lower = el.lastname.toLowerCase();
        if (!uniqueMap.has(lower)) {
          uniqueMap.set(lower, el.lastname); // on garde la version originale
        }
      }
    }

    return Array.from(uniqueMap.values());
  }, [friendData]);

  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const suggestionRefs = useRef([]);

  // liste filtrée + dropdown ouvert
  const filtered = useMemo(
    () =>
      query
        ? lastnames.filter((name) =>
            name.toLowerCase().startsWith(query.toLowerCase())
          )
        : [],
    [query, lastnames]
  );
  const dropdownOpen = filtered.length > 0;

  // click à l'extérieur → fermer
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setHighlightedIndex(-1);
        setQuery((q) => q); // on garde la saisie
        // fermer :
        setTimeout(() => setHighlightedIndex(-1), 0);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // gestion clavier dans l'input
  const onInputKeyDown = (e) => {
    if (!dropdownOpen) {
      if (e.key === "Tab" && filtered.length > 0) {
        e.preventDefault();
        // focus sur le 1er item
        suggestionRefs.current[0]?.focus();
        setHighlightedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((i) => (i < filtered.length - 1 ? i + 1 : 0));
        suggestionRefs.current[
          highlightedIndex < filtered.length - 1 ? highlightedIndex + 1 : 0
        ]?.focus();
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((i) => (i > 0 ? i - 1 : filtered.length - 1));
        suggestionRefs.current[
          highlightedIndex > 0 ? highlightedIndex - 1 : filtered.length - 1
        ]?.focus();
        break;

      case "Enter":
        e.preventDefault();
        if (filtered.length > 0) {
          setQuery(filtered[0]);
          setHighlightedIndex(-1);
        }
        break;

      case "Tab":
        e.preventDefault();
        // même logique que ArrowDown pour le 1er focus
        suggestionRefs.current[0]?.focus();
        setHighlightedIndex(0);
        break;

      default:
        break;
    }
  };

  // gestion Tab / Shift+Tab dans les <li>
  const onItemKeyDown = (e, idx) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const nextIdx = e.shiftKey ? idx - 1 : idx + 1;
      if (nextIdx >= 0 && nextIdx < filtered.length) {
        suggestionRefs.current[nextIdx]?.focus();
        setHighlightedIndex(nextIdx);
      } else {
        // sortir du dropdown
        if (e.shiftKey) {
          inputRef.current?.focus();
          setHighlightedIndex(-1);
        }
      }
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "200px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: dropdownOpen ? "8px 8px 0 0" : "8px",
          background: "white",
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* flèche */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          style={{ marginRight: 8 }}
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>

        <input
          ref={inputRef}
          type="text"
          placeholder="Rechercher..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlightedIndex(-1);
          }}
          onKeyDown={onInputKeyDown}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: "14px",
          }}
        />
      </div>

      {/* dropdown toujours dans le DOM pour transition */}
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: "white",
          border: "1px solid #ccc",
          borderTop: "none",
          borderRadius: "0 0 8px 8px",
          maxHeight: "200px",
          overflowY: "auto",
          zIndex: 1000,

          opacity: dropdownOpen ? 1 : 0,
          transform: dropdownOpen ? "translateY(0)" : "translateY(-5px)",
          pointerEvents: dropdownOpen ? "auto" : "none",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
      >
        {filtered.map((name, idx) => (
          <li
            key={name + idx}
            ref={(el) => (suggestionRefs.current[idx] = el)}
            tabIndex={0}
            style={{
              padding: "8px 12px",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
              backgroundColor:
                idx === highlightedIndex ? "#f0f0f0" : "transparent",
            }}
            onClick={() => {
              setQuery(name);
              setHighlightedIndex(-1);
            }}
            onKeyDown={(e) => onItemKeyDown(e, idx)}
            onMouseEnter={() => setHighlightedIndex(idx)}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
