function playMusic() {
    var music = document.getElementById('music');
    var music_btn = document.getElementById('musicBtn');
    if (music.paused){
        music.play();
        music_btn.src='img/play.png'
    }
    else{
        music.pause();
        music_btn.src='img/pause.png'
    }
}