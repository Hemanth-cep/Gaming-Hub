window.addEventListener('keydown', playSound);
window.addEventListener('click', handleMouseClick);

function playSound(e) {
  const keyCode = e.type === 'keydown' ? e.keyCode : parseInt(e.target.dataset.key);
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  if (!audio || !key) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add('playing');
}

function handleMouseClick(e) {
  let target = e.target;
  while (!target.classList.contains('key') && target !== window) {
    target = target.parentNode;
  }
  if (target.classList.contains('key')) {
    const clickEvent = new KeyboardEvent('keydown', {
      keyCode: parseInt(target.dataset.key)
    });
    playSound(clickEvent);
  }
}

function removeTransition(e) {
  if (e.propertyName !== 'box-shadow') return;
  this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
