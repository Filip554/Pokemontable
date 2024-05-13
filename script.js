$(document).ready(function () {
  fetch("https://pokeapi.co/api/v2/pokemon-color/yellow", {
    method: "GET",
  }).then((response) => {
    if (response.status === 200) {
      response.json().then((data) => {
        renderPokemonResults(data);
        afterRender();
      });
    }
  });

  function renderPokemonResults(pokemonData) {
    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    var context = { pokemons: pokemonData.pokemon_species.slice(0, 20) };
    var html = template(context);

    document.querySelector("#table-results").innerHTML = html;
  }

  function addStripes() {
    $("table tr").removeClass("striped");
    $("table tr:nth-child(even)").addClass("striped");
  }

  function afterRender() {
    addEventListeners();
    addStripes();
    $("table th").css("color", "darkBlue");

    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"]'
    );
    const popoverList = [...popoverTriggerList].map(
      (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
    );

    hideTableRows();
  }

  function addEventListeners() {
    $("table tr").on("mouseover", (e) => {
      $(e.currentTarget.children).addClass("highlighted");
    });

    $("table tr").on("mouseleave", (e) => {
      $(e.currentTarget.children).removeClass("highlighted");
    });
  }

  function hideTableRows() {
    setTimeout(function () {
      const elementsToBeHidden = $("table td a").filter(function () {
        return this.innerHTML.startsWith("p");
      });

      elementsToBeHidden.closest("tr").remove();
      addStripes();

      $("<div></div>")
        .insertAfter($("#entry-template"))
        .text("Skriveno: " + elementsToBeHidden.length);
    }, 2000);
  }
});

$(window).resize(() => {
  console.log($(window).width());
});