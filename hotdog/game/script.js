document.addEventListener('DOMContentLoaded', function() {
    let move_speed = 3;
    let gravity = 0.25;
    let bird = document.querySelector('.bird');
    let img = document.getElementById('bird-1');
    let sound_point = new Audio('sounds effect/point.mp3');
    let sound_die = new Audio('sounds effect/die.mp3');
    let max_speed = 20;
    let speed_increment = 0.002;

    // Ses öğelerini bir diziye koyun
    let sounds = [sound_point, sound_die];

    // Ses kontrol öğelerini seçin
    const volumeSlider = document.getElementById('volume-slider');
    const muteButton = document.getElementById('mute-button');
    let isMuted = false;

    // Kuşun özelliklerini alın
    let bird_props = bird.getBoundingClientRect();
    let background = document.querySelector('.background').getBoundingClientRect();
    let score_val = document.querySelector('.score_val');
    let message = document.querySelector('.message');
    let score_title = document.querySelector('.score_title');

    let game_state = 'Start';
    let bird_dy = 0;

    img.style.display = 'none';
    message.classList.add('messageStyle');

    // Mesajın başlangıç içeriğini sakla
    const initialMessageContent = message.innerHTML;

    // Ses seviyesini yükle
    let savedVolume = localStorage.getItem('volume');
    if (savedVolume !== null) {
        volumeSlider.value = savedVolume;
        sounds.forEach(function(sound) {
            sound.volume = parseFloat(savedVolume);
        });
    } else {
        // Varsayılan ses seviyesini ayarla
        const initialVolume = parseFloat(volumeSlider.value);
        sounds.forEach(function(sound) {
            sound.volume = initialVolume;
        });
    }

    // Ses seviyesi kontrolünü etkinleştir
    volumeSlider.addEventListener('input', function(e) {
        const volume = parseFloat(e.target.value);
        sounds.forEach(function(sound) {
            sound.volume = volume;
        });
        // Ses seviyesini localStorage içinde sakla
        localStorage.setItem('volume', volume);
    });

    // Sayfa yüklendiğinde sessize alma durumunu yükle
    let savedMuteStatus = localStorage.getItem('isMuted');
    if (savedMuteStatus !== null) {
        isMuted = savedMuteStatus === 'true';
        sounds.forEach(function(sound) {
            sound.muted = isMuted;
        });
        // Düğme üzerindeki ikonu güncelle
        muteButton.textContent = isMuted ? '🔇' : '🔊';
    } else {
        // Sessize alma durumunu varsayılan olarak ayarla
        isMuted = false;
        sounds.forEach(function(sound) {
            sound.muted = isMuted;
        });
        muteButton.textContent = '🔊';
    }

    // Sessize alma düğmesine tıklandığında
    muteButton.addEventListener('click', function() {
        isMuted = !isMuted;
        sounds.forEach(function(sound) {
            sound.muted = isMuted;
        });
        // Düğme üzerindeki ikonu güncelle
        muteButton.textContent = isMuted ? '🔇' : '🔊';
        // Sessize alma durumunu localStorage içinde sakla
        localStorage.setItem('isMuted', isMuted);
    });

    // Oyun değişkenleri
    let pipe_seperation = 0;
    let pipe_gap = 45;

    // Animasyon döngülerinin kimlikleri
    let moveAnimationId;
    let gravityAnimationId;
    let pipeAnimationId;

    // Oyunu başlatma fonksiyonu
    function startGame() {
        // Var olan animasyonları iptal et
        cancelAnimationFrame(moveAnimationId);
        cancelAnimationFrame(gravityAnimationId);
        cancelAnimationFrame(pipeAnimationId);

        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        message.classList.remove('messageStyle');
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        bird_dy = 0;

        // Oyun döngüsü değişkenlerini sıfırla
        pipe_seperation = 0;

        play();
    }

    // Oyunu yeniden başlatma fonksiyonu
    function restartGame() {
        // Oyun değişkenlerini sıfırla
        game_state = 'Start';
        score_val.innerHTML = '0';
        bird.style.top = '40vh';
        bird_dy = 0;
        message.innerHTML = initialMessageContent; // Başlangıçtaki mesaj içeriğini göster
        message.classList.add('messageStyle');
        img.style.display = 'none';

        // Var olan animasyonları iptal et
        cancelAnimationFrame(moveAnimationId);
        cancelAnimationFrame(gravityAnimationId);
        cancelAnimationFrame(pipeAnimationId);

        // Var olan boruları kaldır
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });

        // Oyun döngüsü değişkenlerini sıfırla
        pipe_seperation = 0;

        // Oyunu başlatmayın, oyuncunun tıklamasını bekleyin
    }



    // Dokunmatik kontroller
    document.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if(game_state == 'Play'){
            bird_dy = -7.6;
            img.src = 'images/Bird.gif';
        } else if(game_state == 'End'){
            restartGame();
        } else if(game_state == 'Start') {
            startGame();
        }
    });

    // Klavye kontrolleri
    document.addEventListener('keydown', (e) => {
        if(e.key == 'Enter' && game_state != 'Play'){
            if(game_state == 'End'){
                restartGame();
            } else if(game_state == 'Start'){
                startGame();
            }
        }
        if((e.key == 'ArrowUp' || e.key == ' ') && game_state == 'Play'){
            bird_dy = -7.6;
            img.src = 'images/Bird.gif';
        }
    });

    // Animasyon fonksiyonları
    function move(){
        if(game_state != 'Play') return;

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            // Hitbox için güvenlik payı
            const hitboxMargin = 60; // Pikseller içinde güvenlik payı

            if(pipe_sprite_props.right <= 0){
                element.remove();
            } else {
                // Geliştirilmiş çarpışma kontrolü
                const birdLeft = bird_props.left + hitboxMargin;
                const birdRight = bird_props.right - hitboxMargin;
                const birdTop = bird_props.top + hitboxMargin;
                const birdBottom = bird_props.bottom - hitboxMargin;

                const pipeLeft = pipe_sprite_props.left;
                const pipeRight = pipe_sprite_props.right;
                const pipeTop = pipe_sprite_props.top;
                const pipeBottom = pipe_sprite_props.bottom;

                // Daha hassas çarpışma kontrolü
                if(birdRight > pipeLeft &&
                   birdLeft < pipeRight &&
                   ((birdTop < pipeTop + pipe_sprite_props.height &&
                     birdBottom > pipeTop) ||
                    (birdBottom > pipeBottom - pipe_sprite_props.height &&
                     birdTop < pipeBottom))){
                    game_state = 'End';
                    message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Enter to Restart';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    sound_die.play();

                    return;
                } else {
                    // Skor kontrolü
                    if(pipe_sprite_props.right < bird_props.left &&
                       pipe_sprite_props.right + move_speed >= bird_props.left &&
                       element.increase_score == '1'){
                        score_val.innerHTML = parseInt(score_val.innerHTML) + 1;
                        sound_point.play();
                        element.increase_score = '0';
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px';
                }
            }
        });
        moveAnimationId = requestAnimationFrame(move);
    }

    function apply_gravity(){
        if(game_state != 'Play') return;
        bird_dy = bird_dy + gravity;

        if(bird_props.top <= 0 || bird_props.bottom >= background.bottom){
            game_state = 'End';
            message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Tap to Restart';
            message.classList.add('messageStyle');
            img.style.display = 'none';
            sound_die.play();


            return;
        }
        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
        gravityAnimationId = requestAnimationFrame(apply_gravity);
    }

    function create_pipe(){
        if(game_state != 'Play') return;

        if(pipe_seperation > 115){
            pipe_seperation = 0;

            let pipe_posi = Math.floor(Math.random() * 43) + 8;

            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';
            pipe_sprite_inv.style.transform = 'rotate(180deg)';
            pipe_sprite_inv.increase_score = '0';

            document.body.appendChild(pipe_sprite_inv);

            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';

            document.body.appendChild(pipe_sprite);
        }
        pipe_seperation++;
        pipeAnimationId = requestAnimationFrame(create_pipe);
    }

    function play(){
        bird_props = bird.getBoundingClientRect();
        move();
        apply_gravity();
        create_pipe();
    }

    // Varsayılan dokunmatik davranışları engelle
    document.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });

    // CSS stil eklemeleri
    document.body.style.touchAction = 'none';
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.webkitTouchCallout = 'none';
});