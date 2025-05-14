let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

document.addEventListener('click', e => {
  if (e.target.matches('.add-to-cart')) {
    const name = e.target.dataset.name;
    const price = parseFloat(e.target.dataset.price);
    cart.push({ name, price });
    saveCart();
    alert(`${name} added to cart`);
  }

  if (e.target.matches('.remove-item')) {
    const idx = parseInt(e.target.dataset.index, 10);
    cart.splice(idx, 1);
    saveCart();
  }

  if (e.target.id === 'clear-cart') {
    cart = [];
    saveCart();
  }
});

function renderCart() {
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if (!container || !totalEl) return;
  container.innerHTML = '';
  let total = 0;
  cart.forEach((item, i) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <span>${item.name} – $${item.price.toFixed(2)}</span>
      <button class="remove-item" data-index="${i}" aria-label="Remove ${item.name}">✕</button>
    `;
    container.appendChild(div);
    total += item.price;
  });
  totalEl.textContent = `Total: $${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();

  document.querySelector('.next')?.addEventListener('click', () => {
    const slides = document.querySelector('.slides');
    const imgs = slides.querySelectorAll('img');
    let idx = slides.dataset.index ? parseInt(slides.dataset.index) : 0;
    idx = (idx + 1) % imgs.length;
    slides.style.transform = `translateX(-${idx * 100}%)`;
    slides.dataset.index = idx;
  });

  document.querySelector('.prev')?.addEventListener('click', () => {
    const slides = document.querySelector('.slides');
    const imgs = slides.querySelectorAll('img');
    let idx = slides.dataset.index ? parseInt(slides.dataset.index) : 0;
    idx = (idx - 1 + imgs.length) % imgs.length;
    slides.style.transform = `translateX(-${idx * 100}%)`;
    slides.dataset.index = idx;
  });
});

function filterProducts(category) {
  document.querySelectorAll('.product').forEach(card => {
    card.style.display =
      category === 'all' || card.classList.contains(category) ? 'block' : 'none';
  });
}

