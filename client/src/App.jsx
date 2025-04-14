import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import ModalEdit from "./components/ModalEdit";
import Footer from "./components/Footer";

import "./styles/app.css";
import "./styles/global.css";

function App() {
  const [month, setMonth] = useState("");

  // État pour gérer la modal et les données à éditer
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const openModal = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  const saveData = (updatedData) => {
    console.log("Données mises à jour :", updatedData);
    // Envoyer les modifications à une API ou mettre à jour le state global
  };

  return (
    <>
      <Header setMonth={setMonth} />
      <Outlet context={{ month, setMonth, openModal }} />
      <ModalEdit
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedData}
        onSave={saveData}
      />
      <Footer />
    </>
  );
}

export default App;
