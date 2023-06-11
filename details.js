
function createResponseDetails(product) {
    return `
    <div class="col-md-7">
    <div class="conteudo-container">
    <img class="card-img-top" src="${product.image}" alt="${product.title}">
      <p class="ratings"><h3>${displayRating(product.rating.rate)}</p>
      <h1 class="title">${product.title}</h1>
      <p class="stock">Estação para ser de melhor uso: ${product.season}</p>
      <ul class="lista-sem-estilo">
        <li>  <p class="card-text category"><h3>${product.category}</p></li>
        <li>  <p class="card-text category"><h4>${product.description}</p></li>
      </ul>
      <div class="description">
        <div class="price-container">
          <span class="old-price"><h2>R$ ${product.price}</h2></span>
          <span class="price"><h1>R$ 512</h1></span>
          <button> ADD TO CART </button>
        </div>
      </div>
    </div>
  </div>
  </div>
    `;
  }
  
  
 
  function getProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }
  

  async function fetchProducts() {
    try {
      const productId = getProductId();
      const url = `http://diwserver.vps.webdock.cloud:8765/products/${productId}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
  function displayRating(rate) {
    const roundedRate = Math.round(rate);
    let stars = "";
    for (let i = 0; i < roundedRate; i++) {
      stars += "★";
    }
    for (let j = roundedRate; j < 5; j++) {
      stars += "☆";
    }
    return stars;
  }
  
  async function renderPage() {
    const product = await fetchProducts();
    const productDetails = createResponseDetails(product);
    const productDetailsContainer = document.querySelector('#response-details');
    productDetailsContainer.innerHTML = productDetails;
  }
  
  renderPage();