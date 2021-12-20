function iniciarGrafico(pokemon) {

  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title: {
      text: "Info de Pokemon ${pokemon.name}"
    },
    data: [{
      type: "pie",
      startAngle: 240,
      yValueFormatString: "##0.00\"%\"",
      indexLabel: "{label} {y}",
      dataPoints: [
        {y: 79.45, label: "Google"},
        {y: 7.31, label: "Bing"},
        {y: 7.06, label: "Baidu"},
        {y: 4.91, label: "Yahoo"},
        {y: 1.26, label: "Others"}
      ]
    }]
  });
  chart.render();
}

$('#pokemon-form').on('submit', function(ev) {
    // primero evitamos que se recargue la página
    ev.preventDefault();

    // obtengo la id ingresada por el usuario
    const id = $('#pokemon-id').val();

    $.get(`https://pokeapi.co/api/v2/pokemon/${id}`, function(pokemon) {
      // Primero cargo el nombre
      $('.card-title').html(pokemon.name);

      // Ahora limpiamos la UL de tipos
      $('#tipos').html('');

      // Y agregamos tipos nuevos
      pokemon.types.map(tipo => 
        $('#tipos').append(`<li>${tipo.type.name}</li>`)
      );
      console.log(pokemon);
      // Finalmente la imagen
      $('#pokemon-img').attr('src', pokemon.sprites.front_default)
      $('#pokemon-img').width(150);
      $('#pokemon-img').eight(150);

      //iniciamos grafico
      iniciarGrafico(pokemon);

    });
  });