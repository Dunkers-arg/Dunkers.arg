// Click en Dunkers vuelve al inicio
const logo = document.getElementById('logo');
logo.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

// Modal productos
const modal = document.getElementById("productModal");
const modalImg = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const closeBtn = document.querySelector(".close");
const thumbnailsContainer = document.getElementById("modalThumbnails");

document.querySelectorAll('.section-item').forEach(item => {
  item.addEventListener('click', () => {
    document.body.style.overflow = "hidden";
    modal.style.display = "block";
    modalImg.src = item.querySelector('img').src;
    modalName.textContent = item.getAttribute('data-name');
    modalPrice.textContent = item.getAttribute('data-price');
    modalDescription.textContent = item.getAttribute('data-description');

    const thumbs = JSON.parse(item.getAttribute('data-thumbs'));
    thumbnailsContainer.innerHTML = "";
    thumbs.forEach(src => {
      const thumb = document.createElement('img');
      thumb.src = src;
      thumb.alt = modalName.textContent + " miniatura";
      thumb.addEventListener('click', () => modalImg.src = src);
      thumbnailsContainer.appendChild(thumb);
    });
  });
});

closeBtn.onclick = () => { 
  modal.style.display = "none"; 
  document.body.style.overflow = ""; 
};
window.onclick = e => { 
  if (e.target == modal) { 
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
    if(target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

window.addEventListener('load', () => {
  if(links.length > 0){
    const first = links[0];
    indicator.style.width = first.offsetWidth + 'px';
    indicator.style.left = first.offsetLeft + 'px';
  }
});
