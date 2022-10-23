const products = document.querySelector(".pop-1") 
const categoryList = document.querySelectorAll(".category")
const categories = document.querySelector(".categories")
const textoCategorias = document.getElementById("texto_categorias")





const renderProduct = (product) => {
    const{name,description,price,photo} = product;
    return `
    
    
        <div class="card">
            <div class="photo_container">
                <img src= '${photo}' alt='${name}' />
            </div>    
            <p>${name}</p>
            <span>${description}</span>
            <div class="precio-button">
              <p class="price"> $${price}</p>
              <button class="btn_add">Agregar</button>
            </div>
          
        </div>
       
    `
}

const renderPopularProducts = ()=>{
  const activeproduct = productsData.map((category)=>category.category)
  if(categoryList.classList.contains("active") && activeproduct==="populares"
  )
  {products.innerHTML = productList.map(renderProduct).join('')}
}


const changeTextoCategorias = (producto) =>{
  const category = producto
  textoCategorias.textContent = category.toUpperCase()
}


const changeBtnActiveState = (selectedCategory)=>{
  const categories = [...categoryList];
  categories.forEach((categoryboton)=>{
    if(categoryboton.dataset.category !== selectedCategory){
      categoryboton.classList.remove("active")
      return};
      categoryboton.classList.add("active")
      
    })
    }
  




const renderFilteredProducts = (category) =>{
    const productList = productsData.filter(
    (producto) => producto.category === category
  );

  products.innerHTML = productList.map(renderProduct).join('')
}


const changeFilterState = (selectedCategory) => {
  changeBtnActiveState(selectedCategory);
}


const applyFilter = (e) =>{
  const selectedCategory = e.target.dataset.category;
  renderFilteredProducts(selectedCategory)
  changeFilterState(selectedCategory);
  changeTextoCategorias(selectedCategory)
  console.log(selectedCategory)
  
  ;
 
  }


const init = () =>{
  categories.addEventListener("click", applyFilter)
}




init()