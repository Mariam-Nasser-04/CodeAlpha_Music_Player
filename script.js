let currmusic = 0;
const audio = document.getElementById('audio');
const pausebtn = document.getElementById('btn');
const img = document.getElementById('imgs')
const volumebar = document.getElementById('vol');
const soundbar = document.getElementById('sound');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const current_t = document.getElementById('time_b')
const endding_t = document.getElementById('time_e')
const musicname = document.getElementById('n');
const artist = document.getElementById('a');
const container = document.getElementById('container');
let curr_g =0;
container.style.backgroundImage=gradient[6];

function play_pause(){
    if(audio.paused){
        audio.play();
        pausebtn.innerHTML='<i class="fa-solid fa-pause"></i>';
    }else{
        audio.pause();
        pausebtn.innerHTML='<i class="fa-solid fa-play"></i>';
    }
}

const setmusic = (i) => {
    soundbar.value = 0;
    let song = music[i];
    currmusic = i;
    audio.src = song.path;
    musicname.innerHTML = song.name;
    artist.innerHTML = song.artist;
    img.style.backgroundImage = `url('${song.cover}')`;
    current_t.innerHTML= '00:00';
    change_gradient();
    setTimeout(()=>{
        soundbar.max = audio.duration;
        endding_t.innerHTML = Time(audio.duration);
    },300);
}

function change_gradient(){
    container.style.backgroundImage=gradient[curr_g];
    curr_g = (curr_g + 1) % gradient.length;
}

//setmusic(0);
const Time = (time) => {
    let min = Math.floor(time / 60);
    if(min<10){
        min=`0${min}`;
    }
    let sec = Math.floor(time % 60);
    if(sec<10){
        sec=`0${sec}`;
    }
    return `${min}:${sec}`;
}
setInterval(()=>{
    soundbar.value = audio.currentTime;
    current_t.innerHTML = Time(audio.currentTime);
    if(Math.floor(audio.currentTime) == Math.floor(soundbar.max)){
        next.click();
    }
},500)

function seek(){
    audio.currentTime = soundbar.value;
}

function volume(){
    audio.volume = volumebar.value;
}

function prevfun(){
    if(currmusic >= music.length -1){
        currmusic = 0;
    }else{
        currmusic++;
    }
    setmusic(currmusic);
    pausebtn.click();
}

function nextfun(){
    if(currmusic <= 0){
        currmusic = music.length -1;
    }else{
        currmusic--;
    }
    setmusic(currmusic);
    pausebtn.click();
}

function search(){
    const text = document.getElementById('search_bar').value.toLowerCase();
    const results = music.filter(song=>
        song.name.toLowerCase().includes(text) || song.artist.toLowerCase().includes(text)
    );
    console.log("Search Results:", results);
    display_results(results);
}

const rd = document.getElementById('results');

function display_results(results){
    if(document.getElementById('search_bar').value==''){
        rd.style.visibility='hidden';
    }else{
        rd.style.visibility='visible';
    }
    const songlist=document.getElementById('songlist');
    songlist.innerHTML = '';
    if(results.length === 0){
        songlist.innerHTML='<p>No results found</p>';
        return;
    }
    results.forEach(song => {
        const element = document.createElement('div');
        element.classList.add('song');
        element.innerHTML = `<p><strong>${song.name}</strong><br> by ${song.artist}</p>`;
        element.addEventListener('click',()=>{
            playsong(song);
        });
        songlist.appendChild(element);
    });
    
}

function playsong(Song){
    change_gradient();
    document.getElementById('search_bar').value='';
    let index = music.findIndex(song => song.name.toLowerCase() === Song.name.toLowerCase());
    setmusic(index);
    pausebtn.click();
    rd.style.visibility='hidden';
}

function play(Song){
    change_gradient();
    close_list();
    let index = music.findIndex(song => song.name.toLowerCase() === Song.toLowerCase());
    setmusic(index);
    pausebtn.click();
}

let list = document.getElementById('music_l');

function open_list(){
    list.classList.add('open_l');
}

function close_list(){
    list.classList.remove('open_l');
}

