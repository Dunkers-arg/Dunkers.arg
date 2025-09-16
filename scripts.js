// Click en Dunkers vuelve al inicio
const logo = document.getElementById('logo');
if (logo) {
  logo.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
}

// Modal productos
const modal = document.getElementById("productModal");
const modalImg = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const closeBtn = document.querySelector(".close");
const thumbnailsContainer = document.getElementById("modalThumbnails");
const whatsappBtn = document.getElementById("whatsappBtn");
const talleSelect = document.getElementById("talleSelect");

// Abrir modal
document.querySelectorAll('.section-item').forEach(item => {
  item.addEventListener('click', () => {
    document.body.style.overflow = "hidden";
    modal.style.display = "block";

    // Datos del producto
    const name = item.dataset.name || "";
    const price = item.dataset.price || "";

    modalName.textContent = name;
    modalPrice.textContent = price;

    // Thumbs desde data-thumbs
    let thumbs = [];
    try {
      thumbs = JSON.parse(item.dataset.thumbs || "[]");
    } catch (e) {
      console.error("Error leyendo data-thumbs", e);
    }

    // Mostrar imagen principal (primera del array o la img normal)
    if (thumbs.length > 0) {
      modalImg.src = thumbs[0];
    } else {
      modalImg.src = item.querySelector("img").src;
    }

    // Miniaturas
    thumbnailsContainer.innerHTML = "";
    thumbs.forEach((src, index) => {
      const thumb = document.createElement("img");
      thumb.src = src;
      thumb.alt = name + " miniatura";

      if (index === 0) thumb.classList.add("active");

      thumb.addEventListener("click", () => {
        modalImg.src = src;
        thumbnailsContainer.querySelectorAll("img").forEach(img => img.classList.remove("active"));
        thumb.classList.add("active");

        // Actualizar WhatsApp con la nueva foto
        updateWhatsApp();
      });

      thumbnailsContainer.appendChild(thumb);
    });

    // Función para actualizar el enlace de WhatsApp
    const updateWhatsApp = () => {
      if (whatsappBtn && talleSelect) {
        const talle = talleSelect.value || "Sin talle";
        const mainImage = modalImg.src;
        const message = `Hola, estoy interesado en *${name}* con precio ${price}.
Talle: ${talle}
Foto: ${mainImage}`;
        whatsappBtn.href = `https://wa.me/5491130856365?text=${encodeURIComponent(message)}`;
      }
    };

    // Configurar WhatsApp al abrir
    if (whatsappBtn && talleSelect) {
      talleSelect.onchange = updateWhatsApp;
      updateWhatsApp();
    }
  });
});

// Cerrar modal
if (closeBtn) {
  closeBtn.onclick = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
  };
}
window.onclick = e => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
};

// Categorías indicador
const links = document.querySelectorAll('.categories a');
const indicator = document.querySelector('.categories .indicator');

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    indicator.style.width = link.offsetWidth + 'px';
    indicator.style.left = link.offsetLeft + 'px';

    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Inicializar indicador en la primera categoría
window.addEventListener('load', () => {
  if (links.length > 0) {
    const first = links[0];
    indicator.style.width = first.offsetWidth + 'px';
    indicator.style.left = first.offsetLeft + 'px';
  }
});
// --- BUSCADOR ---
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");

if (searchBtn && searchInput) {
  searchBtn.addEventListener("click", () => {
    searchInput.classList.toggle("active");
    if (searchInput.classList.contains("active")) {
      searchInput.focus();
    } else {
      searchInput.value = "";
    }
  });
}
// --- FILTRO DE PRODUCTOS ---
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    document.querySelectorAll(".section-item").forEach(item => {
      const name = (item.dataset.name || "").toLowerCase();
      const description = (item.dataset.description || "").toLowerCase();

      if (name.includes(query) || description.includes(query)) {
        item.style.display = "flex"; // se muestra
      } else {
        item.style.display = "none"; // se oculta
      }
    });
  });
}
