
import React from "react";
import translations from "../i18n/translations";
 
export default function LanguageSelector({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Select language"
      style={{
        padding: "6px 10px",
        borderRadius: 6,
        background: "rgba(255,255,255,0.95)",
        color: "#111",
        border: "1px solid rgba(0,0,0,0.12)",
        fontSize: "14px",
        lineHeight: "1.2",
        minWidth: "90px"
      }}
    >
      {Object.keys(translations).map((k) => (
        <option key={k} value={k}>{translations[k].label}</option>
      ))}
    </select>
  );
}
 