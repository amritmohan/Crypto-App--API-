const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const searchInput = document.getElementById("search");
const tableBody = document.getElementById("tableBody");
const sortMarketCapButton = document.getElementById("sortMarketCap");
const sortPercentageChangeButton = document.getElementById("sortPercentageChange");

let coinData = [];

// Fetch data using async/await for cleaner code
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    coinData = data;
    renderTable(coinData);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

// Display data in the table
function renderTable(data) {
  tableBody.innerHTML = ""; // Clear existing table content

  data.forEach((coin) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><img src="${coin.image}" alt="${coin.name}">${coin.name}</td>
            <td>${coin.symbol.toUpperCase()}</td>
            <td>$${coin.current_price.toFixed(2)}</td>
            <td>${coin.total_volume.toLocaleString()}</td>
            <td>$${coin.market_cap.toLocaleString()}</td>
            <td>${coin.price_change_percentage_24h.toFixed(2)}%</td>
        `;
    tableBody.appendChild(row);
  });
}

// Filter coins by name based on search input
searchInput.addEventListener("input", (event) => {
  const searchQuery = event.target.value.toLowerCase();
  const filteredData = coinData.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery)
  );
  renderTable(filteredData);
});

// Sort coins by market cap (descending)
sortMarketCapButton.addEventListener("click", () => {
  const sortedByMarketCap = [...coinData].sort((a, b) => b.market_cap - a.market_cap);
  renderTable(sortedByMarketCap);
});

// Sort coins by percentage change (descending)
sortPercentageChangeButton.addEventListener("click", () => {
  const sortedByPercentageChange = [...coinData].sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  );
  renderTable(sortedByPercentageChange);
});

// Initial fetch using async/await method
fetchData();
