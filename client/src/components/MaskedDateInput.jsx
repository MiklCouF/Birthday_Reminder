import React, { useRef } from "react";

/**
 * Composant input masqué pour les dates au format dd/mm/yyyy
 * @param {function} onDateChange - Callback qui reçoit une Date valide ou null
 * @param {string} [initialValue] - Valeur initiale (optionnelle)
 * @param {string} [name] - Nom du champ (optionnel)
 */
const MaskedDateInput = ({ onDateChange, initialValue = "", name }) => {
  const inputRef = useRef();

  // Fonction pour parser la date
  const parseDate = (str) => {
    const [dd, mm, yyyy] = str.split("/").map(Number);
    if (!dd || !mm || !yyyy) return null;

    const date = new Date(yyyy, mm - 1, dd); // mois indexé à 0
    // Vérifie que la date est valide (évite 32/01/2020 ou 30/02/2023)
    if (
      date.getFullYear() !== yyyy ||
      date.getMonth() !== mm - 1 ||
      date.getDate() !== dd
    ) {
      return null;
    }

    return date;
  };

  const handleInput = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // supprime tout sauf chiffres

    if (value.length > 2 && value.length <= 4) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    } else if (value.length > 4) {
      value =
        value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4, 8);
    }

    e.target.value = value;

    // Validation
    const parsedDate = parseDate(value);
    onDateChange(parsedDate);
  };

  const handleKeyDown = (e) => {
    const input = inputRef.current;
    const pos = input.selectionStart;
    const value = input.value;

    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      (value[pos - 1] === "/" || value[pos] === "/")
    ) {
      e.preventDefault();
      if (e.key === "Backspace") {
        input.setSelectionRange(pos - 1, pos - 1);
      } else {
        input.setSelectionRange(pos + 1, pos + 1);
      }
    }
  };

  return (
    <input
      type="text"
      name={name}
      placeholder="dd/mm/yyyy"
      maxLength={10}
      defaultValue={initialValue}
      ref={inputRef}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      className="border px-2 py-1 rounded w-full"
    />
  );
};

export default MaskedDateInput;
