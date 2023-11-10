const BASE_URL = "https://staging.iamdave.ai";

const HEADERS = {
  "Content-Type": "application/json",
  "X-I2CE-ENTERPRISE-ID": "dave_vs_covid",
  "X-I2CE-USER-ID": "ananth+covid@i2ce.in",
  "X-I2CE-API-KEY": "0349234-38472-1209-2837-3432434",
};

const supplierList = document.getElementById("supplier-list");
const categoryFilter = document.getElementById("category");
const channelFilter = document.getElementById("channel");
const stateFilter = document.getElementById("state");
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
let currentPage = 1;

// Fetch and display suppliers
function displaySuppliers(page = 1, filters = {}) {
  let url = `${BASE_URL}/list/supply?_page_number=${page}`;

  if (filters.category) {
    url += `&category=${filters.category}`;
  }
  if (filters.channel) {
    url += `&channel=${filters.channel}`;
  }
  if (filters.state) {
    url += `&state=${filters.state}`;
  }

  fetch(url, {
    headers: HEADERS,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      supplierList.innerHTML = ""; // Clear previous results

      data.data.forEach((supplier) => {
        // Create supplier cards and append them to the list
        const card = document.createElement("div");
        card.className = "supplier-card";
        card.innerHTML = `
                    <h2>${supplier.category}</h2>
                    <p>Channel: ${supplier.channel}</p>
                    <p>${supplier.request_description}</p>
                    <p>Contact Numbers: ${supplier.contact_numbers.join(
                      ", "
                    )}</p>
                    <p>State: ${supplier.state}</p>
                    <p>District: ${supplier.district}</p>
                    <p>Source Time: ${supplier.source_time}</p>
                `;
        supplierList.appendChild(card);
      });
      if (data.is_last) {
        nextPageButton.disabled = true;
      } else {
        nextPageButton.disabled = false;
      }
    })
    .catch((error) => {
      console.error("Error fetching suppliers:", error);
    });
}

//page reload
function reload() {
  window.location.reload();
}

// Event listeners for filters
categoryFilter.addEventListener("change", () => {
  const filters = {
    category: categoryFilter.value,
    channel: channelFilter.value,
    state: stateFilter.value,
  };
  currentPage = 1;
  displaySuppliers(currentPage, filters);
});

channelFilter.addEventListener("change", () => {
  // Update filters and fetch data
  const filters = {
    category: categoryFilter.value,
    channel: channelFilter.value,
    state: stateFilter.value,
  };
  currentPage = 1;
  displaySuppliers(currentPage, filters);
});

stateFilter.addEventListener("change", () => {
  // Update filters and fetch data
  const filters = {
    category: categoryFilter.value,
    channel: channelFilter.value,
    state: stateFilter.value,
  };
  currentPage = 1;
  displaySuppliers(currentPage, filters);
});

// Event listeners for pagination
const currentPageNumber = document.getElementById("number");
currentPageNumber.innerText = currentPage;

prevPageButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    currentPageNumber.innerText = currentPage;
    displaySuppliers(currentPage);
  }
});

nextPageButton.addEventListener("click", () => {
  currentPage++;
  currentPageNumber.innerText = currentPage;
  displaySuppliers(currentPage);
});

displaySuppliers(currentPage);

// Fetch and populate filter options
// function populateFilterOptions(filterType, filterElement) {
//     fetch(`${BASE_URL}/unique/supply/${filterType}`, {
//         headers: HEADERS,
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             console.log(data)
//             // const options = data.data[filterType]; // Assuming the response property is named after the filter type
//             // options.forEach((option) => {
//             //     const optionElement = document.createElement('option');
//             //     optionElement.value = option;
//             //     optionElement.textContent = option;
//             //     filterElement.appendChild(optionElement);
//             // });
//         })
//         .catch((error) => {
//             console.error(`Error fetching ${filterType}s:`, error);
//         });

// }

// populateFilterOptions('category', categoryFilter);
// populateFilterOptions('channel', channelFilter);
// populateFilterOptions('state', stateFilter);
