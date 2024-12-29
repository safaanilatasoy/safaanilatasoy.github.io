import 'player.style/winamp';

const musicPlayer = document.createElement('musicPlayer');
musicPlayer.innerHTML = `
  <media-theme-winamp>
    <audio
      slot="media"
      src="https://stream.mux.com/fXNzVtmtWuyz00xnSrJg4OJH6PyNo6D02UzmgeKGkP5YQ/low.mp4"
      playsinline
      crossorigin
    ></audio>
  </media-theme-winamp>`;

document.body.append(template.content);