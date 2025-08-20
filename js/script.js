// ===== Carrinho (localStorage) + Badge =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function persistCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount(){
  const c = document.getElementById("cart-count");
  if (c) c.textContent = cart.length;
}

function addToCart(name, price){
  cart.push({ name, price });
  persistCart();
  const link = document.querySelector(".cart-link");
  if (link){ link.classList.add("pulse"); setTimeout(()=>link.classList.remove("pulse"), 350); }
  alert(`${name} adicionado ao carrinho!`);
}

// usado nos cards da home
function addCardToCart(btn){
  const card = btn.closest(".card");
  const name = card.dataset.name;
  const price = parseFloat(card.dataset.price);
  addToCart(name, price);
}

// ===== BUSCA (filtra cards pelo título) =====
function searchProducts(q){
  const term = (q || "").trim().toLowerCase();
  const cards = document.querySelectorAll(".grid .card");
  cards.forEach(c => {
    const name = c.querySelector("h3").textContent.toLowerCase();
    c.style.display = !term || name.includes(term) ? "" : "none";
  });
}

// ===== Pág. Carrinho =====
function renderCart(){
  const list = document.getElementById("cart-items");
  const total = document.getElementById("total");
  if (!list || !total) return;

  list.innerHTML = "";
  let soma = 0;

  cart.forEach((item, i) => {
    soma += item.price;

    const li = document.createElement("li");
    li.className = "cart-item";
    li.textContent = `${item.name} — R$ ${item.price.toFixed(2)}`;

    const del = document.createElement("button");
    del.textContent = "remover";
    del.className = "btn btn-clear";
    del.style.marginLeft = "8px";
    del.onclick = () => {
      cart.splice(i,1);
      persistCart();
      renderCart();
    };

    li.appendChild(del);
    list.appendChild(li);
  });

  total.textContent = `Total: R$ ${soma.toFixed(2)}`;
}

function clearCart(){
  cart = [];
  persistCart();
  renderCart();
}

// ===== Checkout fictício =====
function fakeCheckout(e){
  e.preventDefault();
  alert("Pedido confirmado! (fictício) Obrigado por testar a MiniStore 💜");
  cart = [];
  persistCart();
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
});
