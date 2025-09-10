const menuBtn = document.getElementById('menu');
const nav = document.querySelector('.navigation');

function toggleNav(){
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  menuBtn.innerHTML = open ? '&times;' : '&#9776;';
}
menuBtn.addEventListener('click', toggleNav);
