const courses = [
  {
    code: 'CSE 110',
    title: 'Programming Building Blocks',
    credits: 2,
    type: 'CSE',
    completed: true,
    certificate: 'Computer Science Fundamentals',
    description: 'Learn problem-solving basics and how to build algorithms.',
    technology: ['Python', 'Pseudocode']
  },
  {
    code: 'WDD 130',
    title: 'Web Fundamentals',
    credits: 2,
    type: 'WDD',
    completed: true,
    certificate: 'Web Development Basics',
    description: 'Introduction to HTML and CSS for building static websites.',
    technology: ['HTML', 'CSS']
  },
  {
    code: 'ITM111',
    title: 'Introduction to Databases',
    credits: 3,
    type: 'CSE',
    completed: true,
    certificate: 'Database Fundamentals',
    description: 'Covers relational databases, SQL, and database design.',
    technology: ['SQL', 'Relational DB']
  },
  {
    code: 'WDD 131',
    title: 'Dynamic Web',
    credits: 2,
    type: 'WDD',
    completed: true,
    certificate: 'Web Development',
    description: 'Covers DOM manipulation and interactivity using JavaScript.',
    technology: ['JavaScript', 'DOM']
  },
  {
    code: 'CSE 111',
    title: 'Programming with Functions',
    credits: 3,
    type: 'CSE',
    completed: true,
    certificate: 'Computer Science Core',
    description: 'Focuses on functional programming and modular design.',
    technology: ['Python', 'Functions']
  },
  {
    code: 'WDD 231',
    title: 'Frontend Dev I',
    credits: 2,
    type: 'WDD',
    completed: false,
    certificate: 'Web Development',
    description: 'Learn frontend design patterns and asynchronous JS.',
    technology: ['JavaScript', 'APIs']
  },
  {
    code: 'CSE 210',
    title: 'Programming with Classes',
    credits: 2,
    type: 'CSE',
    completed: false,
    certificate: 'Computer Science Core',
    description: 'Introduction to object-oriented programming concepts.',
    technology: ['Python', 'OOP']
  }
];

// mark any you’ve finished: courses.find(c=>c.code==='WDD 130').completed = true;

const list = document.getElementById('course-list');
const totalEl = document.getElementById('total-credits');
// Removed the uninitialized 'openbuttom' declaration as it was unnecessary.

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
    card.addEventListener('click', () => displayCourseDetails(c));
  });
  totalEl.textContent = arr.reduce((s,c)=>s+c.credits,0);
  
}
render(courses);

document.getElementById('all').addEventListener('click', ()=>render(courses));
document.getElementById('wdd').addEventListener('click', ()=>render(courses.filter(c=>c.type==='WDD')));
document.getElementById('cse').addEventListener('click', ()=>render(courses.filter(c=>c.type==='CSE')));

const courseDetails = document.getElementById('course-details');

function displayCourseDetails(course) {
  courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.code}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;
  
  courseDetails.showModal();

  // Close with button
  document.getElementById('closeModal').addEventListener('click', () => {
    courseDetails.close();
  });

  // Close when clicking outside
  courseDetails.addEventListener('click', (e) => {
    const rect = courseDetails.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) courseDetails.close();
  });
}
