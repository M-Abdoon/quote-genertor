//const serverUrl = "https://m-abdoon-quote-server.hosting.codeyourfuture.io";
const serverUrl = "http://127.0.0.1:3000";

function setup() {
  const quoteButton = document.getElementById("new-quote");
  const quoteText = document.getElementById("quote");
  const authorText = document.getElementById("author");
  const addAuthorInput = document.getElementById("add-author");
  const addQuoteInput = document.getElementById("add-quote");
  const addQuoteButton = document.getElementById("add-quote-button");

  async function getQuoteAPI() {
    const response = await fetch(serverUrl);
    const quoteString = await response.json();

    return quoteString;
  }

  async function showRandomQuote() {
    const fetchedQuote = await getQuoteAPI();
    quoteText.textContent = `“${fetchedQuote.quote}”`;
    authorText.textContent = `- ${fetchedQuote.author}`;
  }

  function pickFromArray(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
  }

  quoteButton.addEventListener("click", showRandomQuote);

  showRandomQuote();

  addQuoteButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const newQuote = addQuoteInput.value;
    const newAuthor = addAuthorInput.value;

    if (newQuote && newAuthor) {
      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quote: newQuote, author: newAuthor }),
      });

      if (response.ok) {
        addQuoteInput.value = "";
        addAuthorInput.value = "";
        alert("Quote added successfully!");
      } else {
        alert(`Failed to add quote.${response}`);
      }
    } else {
      alert("Please enter both a quote and an author.");
    }
  });
}

document.addEventListener("DOMContentLoaded", setup);
