// ── Terminal typewriter ──────────────────────────────────────
const lines = [
  { type: 'prompt', text: 'cat overview.json' },
  { type: 'output', text: '{' },
  { type: 'output', text: '  "name": "Nicole Carbonel",' },
  { type: 'output', text: '  "degree": "BSCpE",' },
  { type: 'output', text: '  "university": "PUP Manila",' },
  { type: 'output', text: '  "year": 3,' },
  { type: 'output', text: '  "status": "active",' },
  { type: 'output', text: '  "focus": [' },
  { type: 'output', text: '    "IoT Systems",' },
  { type: 'output', text: '    "Embedded Hardware",' },
  { type: 'output', text: '    "Network Infrastructure"' },
  { type: 'output', text: '  ],' },
  { type: 'output', text: '  "thesis": "FAHRENCOOL",' },
  { type: 'output', text: '  "open_to_work": true' },
  { type: 'output', text: '}' },
];

const container = document.getElementById('terminal-lines');
let lineIdx = 0;
let charIdx = 0;
let currentEl = null;

function typeNext() {
  if (lineIdx >= lines.length) {
    document.getElementById('terminal-prompt').style.removeProperty('display');
    return;
  }
  const line = lines[lineIdx];
  if (!currentEl) {
    currentEl = document.createElement('div');
    currentEl.className = 'mb-1 leading-relaxed';
    if (line.type === 'prompt') {
      currentEl.innerHTML =
        '<span style="color:#4ade80">guest@cpe-portfolio</span>' +
        '<span style="color:#64748b">:</span>' +
        '<span style="color:#22d3ee">~</span>' +
        '<span style="color:#94a3b8">$</span> ' +
        '<span id="tc" style="color:#e2e8f0"></span>';
    } else {
      const color = line.text.includes('"name"') || line.text.includes('"degree"') || line.text.includes('"university"') ? '#7dd3fc'
        : line.text.includes('"focus"') || line.text.includes('"status"') || line.text.includes('"thesis"') || line.text.includes('"open') || line.text.includes('"year"') ? '#86efac'
        : line.text === '{' || line.text === '}' || line.text === '  ],' ? '#f1a150'
        : '#cbd5e1';
      currentEl.innerHTML = '<span style="color:' + color + '" id="tc"></span>';
    }
    container.appendChild(currentEl);
  }

  const tc = currentEl.querySelector('#tc');
  if (tc && charIdx < line.text.length) {
    tc.textContent += line.text[charIdx];
    charIdx++;
    setTimeout(typeNext, line.type === 'prompt' ? 55 : 12);
  } else {
    lineIdx++;
    charIdx = 0;
    currentEl = null;
    const delay = line.type === 'prompt' ? 300 : 30;
    setTimeout(typeNext, delay);
  }
}

setTimeout(typeNext, 600);

// ── Mobile menu ──────────────────────────────────────────────
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  const ham = document.getElementById('ham-icon');
  const close = document.getElementById('close-icon');
  menu.classList.toggle('open');
  ham.classList.toggle('hidden');
  close.classList.toggle('hidden');
}

// ── Scroll reveal ─────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Navbar scroll shadow ──────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// ── Contact form ──────────────────────────────────────────────
function handleSend(btn) {
  btn.textContent = 'Message sent ✓';
  btn.style.background = '#34d399';
  btn.style.color = '#020617';
  btn.dataset.sent = 'true';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '#22d3ee';
    delete btn.dataset.sent;
    btn.disabled = false;
  }, 3000);
}
