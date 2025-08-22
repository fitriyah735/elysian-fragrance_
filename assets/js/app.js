
// Data Produk
const products = [
  {id:1, name:"Elysian Aurum No.1", price: 1850000, img:"assets/svg/perfume_1.svg", top:true},
  {id:2, name:"Elysian Argent No.2", price: 2100000, img:"assets/svg/perfume_2.svg", top:true},
  {id:3, name:"Elysian Noir No.3", price: 1950000, img:"assets/svg/perfume_3.svg", top:true},
  {id:4, name:"Elysian Luxe No.4", price: 2350000, img:"assets/svg/perfume_4.svg", top:true},
  {id:5, name:"Elysian Royale No.5", price: 2650000, img:"assets/svg/perfume_5.svg", top:true},
  {id:6, name:"Elysian Imperial No.6", price: 2990000, img:"assets/svg/perfume_1.svg"},
  {id:7, name:"Elysian Platinum No.7", price: 3150000, img:"assets/svg/perfume_2.svg"},
  {id:8, name:"Elysian Velvet No.8", price: 1890000, img:"assets/svg/perfume_3.svg"},
];

// Helpers
const rupiah = (n)=> new Intl.NumberFormat('id-ID', {style:'currency', currency:'IDR', maximumFractionDigits:0}).format(n);

const cartKey = "elysian_cart_v1";
const testiKey = "elysian_testi_v1";

const getCart = ()=> JSON.parse(localStorage.getItem(cartKey) || "[]");
const setCart = (v)=> localStorage.setItem(cartKey, JSON.stringify(v));

const getTesti = ()=> JSON.parse(localStorage.getItem(testiKey) || "[]");
const setTesti = (v)=> localStorage.setItem(testiKey, JSON.stringify(v));

function renderTopSlider(){
  const top = products.filter(p=>p.top).slice(0,5);
  const slides = document.querySelector(".slides");
  slides.innerHTML = top.map(p => `
    <div class="slide">
      <div class="img">
        <img src="${p.img}" alt="${p.name}">
      </div>
      <div class="info">
        <h3>${p.name}</h3>
        <p class="section-sub">Aroma mewah dengan sentuhan emas, silver, dan nuansa noir.</p>
        <div class="price">${rupiah(p.price)}</div>
        <div class="cta">
          <button class="btn btn-primary" data-buy="${p.id}">Tambah ke Keranjang</button>
          <button class="btn btn-outline" data-detail="${p.id}">Detail</button>
        </div>
      </div>
    </div>
  `).join("");
}

function renderGrid(){
  const grid = document.querySelector(".grid");
  grid.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}">
      <div class="title">${p.name}</div>
      <div class="price">${rupiah(p.price)}</div>
      <button class="btn btn-primary" data-buy="${p.id}">Tambahkan ke Keranjang</button>
    </div>
  `).join("");
}

function updateCartBadge(){
  const count = getCart().reduce((a,b)=>a+b.qty,0);
  const el = document.querySelector("#cart-count");
  el.textContent = count;
}

function attachBuyHandlers(){
  document.body.addEventListener("click", (e)=>{
    const buyId = e.target.getAttribute("data-buy");
    if(buyId){
      const id = parseInt(buyId,10);
      const prod = products.find(p=>p.id===id);
      const cart = getCart();
      const existing = cart.find(i=>i.id===id);
      if(existing) existing.qty += 1;
      else cart.push({id, name:prod.name, price:prod.price, qty:1});
      setCart(cart);
      updateCartBadge();
    }
  });
}

function checkout(){
  const cart = getCart();
  if(cart.length===0){ alert("Keranjang masih kosong."); return; }
  const total = cart.reduce((s,i)=> s + i.price*i.qty, 0);
  const lines = cart.map(i=> `- ${i.name} x${i.qty} @ ${rupiah(i.price)}`).join('%0A');
  const msg = `Halo Elysian Fragrance,%0ASaya ingin checkout:%0A${lines}%0A%0ATotal: ${rupiah(total)}%0AAlamat: Jalan Bolak Balik No.01, Bogor`;
  // WhatsApp intent (ubah nomor sesuai kebutuhan toko)
  const wa = `https://wa.me/6281234567890?text=${msg}`;
  window.open(wa, '_blank');
}

function renderTestimonials(){
  const wrap = document.querySelector("#testi-wrap");
  const seed = [
    {name:"Dewi", city:"Jakarta", text:"Wangi elegan, tahan lama seharian.", date:"2025-07-10"},
    {name:"Raka", city:"Bogor", text:"Packaging premium dan aromanya eksklusif.", date:"2025-06-22"},
    {name:"Sinta", city:"Bandung", text:"Harga memang mahal tapi kualitas sepadan.", date:"2025-05-18"},
  ];
  const list = getTesti();
  if(list.length===0){ setTesti(seed); }
  const data = getTesti();
  wrap.innerHTML = data.map(t => `
    <div class="testi">
      <div>"${t.text}"</div>
      <div class="small">— ${t.name} • ${t.city} • <span>${t.date}</span></div>
    </div>
  `).join("");
}

function handleTestiForm(){
  const form = document.querySelector("#testi-form");
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const name = form.querySelector("[name=name]").value.trim() || "Anonim";
    const city = form.querySelector("[name=city]").value.trim() || "-";
    const text = form.querySelector("[name=text]").value.trim();
    if(!text){ alert("Isi testimoni terlebih dahulu."); return; }
    const date = new Date().toISOString().slice(0,10);
    const list = getTesti();
    list.unshift({name, city, text, date});
    setTesti(list);
    renderTestimonials();
    form.reset();
  });
}

function initSlider(){
  const slides = document.querySelector(".slides");
  let index = 0;
  const total = slides.children.length;
  const go = (i)=>{
    index = (i+total) % total;
    slides.style.transform = `translateX(-${index*100}%)`;
  }
  document.querySelector("#prev").addEventListener("click", ()=> go(index-1));
  document.querySelector("#next").addEventListener("click", ()=> go(index+1));
  setInterval(()=> go(index+1), 5000);
}

function init(){
  renderTopSlider();
  renderGrid();
  renderTestimonials();
  attachBuyHandlers();
  updateCartBadge();
  handleTestiForm();
  initSlider();
  document.querySelector("#checkout").addEventListener("click", checkout);
}

document.addEventListener("DOMContentLoaded", init);
