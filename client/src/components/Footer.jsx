import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <a href="/rgpd" style={styles.link}>
        RGPD
      </a>
      <a href="/accessibilite" style={styles.link}>
        Accessibilité
      </a>
    </footer>
  );
};

const styles = {
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "#f1f1f1",
    borderTop: "1px solid #ccc",
  },
  link: {
    margin: "0 1rem",
    textDecoration: "none",
    color: "#007BFF",
  },
};

export default Footer;
