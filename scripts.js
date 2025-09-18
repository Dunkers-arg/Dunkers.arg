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

// --- LISTA DE CAMISETAS CON VERSIONES ---
const productosConVersion = {
  "Liverpool 25-26": { PV: "$55.000", FV: "$50.000" },
  "Chelsea 25-26": { PV: "$55.000", FV: "$50.000" },
  "Chelsea 24-25": { PV: "$55.000", FV: "$50.000" },
  "Newcastle 24-25": { PV: "$55.000", FV: "$50.000" },
  "PSG 24-25": { PV: "$55.000", FV: "$50.000" },
  "River Plate 25-26": { PV: "$55.000", FV: "$50.000" },
  "River Plate Visitante 25-26": { PV: "$55.000", FV: "$50.000" },
  "Boca Juniors 25-26": { PV: "$55.000", FV: "$50.000" },
  "Boca Juniors 25-26 visitante": { PV: "$55.000", FV: "$50.000" },
  "Racing 25-26": { PV: "$55.000", FV: "$50.000" },
  "Argentina 2024": { PV: "$55.000", FV: "$50.000" },
  "Argentina 2024 Visitante": { PV: "$55.000", FV: "$50.000" },
  "España 2024": { PV: "$55.000", FV: "$50.000" },
  "Italia 2024": { PV: "$55.000", FV: "$50.000" },
  "Barcelona 25-26": { PV: "$55.000", FV: "$50.000" },
  "Barcelona 25-26 Visitante": { PV: "$55.000", FV: "$50.000" },
  "Real Madrid 25-26": { PV: "$55.000", FV: "$50.000" },
  "Arsenal 25-26": { PV: "$55.000", FV: "$50.000" },
  "PSG 25-26": { PV: "$55.000", FV: "$50.000" },
  "Napoli 25-26": { PV: "$55.000", FV: "$50.000" },
  "Inter de Miami 25-26": { PV: "$55.000", FV: "$50.000" },
  "Inter de Miami 25-26 Visitante": { PV: "$55.000", FV: "$50.000" },
  "Independiente 25-26": { PV: "$55.000", FV: "$50.000" }
};

let versionContainer;
let versionSelect;

// Abrir modal
document.querySelectorAll('.section-item').forEach(item => {
  item.addEventListener('click', () => {
    document.body.style.overflow = "hidden";
    modal.style.display = "block";

    const name = item.dataset.name || "";
    const price = item.dataset.price || "";

    modalName.textContent = name;
    modalPrice.textContent = price;

    // Thumbs
    let thumbs = [];
    try {
      thumbs = JSON.parse(item.dataset.thumbs || "[]");
    } catch (e) {
      console.error("Error leyendo data-thumbs", e);
    }

    modalImg.src = thumbs.length > 0 ? thumbs[0] : item.querySelector("img").src;

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
        updateWhatsApp();
      });

      thumbnailsContainer.appendChild(thumb);
    });

    // --- función updateWhatsApp ---
    const updateWhatsApp = () => {
      if (whatsappBtn && talleSelect) {
        const talle = talleSelect.value || "Sin talle";
        const mainImage = modalImg.src;
        const version = (versionSelect && versionContainer?.style.display !== "none") 
          ? versionSelect.value 
          : "N/A";
        const precio = modalPrice.textContent;

        const message = `Hola, estoy interesado en *${name}*.
Versión: ${version}
Talle: ${talle}
Precio: ${precio}
Foto: ${mainImage}`;

        whatsappBtn.href = `https://wa.me/5491130856365?text=${encodeURIComponent(message)}`;
      }
    };

    // --- SI EL PRODUCTO TIENE VERSIONES ---
    if (productosConVersion[name]) {
      if (!versionContainer) {
        versionContainer = document.createElement("div");
        versionContainer.classList.add("version-container");

        const label = document.createElement("label");
        label.htmlFor = "versionSelect";
        label.innerHTML = "<strong>Versión:</strong>";

        versionSelect = document.createElement("select");
        versionSelect.id = "versionSelect";
        versionSelect.innerHTML = `
          <option value="FV">Fan Version</option>
          <option value="PV">Player Version</option>
        `;

        versionContainer.appendChild(label);
        versionContainer.appendChild(versionSelect);
        talleSelect.insertAdjacentElement("afterend", versionContainer);
      }

      versionContainer.style.display = "block";
      versionSelect.value = "FV"; // default
      modalPrice.textContent = productosConVersion[name].FV;

      // cambio de versión → cambia precio + WhatsApp
      versionSelect.onchange = () => {
        const version = versionSelect.value;
        modalPrice.textContent = productosConVersion[name][version];
        updateWhatsApp();
      };
    } else {
      if (versionContainer) {
        versionContainer.style.display = "none";
      }
    }

    // talle dispara actualización
    talleSelect.onchange = updateWhatsApp;
    updateWhatsApp();
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

// --- NAVEGACIÓN DE CATEGORÍAS ---
document.querySelectorAll('.categories a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
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
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });
}
