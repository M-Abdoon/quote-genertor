function setup() {
  const quoteButton = document.getElementById("new-quote");
  const quoteText = document.getElementById("quote");
  const authorText = document.getElementById("author");

  async function getQuoteAPI() {
    const response = await fetch(
      "https://m-abdoon-quote-server.hosting.codeyourfuture.io/",
    );
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
}

document.addEventListener("DOMContentLoaded", setup);
