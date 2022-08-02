var createButton = document.querySelector("#createButton");
var categoryName = document.querySelector("#categoryName");

var createCategory = function(event) {
    var requestBody = {
        "name": categoryName.value
    };
    fetch("https://127.0.0.1:8000/api/categories", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }).then(function(response) {
            return response.json()
        })
        .then(function(responseJSON) {
            var resultDiv = document.createElement("div");
            if (responseJSON["@type"] == "hydra:Error") {
                console.log("Une erreur est survenue : " + responseJSON["hydra:description"])
                resultDiv.innerHTML = "Une erreur est survenue";
            } else {
                console.log(responseJSON)
                resultDiv.innerHTML = "Catégorie créée";
            }
            document.body.appendChild(resultDiv);
        })
}

createButton.addEventListener("click", createCategory);