import React, { useState, useEffect, useRef, useMemo } from "react";
import { useUserData } from "../context/UserDataContext";

export default function AutocompleteLastnames({
  value = "",
  onChange = () => {},
}) {
  const { friendData } = useUserData();

  // Extraire et dédupliquer les lastnames (insensible à la casse)
  const lastnames = useMemo(() => {
    if (!Array.isArray(friendData)) return [];
    const uniqueMap = new Map();
    for (const el of friendData) {
      if (el.lastname) {
        const lower = el.lastname.toLowerCase();
        if (!uniqueMap.has(lower)) {
          uniqueMap.set(lower, el.lastname);
        }
      }
    }
    return Array.from(uniqueMap.values());
  }, [friendData]);

  const [query, setQuery] = useState(value);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const suggestionRefs = useRef([]);

  // Filtrer les suggestions
  const filtered = useMemo(
    () =>
      query
        ? lastnames.filter((name) =>
            name.toLowerCase().startsWith(query.toLowerCase())
          )
        : [],
    [query, lastnames]
  );

  // Clic à l'extérieur ferme le dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sélection d'un item (click, Enter)
  const handleSelect = (name) => {
    setQuery(name);
    onChange(name);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  // Gestion du clavier sur l'input
  const onInputKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "Tab" && filtered.length) {
        e.preventDefault();
        suggestionRefs.current[0]?.focus();
        setHighlightedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((i) => {
          const next = i < filtered.length - 1 ? i + 1 : 0;
          suggestionRefs.current[next]?.focus();
          return next;
        });
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((i) => {
          const prev = i > 0 ? i - 1 : filtered.length - 1;
          suggestionRefs.current[prev]?.focus();
          return prev;
        });
        break;

      case "Enter":
        e.preventDefault();
        if (filtered.length) {
          const idx = highlightedIndex >= 0 ? highlightedIndex : 0;
          handleSelect(filtered[idx]);
        }
        break;

      case "Tab":
        if (filtered.length) {
          e.preventDefault();
          suggestionRefs.current[0]?.focus();
          setHighlightedIndex(0);
        }
        break;

      default:
        break;
    }
  };

  // Gestion du clavier sur les items <li>
  const onItemKeyDown = (e, idx) => {
    if (e.key === "Tab") {
      const lastIdx = filtered.length - 1;
      // Shift+Tab pour revenir
      if (e.shiftKey) {
        if (idx === 0) {
          setIsOpen(false);
          setHighlightedIndex(-1);
          return; // laisser le tab fonctionner naturellement
        }
        e.preventDefault();
        const prev = idx - 1;
        suggestionRefs.current[prev]?.focus();
        setHighlightedIndex(prev);
      } else {
        // Tab pour avancer
        if (idx === lastIdx) {
          setIsOpen(false);
          setHighlightedIndex(-1);
          return; // laisser le tab avancer hors du dropdown
        }
        e.preventDefault();
        const next = idx + 1;
        suggestionRefs.current[next]?.focus();
        setHighlightedIndex(next);
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = idx < filtered.length - 1 ? idx + 1 : 0;
      suggestionRefs.current[next]?.focus();
      setHighlightedIndex(next);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = idx > 0 ? idx - 1 : filtered.length - 1;
      suggestionRefs.current[prev]?.focus();
      setHighlightedIndex(prev);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      handleSelect(filtered[idx]);
    }
  };

  return (
    <div ref={containerRef} style={{ position: "relative", width: "200px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: isOpen ? "8px 8px 0 0" : "8px",
          background: "white",
        }}
        onClick={() => inputRef.current?.focus()}
      >
        <input
          ref={inputRef}
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Rechercher..."
          value={query}
          onFocus={() => {
            if (filtered.length > 0) setIsOpen(true);
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          onKeyDown={onInputKeyDown}
          style={{ border: "none", outline: "none", fontSize: "14px" }}
        />
      </div>

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

          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0)" : "translateY(-5px)",
          pointerEvents: isOpen ? "auto" : "none",
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
            onClick={() => handleSelect(name)}
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
