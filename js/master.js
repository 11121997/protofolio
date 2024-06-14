// check color storage
const mainColor = localStorage.getItem("color_option");

// check color in local Storage not empty
if (mainColor !== null) {
    document.documentElement.style.setProperty('--main-color', localStorage.getItem("color_option"));

    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");

        //add class active on element with data color === local storage item
        if (element.dataset.color === mainColor) {
            //add active class
            element.classList.add("active");
        }

    });

}

// background option
let backgroundOption = true;

// control option background interval
let backgroundInterval;

// check if there is background in local storage
let backgroundLocal = localStorage.getItem("background_option");

// check if background in local storage not empty
if (backgroundLocal !== null) {

    if (backgroundLocal === "true") {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    // remove active class from spans
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });
    if (backgroundLocal === "true") {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }

}


// toggle spin icon
document.querySelector(".toggle-setting i").onclick = function () {
    //rotation
    this.classList.toggle("fa-spin");
    //open
    document.querySelector(".settings-box").classList.toggle("open");
}

// switch colors
const colorsLi = document.querySelectorAll(".colors-list li");
// loop on all list items
colorsLi.forEach(li => {
    // click on list items
    li.addEventListener("click", (e) => {
        //set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        // set color on local storage
        localStorage.setItem("color_option", e.target.dataset.color);
        //remove active class from children
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        // add active class on target
        e.target.classList.add("active");
    });

});

// switch backgrounds
const randomBackE = document.querySelectorAll(".random-backgrounds span");
// loop on all spans
randomBackE.forEach(span => {
    // click on span
    span.addEventListener("click", (e) => {
        //remove active class from children
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        // add active class on target
        e.target.classList.add("active");

        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomImgs();
            localStorage.setItem("background_option", true);

        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });

});

// select landing page element
let landingPage = document.querySelector(".landing-page");
// get array of images
const imgsArr = ['01.jpg', '04.jpg', '05.jpg'];

// function for random background
function randomImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // get random number
      const randomNumber = Math.floor(Math.random() * imgsArr.length);

    // change background
    landingPage.style.backgroundImage = 'url("images/' + imgsArr[randomNumber] + '")';
    }, 1000);
  }
}

randomImgs();
