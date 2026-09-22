const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? 'Close' : 'Menu';
});
navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = 'Menu';
}));

const filters = [...document.querySelectorAll('.filter')];
const cards = [...document.querySelectorAll('.archive-card')];
const empty = document.querySelector('.archive-empty');
filters.forEach((filter) => filter.addEventListener('click', () => {
  const category = filter.dataset.filter;
  let shown = 0;
  filters.forEach((item) => {
    const active = item === filter;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  cards.forEach((card) => {
    const visible = category === 'all' || card.dataset.category.split(' ').includes(category);
    card.hidden = !visible;
    if (visible) shown += 1;
  });
  empty.hidden = shown !== 0;
}));

const projects = {
  craig: {
    kicker: 'ENGINE & GRAPHICS',
    title: 'Craig Engine',
    copy: 'Craig is my C++ game engine. The Vulkan version is open source and includes the engine and editor. It also supports console platforms.',
    points: ['Editor workflow for creating and managing game objects', 'Scene, camera, resource, and shader systems', 'Open-source Vulkan implementation with CMake and GLSL'],
    href: 'https://github.com/zylonity/Craig_Vulkan',
    link: 'Open the Vulkan repository'
  },
  stockbrain: {
    kicker: 'FULL-STACK SYSTEM',
    title: 'StockBrain',
    copy: 'StockBrain runs locally, researches market news, and prepares trade proposals. You can review and approve them through its web interface or Telegram.',
    points: ['Research and classification pipeline with explicit decision records', 'Deterministic risk sizing and position-exit rules', 'Web dashboard, Telegram approvals, PostgreSQL, Docker, and CI'],
    href: 'https://github.com/zylonity/StockBrain',
    link: 'Open the repository'
  },
  papas: {
    kicker: 'HOME BREW GAME',
    title: 'Papa’s Pizzeria 3DS',
    copy: 'A Papa’s Pizzeria remake I made for my wife. It runs on Nintendo 3DS hardware and emulators.',
    points: ['C and C++ implementation for the Nintendo 3DS', 'Gameplay, screens, audio, and touch-friendly UI', 'Source code available on GitHub'],
    href: 'https://github.com/zylonity/PapasPizzeria-n3DS',
    link: 'Open the repository'
  }
};
const dialog = document.querySelector('.project-dialog');
const closeDialog = document.querySelector('.dialog-close');
let opener;
document.querySelectorAll('.details-button').forEach((button) => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  opener = button;
  document.querySelector('#dialog-kicker').textContent = project.kicker;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-copy').textContent = project.copy;
  document.querySelector('#dialog-list').replaceChildren(...project.points.map((point) => {
    const li = document.createElement('li');
    li.textContent = point;
    return li;
  }));
  const link = document.querySelector('#dialog-link');
  link.href = project.href;
  link.firstChild.textContent = project.link + ' ';
  dialog.showModal();
  closeDialog.focus();
}));
closeDialog.addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => opener?.focus());
