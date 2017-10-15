// Polyfill for window.fetch() from Github
import 'whatwg-fetch'
import 'babel-polyfill';

import '../global/style.css';

// import 'jquery-ui/themes/base/core.css';
// import 'jquery-ui/themes/base/menu.css';
// import 'jquery-ui/themes/base/autocomplete.css';
// import 'jquery-ui/themes/base/theme.css';
// For using jQuery UI: https://stackoverflow.com/a/42465244

import io from 'socket.io-client';
import store from 'store';

import { MovablePiece } from '../global/display/MovablePiece';

const storedUser = store.get('localRPG-user');
const user = {
  id: storedUser.id || null,
  name: storedUser || 'Player',
};

$(function () {
  const socket = io({
    query: Object.assign({}, user),
  });

  socket.on('update id', newId => {
    user.id = newId;
    store.set('localRPG-user', user);
  });

  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });

  const piece = new MovablePiece('https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', {
    socket: socket,
  });

  const piece2 = new MovablePiece('https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', {
    socket: socket,
    top: 3,
    left: 400,
  });
});