const LOAD_TIMEOUT_MS = 60000;

export function setStatus(text, state) {
  const el = document.getElementById('status');
  el.textContent = text;
  el.dataset.state = state;
}

export function checkCameraSupport() {
  if (!window.isSecureContext) return 'Gunakan HTTPS atau http://localhost di laptop.';
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return 'Browser tidak menyediakan akses kamera (getUserMedia).';
  return null;
}

export function setupStartButton(startFn) {
  const btn = document.getElementById('startBtn');
  const error = document.getElementById('startError');
  btn.addEventListener('click', async () => {
    const problem = checkCameraSupport();
    if (problem) { error.textContent = problem; setStatus('Error: ' + problem, 'error'); return; }
    btn.disabled = true;
    error.textContent = '';
    document.getElementById('consent').style.display = 'none';
    setStatus('Memuat... izinkan kamera jika diminta', 'idle');
    let timer;
    try {
      const timeout = new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error('timeout')), LOAD_TIMEOUT_MS);
      });
      await Promise.race([startFn(), timeout]);
    } catch (err) {
      console.error('Gagal memulai:', err);
      const message = 'Gagal atau terlalu lama memuat. Periksa izin kamera, internet, HTTPS, dan Console. Muat ulang halaman sebelum mencoba lagi.';
      error.textContent = message;
      setStatus('Error: ' + message, 'error');
      document.getElementById('consent').style.display = 'flex';
      btn.disabled = true;
    } finally {
      clearTimeout(timer);
    }
  });
}
