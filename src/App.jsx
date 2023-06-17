import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [quoteInfo, setQuoteInfo] = useState({
    quote: "",
    author: "",
  });
  const [color, setColor] = useState("#27ae60");

  useEffect(() => {
    getQuote();
  }, []);

  const getRandomColor = () => {
    const colors = [
      "#16a085",
      "#27ae60",
      "#2c3e50",
      "#f39c12",
      "#e74c3c",
      "#9b59b6",
      "#FB6964",
      "#342224",
      "#472E32",
      "#BDBB99",
      "#77B1A9",
      "#73A857",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const changeColor = () => {
    const newColor = getRandomColor();
    setColor(newColor);
    document.body.style.backgroundColor = newColor;
  };

  const getQuote = async () => {
    const options = {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      },
    };
    const response = await fetch(
      "https://andruxnet-random-famous-quotes.p.rapidapi.com",
      options
    );
    const data = await response.json();
    setQuoteInfo({ quote: data[0].quote, author: data[0].author });
    changeColor();
  };

  return (
    <>
      <div id="quote-box">
        <div id="quote-text">
          <h5>{quoteInfo.quote}</h5>
        </div>
        <div id="quote-author">
          <h5 style={{ textAlign: "end" }}> - {quoteInfo.author}</h5>
        </div>
        <div id="buttons">
          {!!quoteInfo.quote && (
            <button style={{ backgroundColor: color }} onClick={getQuote}>
              Get Quote
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
