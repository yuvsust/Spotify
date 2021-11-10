
// Variables
let audioIndex = 0;
let masterPlayButton = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let backwardPlayButton = document.getElementById("backwardPlay");
let forwardPlayButton = document.getElementById("forwardPlay");
let volumeBar = document.getElementById("volumeBar");

let songs = [
    {songName: "Borsha", filePath: "songs/Borsha.mp3", coverPath: "img/covers/1.jpg"},
    {songName: "Pakhi", filePath: "songs/Pakhi.mp3", coverPath: "img/covers/2.jpg"},
    {songName: "Cafeteria", filePath: "songs/Cafeteria.mp3", coverPath: "img/covers/3.jpg"},
    {songName: "Hashimukh", filePath: "songs/Hasimukh.mp3", coverPath: "img/covers/4.jpg"},
    {songName: "Abar Hashimukh", filePath: "songs/Abar_Hashimukh.mp3", coverPath: "img/covers/5.jpg"},
    {songName: "Icche Ghuri", filePath: "songs/Ichche_Ghuri.mp3", coverPath: "img/covers/6.jpg"},
    {songName: "Ei Obelay", filePath: "songs/Ei Obelay.mp3", coverPath: "img/covers/7.jpg"},
    {songName: "Brishtikabbyo", filePath: "songs/Bristikabbyo.mp3", coverPath: "img/covers/8.jpg"},
    {songName: "Valobasha Megh", filePath: "songs/Valobasha_Megh.mp3", coverPath: "img/covers/9.jpg"},
    {songName: "Jadukor", filePath: "songs/Jadukor.mp3", coverPath: "img/covers/10.jpg"},
    {songName: "Shonshon Jodio Kashbon", filePath: "songs/Shonshon_Joid_Kashbon.mp3", coverPath: "img/covers/11.jpg"},
]
let audioElement = new Audio(songs[audioIndex].filePath);
audioElement.volume = volumeBar.value / 100;

// First We update all songs timestamp in the list
// for (let i = 0; i < songs.length; i++) {
//     audioElement.src = songs[i].filePath;
//     audioElement.play();
//     // document.getElementsByClassName("timestamp")[i].innerText = audioElement.duration;
//     console.log(document.getElementsByClassName("timestamp")[i].innerText, audioElement.duration);
// }
// audioElement.src = songs[0].filePath;

// Set Song name and cover picture
songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

// Play Music
let playMusic = () => {
    audioElement.src = songs[audioIndex].filePath;
    audioElement.play();
    masterPlayButton.classList.remove("fa-play-circle");
    masterPlayButton.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
    document.getElementById("bottomSongName").innerText = songs[audioIndex].songName;
    makeAllPlay();
    document.getElementsByClassName("songItem")[audioIndex].classList.add("playing");
    document.getElementsByClassName("songPlayButton")[audioIndex].classList.remove('fa-play-circle');
    document.getElementsByClassName("songPlayButton")[audioIndex].classList.add('fa-pause-circle');
}

// Pause Music
let pauseMusic = () => {
    audioElement.pause();
    masterPlayButton.classList.remove("fa-pause-circle");
    masterPlayButton.classList.add("fa-play-circle");
    gif.style.opacity = 0;
    document.getElementsByClassName("songPlayButton")[audioIndex].classList.remove('fa-pause-circle');
    document.getElementsByClassName("songPlayButton")[audioIndex].classList.add('fa-play-circle');
}

// Resume Music [This is needed to be handle separately otherwise music are playing from initial time]
let resumeMusic = () => {
    audioElement.play();
    masterPlayButton.classList.remove("fa-play-circle");
    masterPlayButton.classList.add("fa-pause-circle");
    document.getElementById("bottomSongName").innerText = songs[audioIndex].songName;
    gif.style.opacity = 1;
    makeAllPlay();
    document.getElementsByClassName("songItem")[audioIndex].classList.add("playing");
    document.getElementsByClassName("songPlayButton")[audioIndex].classList.remove('fa-play-circle');
    document.getElementsByClassName("songPlayButton")[audioIndex].classList.add('fa-pause-circle');
}

let changeAudioIndex = (isIncrement) => {
    if(isIncrement == true) {
        audioIndex += 1;
        if(audioIndex > 10) audioIndex = 0;
    }
    else if (isIncrement == false) {
        audioIndex -= 1;
        if(audioIndex < 0 ) audioIndex = 10;
    }
}

let displayCurrentTime = (time) => {
    let min = parseInt(time / 60);
    let sec = parseInt(time % 60);
    let timeString = `${min} : ${sec}`;
    if(min <= 9)    timeString = "0" + timeString;
    if(sec <= 9)    timeString = timeString.slice(0, 5) + "0" + timeString.slice(5);
    return timeString;
}

// Handle play - pause
masterPlayButton.addEventListener("click", () => {
    if(audioElement.paused || audioElement.currentTime <= 0) {
        resumeMusic();
    }
    else {
        pauseMusic();
    }
})

// Handle Progress Bar 
audioElement.addEventListener("timeupdate", () => {
    document.getElementById("songCurrentTime").innerText = displayCurrentTime(audioElement.currentTime);
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
    if (myProgressBar.value == 100) {
        changeAudioIndex(true);
        playMusic();
    }
})

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
    console.log(audioElement.currentTime);
    if (audioElement.currentTime == audioElement.duration) {
        changeAudioIndex(true);
        playMusic();
    }
})

// Handle Volume Bar
volumeBar.addEventListener("change", () => {
    audioElement.volume = volumeBar.value / 100;
})

// Reset all music play button and their background
let makeAllPlay = () => {
    Array.from(document.getElementsByClassName("songPlayButton")).forEach( (element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
    
    Array.from(document.getElementsByClassName("songItem")).forEach( (element) => {
        element.classList.remove('playing');
    })
}

// If I click the play button icon from song list
Array.from(document.getElementsByClassName("songPlayButton")).forEach( (element, i) => {
    element.addEventListener("click", (e) => {
        if(audioIndex == i) {
            if(audioElement.paused || audioElement.currentTime <= 0) {
                resumeMusic();
            }
            else {
                pauseMusic();
            }
        }
        else {
            audioIndex = i;
            playMusic();
        }
    })
})

backwardPlayButton.addEventListener("click", () => {
    changeAudioIndex(false);
    playMusic();
})

forwardPlayButton.addEventListener("click", () => {
    changeAudioIndex(true);
    playMusic();
})