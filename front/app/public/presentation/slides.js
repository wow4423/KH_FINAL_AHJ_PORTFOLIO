const slides = [...document.querySelectorAll('.slide')];
const page = document.querySelector('#page');
const notesPanel = document.querySelector('#notesPanel');
const help = document.querySelector('#help');
let index = 0;
let transitioning = false;
const youtubeOrigin = 'https://www.youtube.com';
function pauseMedia() {
  document.querySelectorAll('video').forEach(video => video.pause());
  document.querySelectorAll('iframe').forEach(frame => frame.contentWindow?.postMessage(JSON.stringify({event:'command',func:'pauseVideo',args:[]}), youtubeOrigin));
}
function updateNotes() {
  document.querySelector('#notesTitle').textContent = `${index + 1}. ${slides[index].dataset.title} (${slides[index].dataset.time})`;
  document.querySelector('#notesText').textContent = slides[index].querySelector('.notes').textContent;
}
function go(next) {
  const target = Math.max(0, Math.min(slides.length - 1, next));
  if (target !== index) pauseMedia();
  index = target;
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    slide.classList.toggle('before', i < index);
    slide.setAttribute('aria-hidden', String(i !== index));
    slide.inert = i !== index;
  });
  page.textContent = `${String(index + 1).padStart(2, '0')} / ${slides.length}`;
  document.querySelector('#prev').disabled = index === 0;
  document.querySelector('#next').disabled = index === slides.length - 1;
  document.querySelector('#progressBar').style.width = `${(index + 1) / slides.length * 100}%`;
  if (location.hash !== `#${index + 1}`) history.replaceState(null, '', `#${index + 1}`);
  updateNotes();
}
function step(direction) {
  if (transitioning) return;
  go(index + direction);
  transitioning = true;
  setTimeout(() => transitioning = false, 160);
}
function toggleNotes() {
  notesPanel.hidden = !notesPanel.hidden;
  document.querySelector('#notesButton').setAttribute('aria-expanded', String(!notesPanel.hidden));
}
let toastTimeout;
function toast(message) {
  const el = document.querySelector('#toast');
  el.textContent = message; el.classList.add('visible');
  clearTimeout(toastTimeout); toastTimeout = setTimeout(() => el.classList.remove('visible'), 4000);
}
async function fullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch { toast('브라우저의 전체화면 기능(F11)을 사용해주세요.'); }
}
let elapsed = 0, startedAt = 0, running = false;
function renderTimer() {
  const seconds = Math.floor((elapsed + (running ? Date.now() - startedAt : 0)) / 1000);
  const el = document.querySelector('#timer');
  el.textContent = `${running ? 'Ⅱ' : '▶'} ${String(Math.floor(seconds / 60)).padStart(2,'0')}:${String(seconds % 60).padStart(2,'0')} / 10:00`;
  el.classList.toggle('running', running); el.classList.toggle('overtime', seconds >= 600);
}
function toggleTimer() {
  if (running) elapsed += Date.now() - startedAt;
  else startedAt = Date.now();
  running = !running; renderTimer();
}
document.querySelector('#timer').addEventListener('click', toggleTimer);
document.querySelector('#timer').addEventListener('dblclick', () => { elapsed = 0; running = false; renderTimer(); });
setInterval(renderTimer, 250);
document.querySelector('#prev').onclick = () => step(-1);
document.querySelector('#next').onclick = () => step(1);
document.querySelector('#home').onclick = () => go(0);
document.querySelector('#notesButton').onclick = toggleNotes;
document.querySelector('#closeNotes').onclick = toggleNotes;
document.querySelector('#fullscreen').onclick = fullscreen;
document.querySelector('#helpButton').onclick = () => help.showModal();
document.querySelector('#closeHelp').onclick = () => help.close();
document.querySelector('#deck').addEventListener('click', event => {
  if (event.target.closest('button,a,video,iframe,[data-youtube]') || !notesPanel.hidden || help.open || window.getSelection()?.toString()) return;
  step(1);
});
// Allow continuous scrolling with a short, fixed cooldown between slides.
let wheelTotal = 0;
let wheelDirection = 0;
let lastWheelAt = 0;
let lastWheelMoveAt = -Infinity;
document.addEventListener('wheel', event => {
  if (event.ctrlKey || event.metaKey || help.open || !notesPanel.hidden ||
      event.target.closest('video,iframe,[data-youtube],input,textarea,select')) return;
  if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
  const direction = Math.sign(event.deltaY);
  const slide = slides[index];
  // Let overflowing content scroll before navigating away from it.
  const canScroll = direction > 0
    ? slide.scrollTop + slide.clientHeight < slide.scrollHeight - 2
    : slide.scrollTop > 2;
  if (canScroll && slide.contains(event.target)) return;
  event.preventDefault();
  const now = performance.now();
  if (now - lastWheelAt > 180 || direction !== wheelDirection) wheelTotal = 0;
  lastWheelAt = now;
  if (now - lastWheelMoveAt < 240) return;
  wheelDirection = direction;
  const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
  wheelTotal += Math.abs(event.deltaY) * scale;
  if (wheelTotal >= 25 && !transitioning) {
    wheelTotal = 0;
    lastWheelMoveAt = now;
    step(direction);
  }
}, { passive: false });
document.addEventListener('keydown', event => {
  if (help.open || event.altKey || event.ctrlKey || event.metaKey || event.target.closest('input,textarea,select,video,iframe') || event.repeat) return;
  if (event.target.closest('button,a') && [' ', 'Enter'].includes(event.key)) return;
  if (['ArrowRight','PageDown',' '].includes(event.key)) { event.preventDefault(); step(1); }
  else if (['ArrowLeft','PageUp'].includes(event.key)) { event.preventDefault(); step(-1); }
  else if (event.key === 'Home') { event.preventDefault(); go(0); }
  else if (event.key === 'End') { event.preventDefault(); go(slides.length - 1); }
  else if (event.key.toLowerCase() === 'n') toggleNotes();
  else if (event.key.toLowerCase() === 'f') fullscreen();
  else if (event.key.toLowerCase() === 't') toggleTimer();
});
document.querySelectorAll('[data-youtube]').forEach(shell => {
  const frame = document.createElement('iframe');
  frame.title = "e5(이오) - 함께 빛나는 우리 (Bright Us, Etners) / 원본 영상";
  frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
  frame.allowFullscreen = true;
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  frame.src = `${youtubeOrigin}/embed/Gn3Ap_CVNsU?enablejsapi=1&playsinline=1&rel=0&origin=${encodeURIComponent(location.origin)}`;
  shell.replaceChildren(frame);
});
document.querySelectorAll('video').forEach(video => {
  video.addEventListener('play', () => {
    document.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); });
    document.querySelectorAll('iframe').forEach(frame => frame.contentWindow?.postMessage(JSON.stringify({event:'command',func:'pauseVideo',args:[]}), youtubeOrigin));
  });
  video.addEventListener('error', () => toast('영상 파일을 불러오지 못했습니다. assets 폴더를 확인해주세요.'));
});
function fromHash() { const n = Number(location.hash.slice(1)); go(Number.isInteger(n) && n > 0 ? n - 1 : 0); }
window.addEventListener('hashchange', fromHash);
fromHash();
