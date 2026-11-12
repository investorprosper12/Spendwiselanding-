import './styles.css';
import './theme.css';

const APP_URL = 'https://spendwise-app-flax.vercel.app/';

/* Pass an explicit light/dark choice to the app so the look carries over */
function syncAppLinks(): void {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem('theme');
  } catch {
    saved = null;
  }
  const target = saved === 'dark' || saved === 'light' ? `${APP_URL}?theme=${saved}` : APP_URL;
  document.querySelectorAll<HTMLAnchorElement>(`a[href^="${APP_URL}"]`).forEach(link => {
    link.href = target;
  });
}
syncAppLinks();

const themeBtn = document.getElementById('theme-toggle');
themeBtn?.addEventListener('click', () => setTimeout(syncAppLinks, 0));
themeBtn?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch {
    /* storage unavailable, theme applies for this visit only */
  }
});

const toggle = document.getElementById(
  'menu-toggle'
) as HTMLButtonElement | null;
const menu = document.getElementById('menu');

function setMenu(open: boolean): void {
  toggle?.setAttribute('aria-expanded', String(open));
  menu?.classList.toggle('open', open);
}

toggle?.addEventListener('click', () => {
  setMenu(toggle.getAttribute('aria-expanded') !== 'true');
});

menu?.addEventListener('click', event => {
  if ((event.target as HTMLElement).closest('a')) setMenu(false);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenu(false);
});

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
