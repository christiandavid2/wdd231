const menuBtn = document.getElementById('menu');
const nav = document.querySelector('.navigation');

function toggleNav(){
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  menuBtn.innerHTML = open ? '&times;' : '&#9776;';
}
menuBtn.addEventListener('click', toggleNav);
window.addEventListener('resize', () => {
  if(window.innerWidth > 768 && nav.classList.contains('open')){
    toggleNav();
  } 
});


// Dark Mode Toggle
const darkToggle = document.getElementById('darkToggle');
const body = document.body;

// Load saved preference
if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark');
  darkToggle.textContent = '☀️'; // show sun when dark mode is active
} else {
  darkToggle.textContent = '🌙'; // default moon
}

darkToggle.addEventListener('click', () => {
  body.classList.toggle('dark');

  if (body.classList.contains('dark')) {
    localStorage.setItem('darkMode', 'enabled');
    darkToggle.textContent = '☀️'; // switch to sun
  } else {
    localStorage.setItem('darkMode', 'disabled');
    darkToggle.textContent = '🌙'; // switch back to moon
  }
});
// Ensure menu is closed on larger screens
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.innerHTML = '&#9776;';
  }
});
