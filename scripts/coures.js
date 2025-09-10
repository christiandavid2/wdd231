const courses = [
  {code: 'CSE 110', title: 'Programming Building Blocks', credits: 2, type:'CSE', completed:true },
  { code: 'WDD 130', title: 'Web Fundamentals', credits: 2, type:'WDD', completed:true },
  { code: 'ITM111', title: 'Introduction to Databases', credits: 3, type:'CSE', completed:true },
  { code: 'WDD 131', title: 'Dynamic Web', credits: 2, type:'WDD', completed:true },
  { code: 'CSE 111', title: 'Programming with Functions', credits: 3, type:'CSE', completed:true },
  { code: 'WDD 231', title: 'Frontend Dev I', credits: 2, type:'WDD', completed:false },
  { code: 'CSE 210', title: 'Programming with Classes', credits: 2, type:'CSE', completed:false }
];
// mark any you’ve finished: courses.find(c=>c.code==='WDD 130').completed = true;

const list = document.getElementById('course-list');
const totalEl = document.getElementById('total-credits');

function render(arr){
  list.innerHTML = '';
  let total = 0;
  arr.forEach(c=>{
    total += c.credits;
    const card = document.createElement('article');
    card.className = `course-card${c.completed ? ' completed' : ''}`;
    card.innerHTML = `
      <h3>${c.code} — ${c.title}</h3>
      <p class="meta">${c.type} • ${c.credits} cr</p>
      <p class="meta">${c.completed ? 'Completed' : 'In Progress'}</p>`;
    list.appendChild(card);
  });
  totalEl.textContent = arr.reduce((s,c)=>s+c.credits,0);
}
render(courses);

document.getElementById('all').addEventListener('click', ()=>render(courses));
document.getElementById('wdd').addEventListener('click', ()=>render(courses.filter(c=>c.type==='WDD')));
document.getElementById('cse').addEventListener('click', ()=>render(courses.filter(c=>c.type==='CSE')));
