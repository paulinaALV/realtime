 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA69pOzVXkYBkXFi5FSO_PTYVhDr-9f2FE",
    authDomain: "chat-983cd.firebaseapp.com",
    databaseURL: "https://chat-983cd.firebaseio.com",
    projectId: "chat-983cd",
    storageBucket: "chat-983cd.appspot.com",
    messagingSenderId: "903296061521"
  };
  firebase.initializeApp(config);

  //agregamos la instancia de la BD
  const username = prompt('ingrese su nombre');
const database = firebase.database();

$('button').click ( function( event ) {
  event.preventDefault();
  var mensaje=  $("#mensaje").val();

  var data={usuario: username, mensaje: mensaje };
  database.ref('chat/').push(data, function(err){
    if (err){throw err; }
    else {
      console.info('guardamos la informacion');
      poner_mensaje(data);
      $('#mensaje').val('');
    }
  });
});

function poner_mensaje(pepito){
  $('#caja').append( '<p>' + pepito.usuario + ': ' + pepito.mensaje + '<p>');
}

function iterar(data){
  for(var leon in data ){
    if (data.hasOwnProperty(leon)){
      var element = data [leon];
      var gato = {
        usuario: element.usuario,
        mensaje: element.mensaje
      };
      poner_mensaje(gato);
    }
  }
}



var recuperacion = new Promise (function(res, rej){
  var mensajes= database.ref('/chat/').once('value').then(function(snapshot){
    return res(snapshot.val() );
  });
  if (!mensajes){ return rej(); }
});

recuperacion.then(function(data){
  iterar(data);
})