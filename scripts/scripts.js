let mainbox = document.getElementById("mainbox")
let interests = document.getElementById("interests")
let likesDislikes = document.getElementById("likes-dislikes")
// let socials = document.getElementById("socials")

let audios = [
    document.getElementById("is-it-just-me"),
    document.getElementById("his-theme")
]

let meow = document.getElementById("meow")
let clik = document.getElementById("clik")

let songname = document.getElementById("songname")

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
    currentIndex = (currentIndex - 1 + audios.length) % audios.length;
    playCurrent();
}

function music_next() {
    currentIndex = (currentIndex + 1) % audios.length;
    playCurrent();
}

function music_pause(pause_btn) {
    pause_btn.classList.toggle("paused");
    if (current_audio.paused) {
        current_audio.play();
    } else {
        current_audio.pause();
    }
}

function remove_bigclikclikbox(ts) {
    meow.play();
    playCurrent();
    typewriter_animate(["about me! ^.^", "@velocitymeow"]);
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
