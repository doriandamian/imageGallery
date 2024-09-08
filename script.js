const selectElement = document.getElementById("authors");
const contentsDiv = document.getElementById("contents");
let api;

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("https://picsum.photos/v2/list");
  if (!response.ok) {
    throw new Error(`An error has occured ${response.status}`);
  }
  api = await response.json();

  console.log(api);

  const authors = [...new Set(api.map((item) => item.author))];

  authors.forEach((author) => {
    const option = document.createElement("option");
    option.value = author;
    option.textContent = author;
    selectElement.appendChild(option);
  });

  populateCards();
});

async function populateCards() {
  contentsDiv.innerHTML = "";
  const filtered = api.filter((item) => item.author === selectElement.value);
  const fragment = document.createDocumentFragment(); // .gaia says it is faster using document fragment
  for (const item of filtered) {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = item.download_url;

    const title = document.createElement("h2");
    title.textContent = item.author;

    const description = document.createElement("p");
    description.textContent =
      "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story";
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);

    fragment.appendChild(card);
  }
  contentsDiv.appendChild(fragment);
}

selectElement.addEventListener("change", populateCards);
