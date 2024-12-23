console.log("welcome")

let index = 0;
let songindex = 0;
let audioElement = new Audio('music/1.mp3')
let masterplay = document.getElementById('masterplay');
let Progressbar = document.getElementById('Progressbar');
let Songitem = Array.from(document.getElementsByClassName('Songitem'));
let bannerimage = document.getElementById('bannerimage');
let titen = document.getElementById('titen');
// let songplay = Array.from(document.getElementsByClassName('songplay'));

let song = [
    { songname: "thoudend year", filepath: "music/1.mp3", coverpath: "images/1.jpg" },
    { songname: "Perfect", filepath: "music/2.mp3", coverpath: "images/2.jpg" },
    { songname: "Night - Change", filepath: "music/3.mp3", coverpath: "images/3.jpg" },
    { songname: "Let-Me-Love-You", filepath: "music/Let.mp3", coverpath: "images/4.jpg" },
    {songname:"thunder",filepath:"music/5.mp3", coverpath:"images/5.jpg"},
    {songname:"warriyo-mortals",filepath:"music/6.mp3", coverpath:"images/6.jpg"},
    {songname:"Main-Agar",filepath:"music/7.mp3", coverpath:"images/7.jpg"}
]

Songitem.forEach((element, i) => {
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src = song[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = song[i].songname;
});
// audioElement.play();
//handel play
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    }
    else {
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
    }
});

audioElement.addEventListener('timeupdate', () => {
    Progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    
    Progressbar.value = Progress
})
Progressbar.addEventListener('change', () => {
    audioElement.currentTime = Progressbar.value * audioElement.duration / 100;
});

const makeallplay = () => {
        Array.from(document.getElementsByClassName('songplay')).forEach((element) => {
                element.classList.remove('fa-circle-pause');
                element.classList.add('fa-circle-play');      
        });
}
Array.from(document.getElementsByClassName('songplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);
        makeallplay();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play')
        e.target.classList.add('fa-circle-pause')
        audioElement.src = `music/${songindex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        
        bannerimage.src = `images/${songindex + 1}.jpg`;
        titen = song.filter((ele) =>{
            return ele.id == songindex;
        })
        titen.forEach(ele =>{
            let {songname} = ele;
            titen.innerText = songname;
        })
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songindex >= 5) {
        songindex = 0;
    }
    else {
        songindex += 1;
    }
    audioElement.src = `music/${songindex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');

    bannerimage.src = `images/${songindex + 1}.jpg`;
    // let titen = song.filter((ele) =>{ 
    //     return ele.id == songindex;
    // })
    // titen.forEach(ele =>{
    //     let {songname} = ele;
    //     titen.innerHTML = songname;
    // })
  

});

// document.querySelector('#next').addEventListener('click', () => {
//     if (songindex >= 9) {
//         songindex = 0;
//     }
//     else {
//         songindex += 1;
//     }
//     audioElement.src = `music/${songindex + 1}.mp3`;
//     audioElement.currentTime = 0;
//     audioElement.play();
//     masterplay.classList.remove('fa-circle-play');
//     masterplay.classList.add('fa-circle-pause');

// });


document.getElementById('previous').addEventListener('click', () => {
    if (songindex <= 0) {
        songindex = 0;
    }
    else {
        songindex -= 1;
    }
    audioElement.src = `music/${songindex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');

    bannerimage.src = `images/${songindex + 1}.jpg`;
    let stiten = song.filter((ele) =>{
        return ele.id == songindex;
    })
    stiten.forEach(ele =>{
        let {songname} = ele;
        titen.innerHTML = songname;
    })
   
});

let curstart = document.getElementById('curstart');
let curend = document.getElementById('curend');

audioElement.addEventListener('timeupdate',()=>{
    let curr_music = audioElement.currentTime;
    let dur_music = audioElement.duration;

    let min =Math.floor(curr_music/60);
    let sec =Math.floor(dur_music%60);

    curend.innerText=`${min}:${sec}`;
})