import React, { useState } from "react";
import { add } from "./CalculateSum";

const StringCalculator = () => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const specialCharMapping = {
    n: "\n",
    t: "\t",
    r: "\r",
    "\\": "\\",
  };

  const unescapeSpecialChars = (input) => {
    return input.replace(
      /\\(.)/g,
      (match, group) => specialCharMapping[group] || group
    );
  };

  const handleCalculate = () => {
    setError("");
    setResult(null);
    try {
      let unEscapedInput = unescapeSpecialChars(inputValue);
      const sum = add(unEscapedInput);
      setResult(sum);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>String Calculator</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a string of numbers"
        style={{ padding: "10px", width: "300px", fontSize: "16px" }}
      />
      <br />
      <br />
      <button
        onClick={handleCalculate}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Calculate Sum
      </button>
      <br />
      <br />
      {result !== null && <h2>Result: {result}</h2>}
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
    </div>
  );
};

export default StringCalculator;
