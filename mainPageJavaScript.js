const menuButton = document.querySelector('.menu');
const show = document.querySelector('.select');
var menuOpen = false;

menuButton.addEventListener('click', () => {
    if (!menuOpen) {
        menuButton.classList.add('open'); //Adds to class list so that we know what stage (on/off)
        show.classList.add('fade');
        menuOpen = true;
    } else {
        menuButton.classList.remove('open');
        show.classList.remove('fade');
        menuOpen = false;
    }
});

var playTypewriter;
var soundCookieExists;
var difficultyCookieExists;

if (window.location.href.match('settingsPage.html') != null) { //If a specific page is loaded
    //Checks the cookie for the sounds setting
    soundCookieExists = getCookie('playTypewriter');
    difficultyCookieExists = getCookie('setDifficulty');

    if (soundCookieExists == "") { //Checking if the cookie exsists and sets a default value
        console.log('No cookie found');
        playTypewriter = "0";
    } else {
        if (soundCookieExists == "1") { //Different options depending on what was saved
            document.getElementById('soundCheckbox').checked = true;
            playTypewriter = soundCookieExists;
        } else {
            document.getElementById('soundCheckbox').checked = false;
            playTypewriter = "0";
        }
    }

    if (difficultyCookieExists == "") { //Error if nothing
        console.log('No cookie found');
        difficultyCookieExists = 1;
    } else {
        document.getElementById('difficulty').value = difficultyCookieExists; //Sets cookie to the selected value
    }
}

function setTypewriter() { //Ff the cookie is found and correct
    const soundCheck = document.getElementById("soundCheckbox");
    if (soundCheck.checked) {
        playTypewriter = "1"
        document.cookie = "playTypewriter=" + playTypewriter + "; expires=Thu, 18 Dec 2060 12:00:00 UTC;";
    } else {
        playTypewriter = "0";
        document.cookie = "playTypewriter=" + playTypewriter + "; expires=Thu, 18 Dec 2060 12:00:00 UTC;";
    }
}

var setDifficulty;

function setDifficulty() { //Setting difficulty depending on the cookie
    const difficulty = document.getElementById("difficulty");
    document.cookie = "setDifficulty=" + difficulty.value + "; expires=Thu, 28 Dec 2060 12:00:00 UTC;";
}

var typewriter = document.getElementById('typewriter');

function playType() { //Plays a typewriter click sound if cookie is correct
    var soundCookie = getCookie('playTypewriter');
    if (soundCookie == "1") {
        typewriter.play();
    }
}

var play = 0;
var music = document.getElementById('audio');
var muteUnmuteBtn = document.getElementById('audioMUMBtn')

function playMusic() { //Plays the music when the image is clicked
    if (play === "1") {
        music.pause();
        play = "0";
        muteUnmuteBtn.src = "Images/volume-mute-solid.svg";
    } else {
        music.play();
        play = "1";
        muteUnmuteBtn.src = "Images/volume-up-solid.svg";
    }
}

//Gets any cookie from the given name
function getCookie(cookieName) {
    var name = cookieName + "="; //Gets the cookie name
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';'); //Delimiter
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]; //Loops through each section from the delimiter
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length); //Sets the cookie to correct value
        }
    }
    return ""; //If it doesn't exist then send back nothing
}

/*getCookie function taken from W3 Schools as it is a very 
clear way to get data from any cookie*/