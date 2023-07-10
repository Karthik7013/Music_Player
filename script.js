let prev_btn = document.getElementById("prev_btn"),
    next_btn = document.getElementById("next_btn"),
    play_pause_btn = document.getElementById("play_pause_btn"),
    play_btn_mini = document.getElementById("play_btn_mini"),
    mini_img = document.getElementById("mini-img"),
    audio = document.createElement("audio"),
    song_img = document.getElementById("song-img"),
    song_title = document.getElementById("song-title"),
    song_title_mini = document.getElementById("song-title-mini"),
    player_body = document.querySelector(".player-body"),
    movie_name = document.querySelector(".left"),
    movie_name_mini = document.getElementById("movie-name-mini"),
    movie_year = document.querySelector(".right"),
    shuffle_btn = document.querySelector(".shuffle"),
    loop_btn = document.querySelector(".loop")
let play = play_pause_btn.children[0].classList.contains("fa-pause");

let shuffle = false;
let loop = false
let track_queue = 0;
console.log(movie_name_mini);


window.addEventListener("load", () => {
    loadSongs(track_queue);
})


function loadSongs(track_queue) {
    let fetchData = fetch("index.json")
    fetchData.then((data) => {
        data.json().then((res) => {
            res.map((e) => { Cover(e) });
            song_img.src = `${res[track_queue].album_img}`
            mini_img.src = `${res[track_queue].album_img}`
            song_title.innerText = `${res[track_queue].title}`
            audio.src = `${res[track_queue].track}`
            movie_name.innerText = `${res[track_queue].movie_name}`
            movie_name_mini.innerText = `${res[track_queue].movie_name}`
            song_title_mini.innerText = `${res[track_queue].title}`;
            movie_year.innerText = `${res[track_queue].year}`

            shuffle_btn.addEventListener("click", () => { toggleShuffle() })
            next_btn.addEventListener("click", () => { nextAudio(res) })
            play_btn_mini.addEventListener("click", () => { playPause() })
            prev_btn.addEventListener("click", () => { prevAudio(res) })
            play_pause_btn.addEventListener("click", () => { playPause() })
            loop_btn.addEventListener("click", () => { toggleLoop() })

            let song_covers = document.querySelectorAll(".card");
            for (let i = 0; i < res.length; i++) {
                song_covers[i].addEventListener("click", () => {
                    clickAudio(res, i, song_covers);
                })
            }
            audio.addEventListener("ended", () => { nextAudio(res) })
        })
    })
}



function loadsong(res, track_queue) {
    movie_name_mini.innerText = `${res[track_queue].movie_name}`
    song_title_mini.innerText = `${res[track_queue].title}`;
    song_img.src = `${res[track_queue].album_img}`
    mini_img.src = `${res[track_queue].album_img}`
    song_title.innerText = `${res[track_queue].title}`
    audio.src = `${res[track_queue].track}`
    movie_name.innerText = `${res[track_queue].movie_name}`
    movie_year.innerText = `${res[track_queue].year}`
    document.body.title = `Music Player | ${res[track_queue].title}`
    audio.play();
    play_pause_btn.children[0].setAttribute("class", "fa-solid fa-pause mr1")
    play_btn_mini.children[0].setAttribute("class", "fa-solid fa-pause mr")
}

function toggleShuffle() {
    if (!shuffle) {
        shuffle = true;
        shuffle_btn.style.color = "#64ff6a"
    } else {
        shuffle = false
        shuffle_btn.style.color = "white"
    }
}
function toggleLoop() {
    if (loop === false) {
        loop = true;
        loop_btn.style.color = "green"
    } else {
        loop = false
        loop_btn.style.color = "white"
    }
}


function Cover(res) {
    player_body.innerHTML += `
                    <div class="card">
                    <div class="img">
                        <img src=${res.album_img} alt="">
                    </div>
                    <div class="card-body">
                        <p>${res.title}</p>
                         <p style="color: rgb(185, 185, 185);font-weight: 100;">${res.movie_name} | ${res.year}</p>
                    </div>
                </div>
    `
};

let getRandomInt = end => {
    let randomInt = Math.floor(Math.random() * end);
    return randomInt < end ? randomInt : getRandomInt(end);
}
function clickAudio(res, i) {
    track_queue = i;
    loadsong(res, track_queue)
    play = true;
}

function nextAudio(res) {
    play_pause_btn.children[0].setAttribute("class", "fa-solid fa-pause")
    if (shuffle === false) {
        track_queue++;
        if (track_queue <= res.length - 1) {
            loadsong(res, track_queue)

        } else {
            track_queue = 0;
            loadsong(res, track_queue)
        }
    } else {
        track_queue = getRandomInt(res.length);
        loadsong(res, track_queue)
    }
    play = true
}

function prevAudio(res) {
    play_pause_btn.children[0].setAttribute("class", "fa-solid fa-pause")
    if (shuffle === false) {
        track_queue--;
        if (track_queue >= 0) {
            loadsong(res, track_queue)
        } else {
            track_queue = res.length - 1;
            loadsong(res, track_queue)
        }
    } else {
        track_queue = getRandomInt(res.length);
        loadsong(res, track_queue)
    }
    play = true
}

function playPause() {
    if (!play) {
        audio.play()
        play_pause_btn.children[0].setAttribute("class", "fa-solid fa-pause mr1")
        play_btn_mini.children[0].setAttribute("class", "fa-solid fa-pause mr")
        play = true;
    } else {
        audio.pause();
        play_pause_btn.children[0].setAttribute("class", "fa-solid fa-play")
        play_btn_mini.children[0].setAttribute("class", "fa-solid fa-play")
        play = false
    }
}