// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

let mousedown = false;

// Build functions
function togglePlay() {
    video.paused ? video.play() : video.pause();

}

function updateButton() {
    video.paused ? toggle.textContent = "►" : toggle.textContent =  "⏸︎";
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.setProperty(`flex-basis`, `${percent}%`);
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function skip() {
    const skipLength = parseInt(this.dataset.skip)
    video.currentTime += skipLength;
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function toggleFullscreen() {
    openFullscreen(video);
}

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

// Connect event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullscreen.addEventListener('click', toggleFullscreen);
