let landpage = document.querySelector('.landing-page');
let linksmenu = document.querySelector('.links');
let linksA = document.querySelectorAll('.links li a');
let menuicon = document.querySelector('.toggle-menu');
let setbox = document.querySelector('.settings-box');
let geardiv = document.querySelector('.toggle-settings');
let gearicon = document.querySelector('.toggle-settings i');
let colorslist = document.querySelectorAll('.colors-list li');
let activebg = document.querySelectorAll('.random-backgrounds span');
let activebullets = document.querySelectorAll('.bullets-option span');
let navbullets = document.querySelector('.nav-bullets');
let bullets = document.querySelectorAll('.nav-bullets .bullet');
let reoptionbtn = document.querySelector('.reset-options');
let skillprogress = document.querySelectorAll('.skill-progress span');
let gallery = document.querySelectorAll('.images-box img');

// ------------------Change Background-----------------
let imgarr = ['01','02','03','04','05'];
let changebgoption = 'yes';

checkrandombg();
function checkrandombg() {
    if (localStorage.randombg != null) {
        if (localStorage.randombg == 'no') {
            changebgoption = 'no';
            activebg[0].classList.remove('active');
            activebg[1].classList.add('active');
        }else {
            changebgoption = 'yes';
        }
    }
}

let bgtiming;
changebg();
function changebg() {
    if (changebgoption == 'yes') {
        bgtiming = setInterval(() => {
            let imgindex = Math.floor(Math.random() * imgarr.length);
            landpage.style.backgroundImage = `url("imgs/${imgarr[imgindex]}.jpg")`;    
        }, 3000);
    }else {
        clearInterval(bgtiming);
    }
};

activebg.forEach((e) => {
    e.onclick = () => {
        activebg.forEach((e) => {
            e.classList.remove('active');
        });
        e.classList.add('active');
        localStorage.setItem('randombg', e.dataset.background);
        checkrandombg();
        changebg();
    };
});

// -------------------Menu Icon-----------------------
menuicon.onclick = (e) => {
    e.stopPropagation();
    menuicon.classList.toggle('menu-active');
    linksmenu.classList.toggle('open');
}

linksmenu.onclick = (e) => {
    e.stopPropagation();
}

document.addEventListener('click', (e) => {
    if (e.target !== menuicon && e.target !== linksmenu) {
        if (linksmenu.classList.contains('open')) {
            menuicon.classList.remove('menu-active');
            linksmenu.classList.remove('open');
        }
    }
});

linksA.forEach((e) => {
    e.onclick = (el) => {
        el.preventDefault();
        document.querySelector(e.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });
    }
});

// -----------------------Setting Box---------------------------
geardiv.onclick = (e) => {
    setbox.classList.toggle('open');
    gearicon.classList.toggle('fa-spin');
    e.stopPropagation();
}

setbox.onclick = (e) => {
    e.stopPropagation();
}

document.addEventListener('click', (e) => {
    if (e.target !== setbox && e.target !== geardiv) {
        if (setbox.classList.contains('open')) {
            setbox.classList.remove('open');
            gearicon.classList.remove('fa-spin');
        }
    }
})

setdefultcolor();
function setdefultcolor() {
    if (localStorage.color != null) {
        document.documentElement.style.setProperty('--main-color', localStorage.color);
        colorslist.forEach((e) => {
            if (e.dataset.color == localStorage.color) {
                colorslist.forEach((e) => {
                    e.classList.remove('active');
                });
                e.classList.add('active');
            }
        })
    }
}

colorslist.forEach((e) => {
    e.onclick = () => {
        colorslist.forEach((e) => {
            e.classList.remove('active');
        });
        e.classList.add('active');
        document.documentElement.style.setProperty('--main-color', e.dataset.color);
        localStorage.setItem('color', e.dataset.color);
    };
});

// -----------------------Bullets Nav------------------------
checkbullets();
function checkbullets() {
    if (localStorage.showbullets != null) {
        if (localStorage.showbullets == 'hide') {
            navbullets.style.display = 'none';
            activebullets[0].classList.remove('active');
            activebullets[1].classList.add('active');
        }else {
            navbullets.style.display = 'block';
        }
    }
}

activebullets.forEach((e) => {
    e.onclick = () => {
        activebullets.forEach((el) => {
            el.classList.remove('active');
        });
        e.classList.add('active');
        localStorage.setItem('showbullets', e.dataset.display);
        if (e.dataset.display == 'hide') {
            navbullets.style.display = 'none';
        }else{
            navbullets.style.display = 'block';
        }
    };
});

bullets.forEach((e) => {
    e.onclick = () => {
        document.querySelector(e.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });
    }
});

//----------------------Reset Options------------------------
reoptionbtn.onclick = () => {
    colorslist.forEach((e) => {
        e.classList.remove('active');
    });
    localStorage.setItem('color', '#FF9800');
    setdefultcolor();

    activebg.forEach((e) => {
        e.classList.remove('active');
    });
    activebg[0].classList.add('active');
    changebgoption = 'yes';
    localStorage.setItem('randombg', 'yes');
    changebg();

    activebullets.forEach((el) => {
        el.classList.remove('active');
    });
    activebullets[0].classList.add('active');
    localStorage.setItem('showbullets', 'show');
    checkbullets();
}

// ----------------------Skills Progress---------------------
window.onscroll = () => {
    if (window.scrollY > 850) {
        skillprogress.forEach((e) => {
            e.style.width = e.dataset.progress
        })
    }
}

// -----------------Image Popup--------------------------
let imgpopup;
gallery.forEach((e) => {
    e.onclick = () => {
        imgpopup = `
        <div class="popup-overlay"></div>
        <div class="popup-box">
            <h3>${e.alt}</h3>
            <img src="${e.src}">
            <span onclick="closepopupimg()" class="close-button">X</span>
        </div>
        `
        document.querySelector('.gallery-popup').innerHTML = imgpopup;
    }
});

function closepopupimg() {
    document.querySelector('.gallery-popup').innerHTML = "";
}

// --------------------Date Copyrights----------------
let Copyrightsdate = new Date();
document.querySelector('.footer span').innerHTML = Copyrightsdate.getFullYear();