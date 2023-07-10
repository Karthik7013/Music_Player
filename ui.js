let close_btn = document.querySelector(".close");
let open_btn = document.querySelector(".min-left");
let player_ui = document.querySelector(".music-player-body-wraper")





close_btn.addEventListener("click", (e) => {
    player_ui.classList.remove("active")
})
open_btn.addEventListener("click", (e) => {
    player_ui.classList.add("active")
})



let music_player_controls = document.querySelector(".music-player-controls")

let detail_close = document.querySelector(".details-close")



detail_close.addEventListener("click", () => {
    music_player_controls.classList.toggle("show-details")
    detail_close.classList.toggle("rotate");

})



// menu


let menu = document.querySelector(".open");
console.log(menu)


menu.addEventListener("click", () => {
    let 
})