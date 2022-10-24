const products = document.querySelector(".pop-1");
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
const contador = document.querySelector(".contador")
const btnBuy = document.querySelector(".btn-buy")
const btnSeeMore = document.querySelector(".btn-seeMore")

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
	showTotal(cart);
	contadorCarrito()
	disableBtn(btnBuy);
	// disableBtn(btnEmpty);
};

const addProduct = (e) => {
	if (!e.target.classList.contains("btn_add")) return;
	const { id, name, description, price, photo } = e.target.dataset;
	const producto = productData(id, name, description, price, photo);
	if(isExistingCartProduct(producto)){
		addUnit(producto)
	}else{
	createCartProduct(producto);
	}
	checkCartState();
};
// CARRITO

const renderCartProduct = (product) => {
	const { id, name, description, price, photo, quantity } = product;
	return `
        <div class="cart-item">
          <img src=${photo} alt=${name} />
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
	cartContainer.innerHTML = cart.map(renderCartProduct).join("");
};

const toggleCart = () => {
	cartMenu.classList.toggle("toggle-cart");
	if ((hamburguer.checked = true)) {
		hamburguer.checked = false;
	}
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

const getTotal = () => {
	return cart.reduce(
		(acc, cur) => acc + Number(cur.price) * Number(cur.quantity),
		0
	);
};

const isExistingCartProduct = (producto) => {
	return cart.find(item => item.id === producto.id)
}

const addUnit = (producto) => {
	cart = cart.map(cartProduct => {
		return cartProduct.id === producto.id
		? {...cartProduct, quantity: cartProduct.quantity + 1}
		: cartProduct
	})
}

const showTotal = () => {
	total.innerHTML = `$ ${getTotal().toFixed(2)}`;
};

const contadorCarrito = () => {
if(!cart.length){
	contador.classList.add("active-contador")
	return;
}
contador.classList.remove("active-contador")
contador.innerHTML = cart.length;
}

const disableBtn = (btn) => {
	if(!cart.length){
		btn.classList.add("disable")
		return;
	}
	btn.classList.remove("disable")
}

const init = () => {
	categories.addEventListener("click", applyFilter);
	window.addEventListener("DOMContentLoaded", renderPopularProducts);
	carrito.addEventListener("click", toggleCart);
	closeCart.addEventListener("click", toggleCart);
	overlay.addEventListener("click", closeOnClick);
	window.addEventListener("scroll", closeOnScroll);
	window.addEventListener("DOMContentLoaded", renderCart);
	products.addEventListener("click", addProduct);
	disableBtn(btnBuy)
	contadorCarrito()
};

init();
