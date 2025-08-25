let mainbox = document.getElementById("mainbox")
let interests = document.getElementById("interests")
let likesDislikes = document.getElementById("likes-dislikes")
// let socials = document.getElementById("socials")

let progressbarline = document.getElementById("progressbarline")
let progressbarFullLine = document.getElementById("progressbar-full-line")

let songname = document.getElementById("songname")

let meow = document.getElementById("meow")
let clik = document.getElementById("clik")

let pausebtn = document.getElementById("pausebtn")




let audios = [
    document.getElementById("is-it-just-me"),
    document.getElementById("his-theme")
]
let typewriter_strings = ["about me! ^.^", "@velocitymeow"]





let currentIndex = 0;
let current_audio = audios[currentIndex];

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function updateSongName(audio) {
    const src = audio.src;
    const fileName = src.substring(src.lastIndexOf("/") + 1);
    songname.innerText = decodeURI(fileName).slice(0, -4);
}

function playCurrent() {
    stop_playback();
    current_audio = audios[currentIndex];
    updateSongName(current_audio);
    current_audio.play();
    current_audio.onended = () => {
        music_next();
    }
}

function stop_playback() {
    audios.forEach(a => {
        a.pause();
        a.currentTime = 0;
    });
}

function music_previous() {
    update_progressbar(0);
    currentIndex = (currentIndex - 1 + audios.length) % audios.length;
    if (pausebtn.classList.contains("paused")) {
        pausebtn.classList.remove("paused");
    }
    current_audio.currentTime = 0;
    playCurrent();
}

function music_next() {
    update_progressbar(0);

    currentIndex = (currentIndex + 1) % audios.length;
    if (pausebtn.classList.contains("paused")) {
        pausebtn.classList.remove("paused");
    }
    current_audio.currentTime = 0;
    playCurrent();
}

function music_pause(pause_btn) {
    if (current_audio.paused) {
        current_audio.play();
    } else {
        current_audio.pause();
    }
}

function remove_bigclikclikbox(ts) {
    meow.play();
    playCurrent();
    typewriter_animate(typewriter_strings);
    ts.classList.add("hidden");
}

async function openinterests() {
    clik.play();
    mainbox.classList.add("hidden")
    await sleep(500)
    interests.classList.add("active")
}

async function openlikesdislikes() {
    clik.play();
    mainbox.classList.add("hidden")
    await sleep(500)
    likesDislikes.classList.add("active")
}

// async function opensocials() {
//     mainbox.classList.add("hidden")
//     await sleep(500)
//     socials.classList.add("active")
// }

async function return_to_main_box() {
    clik.play();
    interests.classList.remove("active")
    likesDislikes.classList.remove("active")
    // socials.classList.remove("active")
    await sleep(500)
    mainbox.classList.remove("hidden")
}

async function typewriter_title(title) {
    title = title.replaceAll(" ", "\u00A0")
    document.title = title[0]
    for (let index = 1; index < title.length; index++) {
        await sleep(400)
        let char = title[index];
        document.title += char
    }
}

async function typewriter_clear() {
    for (let index = document.title.length; index > 1; index--) {        
        await sleep(400)
        document.title = document.title.slice(0, -1)
    }
}

const elementPageX = (elem) => window.pageXOffset + elem.getBoundingClientRect().left

async function typewriter_animate(list){
    while (true) {
        for (let index = 0; index < list.length; index++) {
            let text = list[index];
            await typewriter_title(text)
            await sleep(1000)
            await typewriter_clear()
            await sleep(1000)
        }
    }
}


function update_progressbar(progress) {
    progressbarline.style.width = `${progress}%`
}


async function progressbar() {
    while (true) {
        current_audio = audios[currentIndex]
        song_percentage = (current_audio.currentTime / current_audio.duration) * 100
        update_progressbar(song_percentage)
        await sleep(1000)
    }
}




progressbarFullLine.addEventListener("mousedown", (event) => {
    dragging = true;
    song_percentage = Math.max(Math.min((event.pageX - elementPageX(progressbarFullLine)) / progressbarFullLine.offsetWidth * 100, 100), 0)
    current_audio.currentTime = (song_percentage / 100) * current_audio.duration
    update_progressbar(song_percentage)

    music_pause(pausebtn)
});

dragging = false;

document.addEventListener("mouseup", (event) => {
    if (dragging) {
        dragging = false;
        music_pause(pausebtn)

    }
});

document.addEventListener("mousemove", (event) => {
    if (dragging) {
        song_percentage = Math.max(Math.min((event.pageX - elementPageX(progressbarFullLine)) / progressbarFullLine.offsetWidth * 100, 100), 0)
        current_audio.currentTime = (song_percentage / 100) * current_audio.duration
        update_progressbar(song_percentage)
}});


audios.forEach(audio => {
    audio.addEventListener("pause", (event) => {
        pausebtn.classList.add("paused");
    });
});

audios.forEach(audio => {
    audio.addEventListener("play", (event) => {
        pausebtn.classList.remove("paused");
    });
});


progressbar()