const productsData = [
    { id: 1, category: 'waffle', title: 'Çilekli Waffle',  desc: 'With fresh strawberries, chocolate, and whipped cream.', price: 125, imgSrc: 'img/1.jpg' },
    { id: 2, category: 'waffle', title: 'Muzlu Waffle',  desc: 'With fresh strawberries, chocolate, and whipped cream.',  price: 120, imgSrc: 'img/2.jpg' },
    { id: 3, category: 'waffle', title: 'Oreo Waffle',  desc: 'With fresh strawberries, chocolate, and whipped cream.',  price: 130, imgSrc: 'img/3.jpg' },
    { id: 4, category: 'waffle', title: 'Lotus Waffle', desc: 'With fresh strawberries, chocolate, and whipped cream.',  price: 135, imgSrc: 'img/4.jpg' },
    
    { id: 5, category: 'pastalar', title: 'Çikolatalı Pasta',  desc: 'Soft chocolate cake and delicious ganache.', price: 165, imgSrc: 'img/5.jpg' },
    { id: 6, category: 'pastalar', title: 'Red Velvet',  desc: 'Velvety textured cake and special cream filling.',  price: 170, imgSrc: 'img/8.jpg' },
    { id: 7, category: 'pastalar', title: 'San Sebastian',  desc: 'Caramelized outer texture, creamy inner consistency.', price: 145, imgSrc: 'img/13.jpg' },

    { id: 8, category: 'sicak', title: 'Türk Kahvesi', desc: 'Freshly ground using traditional methods.', price: 60, imgSrc: 'img/22.jpg' },
    { id: 9, category: 'sicak', title: 'Latte', desc: 'Rich espresso and velvety milk',  price: 75, imgSrc: 'img/33.jpg' },

    { id: 10, category: 'soguk', title: 'Ice Latte',  desc: 'Cold milk, espresso, and ice.',price: 85, imgSrc: 'img/44.jpg' },
    { id: 10, category: 'soguk', title: 'Cool Lime',  desc: 'Refreshing iced drink with blackberries',price: 85, imgSrc: 'img/11.jpg' },
    { id: 11, category: 'soguk', title: 'Cool Lime',  desc: 'Refreshing mint and lime',  price: 80, imgSrc: 'img/55.jpg' }
];

let currentQty = 1;
let activeProductId = null;
let currentLang = 'tr'; 

document.addEventListener("DOMContentLoaded", () => {
    switchCategory('waffle');
});

function toggleMobileMenu(show) {
    const menu = document.getElementById("mobile-overlay-menu");
    if (show) menu.classList.remove("hidden");
    else menu.classList.add("hidden");
}

function switchCategory(catName) {
    const grid = document.getElementById("products-grid");
    if(!grid) return;
    
    grid.innerHTML = ""; 

    const buttons = document.querySelectorAll(".tabs-row .tab-btn");
    buttons.forEach(btn => {
        if(btn.getAttribute("onclick") && btn.getAttribute("onclick").includes(catName)) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    const filtered = productsData.filter(p => p.category === catName);

    filtered.forEach(p => {
        const title = (currentLang === 'tr' || !p.titleEn) ? p.title : p.titleEn;
        const desc = (currentLang === 'tr' || !p.descEn) ? p.desc : p.descEn;
        
        const card = document.createElement("div");
        card.className = "product-card";
        
        card.innerHTML = `
            <div class="prod-img-placeholder" onclick="openModal(${p.id})">
                <img src="${p.imgSrc}" alt="${title}" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'; this.parentNode.innerText='📸 Fotoğraf Yükleniyor...'">
            </div>
            <div class="prod-details">
                <div>
                    <h3 class="prod-title" onclick="openModal(${p.id})" style="cursor:pointer;">${title}</h3>
                    <p class="prod-desc">${desc}</p>
                </div>
                <div class="prod-bottom">
                    <span class="prod-price">${p.price} TL</span>
                    <button class="add-btn-small" onclick="openModal(${p.id})">+</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterCategory(catName) {
    switchCategory(catName);
}

function openModal(id) {
    const item = productsData.find(p => p.id === id);
    if(!item) return;

    activeProductId = id; 
    currentQty = 1;
    document.getElementById("qty-val").innerText = currentQty;
    
    document.getElementById("modal-title").innerText = (currentLang === 'tr' || !item.titleEn) ? item.title : item.titleEn;
    document.getElementById("modal-desc").innerText = (currentLang === 'tr' || !item.descEn) ? item.desc : item.descEn;
    document.getElementById("modal-price").innerText = `${item.price} TL`;
    
    const modalImgBox = document.querySelector(".modal-img-placeholder");
    modalImgBox.innerHTML = `<img src="${item.imgSrc}" alt="" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'; this.parentNode.innerText='🍰'">`;

    document.getElementById("detail-modal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("detail-modal").classList.add("hidden");
    activeProductId = null;
}

function changeQty(amt) {
    currentQty += amt;
    if(currentQty < 1) currentQty = 1;
    document.getElementById("qty-val").innerText = currentQty;
}

function sendWhatsAppOrder() {
    if (!activeProductId) return;

    const item = productsData.find(p => p.id === activeProductId);
    if (!item) return;

    const phoneNumber = "905551234567"; 
    const productTitle = item.title; 
    const totalPrice = item.price * currentQty;

    let message = "";
    if (currentLang === 'tr') {
        message = `Merhaba, web sitenizden sipariş vermek istiyorum:\n\n` +
                  `📦 *Ürün:* ${productTitle}\n` +
                  `🔢 *Adet:* ${currentQty} x ${item.price} TL\n` +
                  `💰 *Toplam Tutar:* ${totalPrice} TL\n\n` +
                  `Sipariş detaylarını görüşebilir miyiz?`;
    } else {
        message = `Hello, I would like to place an order from your website:\n\n` +
                  `📦 *Product:* ${productTitle}\n` +
                  `🔢 *Quantity:* ${currentQty} x ${item.price} TL\n` +
                  `💰 *Total Amount:* ${totalPrice} TL\n\n` +
                  `Can we discuss the order details?`;
    }

    // Telefon ve masaüstü uyumluluğu için dinamik link oluşturma
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}