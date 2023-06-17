import { useEffect, useState } from "react";
import "./App.css";
import twitterIcon from "./assets/twitterIcon.svg";

function App() {
  const [quoteInfo, setQuoteInfo] = useState({
    quote: "",
    author: "",
  });
  const [color, setColor] = useState("#2c3e50");

  useEffect(() => {
    document.body.style.backgroundColor = color;
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

  const fetchData = async () => {
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
    return data;
  };

  const getQuote = async () => {
    const data = await fetchData();
    const { quote, author } = data[0];
    setQuoteInfo({ quote, author });
    changeColor();
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div id="quote-box">
      <div id="quote-text">
        <span>❝ ❞</span>
        <h5 id="text">{quoteInfo.quote}</h5>
      </div>
      <div id="quote-author">
        <h5 id="author" style={{ textAlign: "end" }}>
          {" "}
          - {quoteInfo.author}
        </h5>
      </div>
      <div id="buttons">
        <a
          href={`https://twitter.com/intent/tweet?text="${quoteInfo.quote}" - ${quoteInfo.author}`}
          style={{ backgroundColor: color }}
          id="tweet-quote"
          target="_blank"
        >
          <img src={twitterIcon} />
        </a>
        <button
          id="new-quote"
          style={{ backgroundColor: color }}
          onClick={getQuote}
        >
          Get Quote
        </button>
      </div>
    </div>
  );
}

export default App;
