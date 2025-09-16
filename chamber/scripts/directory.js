// directory.js (module)
const membersContainer = document.getElementById('members-container');
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');
const membershipFilter = document.getElementById('membership-filter');
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

let membersData = [];

// Utility: map membership number to label
function membershipLabel(level){
  switch(level){
    case 1: return {text:'Member', className:'member-level member'};
    case 2: return {text:'Silver', className:'member-level silver'};
    case 3: return {text:'Gold', className:'member-level gold'};
    default: return {text:'Member', className:'member-level'};
  }
}

// Render functions
function createCard(member){
  const div = document.createElement('article');
  div.className = 'member-card';
  div.innerHTML = `
    <img src="${member.image}"  logo" onerror="this.src='images/default.png'">
    <div class="member-info">
      <h3 class="sidname">${member.name}</h3>
      <p class="muted">${member.address}</p>
      <p class="muted">${member.phone}</p>
      <p>${member.description || ''}</p>
      <h4><a href="${member.website}" target="_blank" rel="noopener">${member.name} </a></h3>
      <p class="${membershipLabel(member.membership).className}">${membershipLabel(member.membership).text}</p>
    </div>
  `;
  return div;
}

function renderMembers(list){
  membersContainer.innerHTML = '';
  list.forEach(member => {
    const el = createCard(member);
    membersContainer.appendChild(el);
  });
}

// Fetch JSON (async/await)
async function loadMembers(){
  try{
    const resp = await fetch('data/members.json');
    if(!resp.ok) throw new Error('Failed to load members.json');
    membersData = await resp.json();
    applyFilterAndRender();
  }catch(err){
    membersContainer.innerHTML = `<p class="error">Unable to load members: ${err.message}</p>`;
    console.error(err);
  }
}

function applyFilterAndRender(){
  const filter = membershipFilter.value;
  let filtered = membersData.slice();
  if(filter !== 'all'){
    const num = Number(filter);
    filtered = filtered.filter(m => m.membership === num);
  }
  renderMembers(filtered);
}

// Toggle view
function setGridView(){
  membersContainer.classList.remove('list-view');
  membersContainer.classList.add('grid-view');
  gridBtn.setAttribute('aria-pressed','true');
  listBtn.setAttribute('aria-pressed','false');
}
function setListView(){
  membersContainer.classList.remove('grid-view');
  membersContainer.classList.add('list-view');
  gridBtn.setAttribute('aria-pressed','false');
  listBtn.setAttribute('aria-pressed','true');
}

// Event listeners
gridBtn.addEventListener('click', () => setGridView());
listBtn.addEventListener('click', () => setListView());
membershipFilter.addEventListener('change', applyFilterAndRender);

// Mobile nav toggle
navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  mainNav.style.display = expanded ? 'none' : 'block';
});

// Footer dynamic info
document.getElementById('copyright-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified || 'Unknown';

// Start
loadMembers();
