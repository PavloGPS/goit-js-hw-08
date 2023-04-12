import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const currentTimeKey = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlayerTimeUpdate, 1000));

function onPlayerTimeUpdate(evt) {
  const currentTimeValue = JSON.stringify(evt.seconds);
  localStorage.setItem(currentTimeKey, currentTimeValue);
}

const timeToContinue = JSON.parse(localStorage.getItem(currentTimeKey));
player.setCurrentTime(timeToContinue || 0);
