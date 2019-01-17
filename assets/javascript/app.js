$(document).ready(function () {

    $("#gif-view").empty();

    var ingredients = ["Burger", "Cheese", "Tomatoe", "Onion", "Lettuce"];
    function renderButtons() {
        $("#button-view").empty();
        for (var i = 0; i < ingredients.length; i++) {
            var btn = $('<button>');
            btn.attr("class", "ingredient");
            btn.attr("data-name", ingredients[i]);
            btn.text(ingredients[i]);
            $('#button-view').append(btn);
        }
    }

    $("#addIngredient").on("click", function (event) {
        console.log(this);
        event.preventDefault();
        var name = $("#ingredientName").val().trim();
        ingredients.push(name);
        renderButtons();
    });

    $(document).on("click", ".ingredient", function () {
        console.log(this);
        event.preventDefault();
        var name = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=te9EQFqo1Vln8joH3KMgLBMHgYjzOYLk&limit=1";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
              if (results[i].rating !== "r") {
                var gifDiv = $("<div>");
                var gifImage = $("<img>");
                gifImage.addClass("gif");
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-state", "still");
                gifDiv.append(gifImage);
  
                $("#gif-view").prepend(gifDiv);
              }
            }
        });
        $(document).on("click", ".gif", function() {
            console.log(this);
            var state = $(this).attr("data-state");
            if(state === 'still'){
              var animate = $(this).attr("data-animate");
              $(this).attr("src", animate);
              $(this).attr("data-state", 'animate');
            }
            if(state === 'animate'){
              
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", 'still');
            }
            console.log(state);
          });

          $(document).on("click", "#reset", function() {
            console.log(this);
            $("#gif-view").empty();
          });

    });

    renderButtons();

});