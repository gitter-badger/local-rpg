// Polyfill for window.fetch() from Github
import 'whatwg-fetch'
import 'babel-polyfill';

import '../global/style.css';

import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/menu.css';
import 'jquery-ui/themes/base/autocomplete.css';
import 'jquery-ui/themes/base/theme.css';

import io from 'socket.io-client';
// For using jQuery UI: https://stackoverflow.com/a/42465244

import { MovablePiece } from '../global/display/MovablePiece';

$(() => {
  const socket = io('http://localhost:3000');
  $('form').submit(() => {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', msg => {
    $('#messages').append($('<li>').text(msg));
  });

  socket.on('console.log', value => {
    console.log(value);
  });

  // socket.on('moved piece', pieceData => {
  //   $(`#${pieceData.id}`).css({ top: pieceData.position.top, left: pieceData.position.left });
  // });

  const piece = new MovablePiece('https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', {
    socket: socket,
  });

  const piece2 = new MovablePiece('https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', {
    socket: socket,
    top: 3,
    left: 400,
  });
});
