let mainbox = document.getElementById("mainbox")
let interests = document.getElementById("interests")
let likesDislikes = document.getElementById("likes-dislikes")
// let socials = document.getElementById("socials")

let audios = [document.getElementById("is-it-just-me"), document.getElementById("his-theme")]

let meow = document.getElementById("meow")
let clik = document.getElementById("clik")

let songname = document.getElementById("songname")

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

async function play_audios(audios) {
    for (let index = 0; index < audios.length; index++) {
        let audio = audios[index];
        audio.play();
        let src = audio.src;
        let fileName = src.substring(src.lastIndexOf('/') + 1);
        songname.innerText = decodeURI(fileName).slice(0, -4)
        console.log(audio.duration)
        await sleep(audio.duration*1000)
    }
}

function remove_bigclikclikbox(ts) {
    meow.play();
    play_audios(audios);
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

function music_previous() {
    
}