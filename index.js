const products = document.querySelector(".pop-1");
const recommendationsContainer = document.querySelector(
  ".recommendations_container"
);
const categoryList = document.querySelectorAll(".category");
const categories = document.querySelector(".categories");
const textoCategorias = document.getElementById("texto_categorias");
const carrito = document.querySelector(".carrito");
const cartMenu = document.querySelector(".toggle-cart");
const hamburguer = document.getElementById("toggle-menu");
const closeCart = document.querySelector(".close-cart");
const overlay = document.querySelector(".overlay");
const cartContainer = document.querySelector(".products-cart");
const total = document.querySelector(".total");
const contador = document.querySelector(".contador");
const btnBuy = document.querySelector(".btn-buy");
const btnSeeMore = document.querySelector(".btn-seeMore");
const confirmation = document.querySelector(".confirmation")
const subTotal = document.querySelector(".subTotalPrice")
const envioContainer = document.querySelector(".envio")
const toggleMenu = document.querySelector("#toggle-menu_icon")
const navbarUl = document.querySelector("#navbar_ul");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveToLocalStorage = (card) => {
  localStorage.setItem("cart", JSON.stringify(card));
};

const renderProduct = (product) => {
  const { id, name, description, price, photo } = product;
  return `
        <div class="card">
            <div class="photo_container">
                <img src= '${photo}' alt='${name}' />
            </div>    
            <p>${name}</p>
            <span>${description}</span>
            <div class="precio-button">
              <p class="price"> $${price}</p>
              <button class="btn_add" 
							data-id=${id} 
							data-name=${name} 
							data-description=${description} 
							data-price=${price} 
							data-photo=${photo}
							>Agregar</button>
            </div>
          
        </div>
       
    `;
};

const renderRecommendations = (product) => {
  const { id, name, description, price, photo } = product;
  return `
          <div class="recommendations_card">
            <img src=${photo} alt=${name} />
            <div>
              <h3>${name}</h3>
              <p class="description">${description}</p>
              <p class="price">$${price}</p>
            </div>
            <button class="btn_add"
							data-id=${id} 
							data-name=${name} 
							data-description=${description} 
							data-price=${price} 
							data-photo=${photo}
						>Agregar</button>
          </div>
	`;
};

const renderRecommendationsProducts = () => {
  const recomendation = productsData.filter(
    (category) => category.category === "recomendado"
  );
  recommendationsContainer.innerHTML = recomendation
    .map(renderRecommendations)
    .join("");
};

const renderPopularProducts = () => {
  const activeproduct = productsData.filter(
    (category) => category.category === "populares"
  );
  const mapPopular = activeproduct.map((cat) => cat.category);
  products.innerHTML = activeproduct.map(renderProduct).join("");
  changeTextoCategorias(mapPopular[0].toString());
};

const changeTextoCategorias = (producto) => {
  textoCategorias.textContent = producto.toUpperCase();
};

const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoryList];
  categories.forEach((categoryboton) => {
    if (categoryboton.dataset.category !== selectedCategory) {
      categoryboton.classList.remove("active");
      return;
    }
    categoryboton.classList.add("active");
  });
};

const renderFilteredProducts = (category) => {
  const productList = productsData.filter(
    (producto) => producto.category === category
  );

  products.innerHTML = productList.map(renderProduct).join("");
};

const changeFilterState = (selectedCategory) => {
  changeBtnActiveState(selectedCategory);
};

const applyFilter = (e) => {
  const selectedCategory = e.target.dataset.category;
  renderFilteredProducts(selectedCategory);
  changeFilterState(selectedCategory);
  changeTextoCategorias(selectedCategory);
};

const createCartProduct = (producto) => {
  cart = [...cart, { ...producto, quantity: 1 }];
};

const productData = (id, name, description, price, photo) => {
  return { id, name, description, price, photo };
};

const checkCartState = () => {
  saveToLocalStorage(cart);
  renderCart(cart);
	showSubTotal(cart)
  showTotal(cart);
	showEnvio(cart)
  contadorCarrito();
  disableBtn(btnBuy);
  // disableBtn(btnEmpty);
};

const confirmationMsg = () => {
	confirmation.classList.remove("toggle-confirmation")
	setTimeout(function(){
		confirmation.classList.add("toggle-confirmation")
	}, 2000)
}

const addProduct = (e) => {
  if (!e.target.classList.contains("btn_add")) return;
  const { id, name, description, price, photo } = e.target.dataset;
  const producto = productData(id, name, description, price, photo);
  if (isExistingCartProduct(producto)) {
    addUnit(producto);
		confirmationMsg()
  } else {
    createCartProduct(producto);
		confirmationMsg()
  }
  checkCartState();
};
// CARRITO

const renderCartProduct = (product) => {
  const { id, name, description, price, photo, quantity } = product;
  return `
        <div class="cart-item">
          <img src='${photo}' alt=${name} />
          <div class="item-info">
            <h3 class="item-tittle">${name}</h3>
            <p class="item-description">${description}</p>
            <span class="item-price">$${price}</span>
          </div>
          <div class="item-handler">
            <span class="quantity-handler down" data-id=${id}>-</span>
            <span class="item-quantity">${quantity}</span>
            <span class="quantity-handler up" data-id=${id}>+</span>
          </div>
        </div>
	`;
};

const renderCart = () => {
  if (!cart.length) {
    cartContainer.innerHTML = `<p class="empty-p">El carrito esta vacio</p>`;
    return;
  }
  cartContainer.innerHTML = cart.map(renderCartProduct).join(" ");
};

const toggleCart = () => {
  cartMenu.classList.toggle("toggle-cart");
  overlay.classList.toggle("show-overlay");
};

const closeOnClick = () => {
  cartMenu.classList.add("toggle-cart");
  overlay.classList.add("show-overlay");
};

const closeOnScroll = () => {
  cartMenu.classList.add("toggle-cart");
  overlay.classList.add("show-overlay");
};

const getSubTotal = () => {
  return cart.reduce(
    (acc, cur) => acc + Number(cur.price) * Number(cur.quantity),
    0
  );
}

const getTotal = () => {
const envioPrice = envio.map(price => price.price)
const total = Number(envioPrice) + getSubTotal()
return total
};

const isExistingCartProduct = (producto) => {
  return cart.find((item) => item.id === producto.id);
};

const addUnit = (producto) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === producto.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct;
  });
};

const envioPrice = () => {
const envioPrecio = envio.map(price => price.price)
const envioNumber = Number(envioPrecio)

return envioNumber
}

const showEnvio = () => {
	if(!cart.length) {
		envioContainer.innerHTML = "$ 0.00"
		return
	};
	envioContainer.innerHTML = `$ ${envioPrice().toFixed(2)}`
}

const showTotal = () => {
	if(!cart.length) {
		total.innerHTML = "$ 0.00"
		return
	};
  total.innerHTML = `$ ${getTotal().toFixed(2)}`;
};

const showSubTotal =  () => {
	subTotal.innerHTML = `$ ${getSubTotal().toFixed(2)}`
}

const contadorCarrito = () => {
  if (!cart.length) {
    contador.classList.add("active-contador");
    return;
  }
  contador.classList.remove("active-contador");
  contador.innerHTML = cart.length;
};

const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("disable");
    return;
  }
  btn.classList.remove("disable");
};

const removeProductFromCart = (existingProduct) => {
  cart = cart.filter((producto) => producto.id !== existingProduct.id);
  checkCartState();
};

const substractUnit = (existingProduct) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === existingProduct.id
      ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
      : cartProduct;
  });
};

const handleMinus = (id) => {
  const cardProduct = cart.find((product) => product.id === id);

  if (cardProduct.quantity === 1) {
    if (window.confirm("Desea quitar el producto del carrito?")) {
      removeProductFromCart(cardProduct);
			showEnvio(cart)
			showTotal(cart)
    }
    return;
  }
  substractUnit(cardProduct);
};

const handlePlus = (id) => {
  const cardProduct = cart.find((product) => product.id === id);
  addUnit(cardProduct);
};

const handleQuantity = (e) => {
  if (!e.target.dataset.id) return;
  if (e.target.classList.contains("down")) {
    handleMinus(e.target.dataset.id);
  } else if (e.target.classList.contains("up")) {
    handlePlus(e.target.dataset.id);
  }
  checkCartState();
};

const resetCart = () => {
	cart = []
	checkCartState()
}

const completeBuy = () => {
	if(!cart.length) return;
	if(window.confirm("Completamos su compra ?")){
		resetCart()
		alert("La compra se ha realizado correctamente")
	}
}

const toggleMenuResponsive = () => {
  navbarUl.classList.toggle("navbar_list")
  navbarUl.classList.toggle("navbar_list-responsive")
}


const init = () => {
  categories.addEventListener("click", applyFilter);
  cartContainer.addEventListener("click", handleQuantity);
  window.addEventListener("DOMContentLoaded", renderPopularProducts);
  window.addEventListener("DOMContentLoaded", renderRecommendationsProducts);
  carrito.addEventListener("click", toggleCart);
  toggleMenu.addEventListener("click", toggleMenuResponsive);
  closeCart.addEventListener("click", toggleCart);
  overlay.addEventListener("click", closeOnClick);
  window.addEventListener("scroll", closeOnScroll);
  window.addEventListener("DOMContentLoaded", renderCart);
  products.addEventListener("click", addProduct);
  recommendationsContainer.addEventListener("click", addProduct);
	btnBuy.addEventListener("click", completeBuy)
  disableBtn(btnBuy);
  contadorCarrito();
};

init();
