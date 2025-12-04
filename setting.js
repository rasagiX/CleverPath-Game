/* ------------------------------
   AUTO APPLY DARK MODE
------------------------------ */
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}

/* ------------------------------
   AUTO APPLY SOUND
------------------------------ */
const bgMusic = document.getElementById('bgMusic');
const soundBtn = document.getElementById('soundToggle');
const soundIcon = soundBtn ? soundBtn.querySelector('i') : null;

let isPlaying = false;

let savedSound = localStorage.getItem("sound");

if (savedSound === "on") {
    if (bgMusic) {
        bgMusic.volume = 0.4;
        bgMusic.play();
        isPlaying = true;
        if (soundIcon) soundIcon.className = "fa fa-volume-up";
    }
} else {
    if (soundIcon) soundIcon.className = "fa fa-volume-off";
}

/* ------------------------------
   SOUND TOGGLE BUTTON
------------------------------ */
if (soundBtn) {
    soundBtn.onclick = () => {
        if (!isPlaying) {
            bgMusic.volume = 0.4;
            bgMusic.play();
            isPlaying = true;
            soundIcon.className = 'fa fa-volume-up';
            localStorage.setItem("sound", "on");
        } else {
            bgMusic.pause();
            isPlaying = false;
            soundIcon.className = 'fa fa-volume-off';
            localStorage.setItem("sound", "off");
        }
    };
}

/* ------------------------------
   DARK MODE BUTTON
------------------------------ */
const darkBtn = document.getElementById('darkModeBtn');

if (darkBtn) {
    darkBtn.onclick = () => {
        document.body.classList.toggle("dark-mode");

        localStorage.setItem(
            "darkMode",
            document.body.classList.contains("dark-mode") ? "enabled" : "disabled"
        );
    };
}
