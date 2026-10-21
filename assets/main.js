// Repite los botones de descarga en el bloque final
const bottom = document.getElementById('stores-bottom');
document.querySelectorAll('.hero .store-btn').forEach(btn => bottom.appendChild(btn.cloneNode(true)));

// Resalta la tienda del dispositivo del visitante
const ua = navigator.userAgent;
const platform = /android/i.test(ua) ? 'android' : /iphone|ipad|ipod/i.test(ua) ? 'ios' : null;
if (platform) {
    document.querySelectorAll(`[data-store="${platform}"]`).forEach(b => b.classList.add('is-recommended'));
}

// Animación al hacer scroll
const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
