

export const getData = () => 
fetch(`https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json`)
.then(response => response.json())