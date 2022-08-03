// POST
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

var selectArticle = document.getElementById('selectArticle');

// GET
// on va chercher tous les articles
var articlesList = function(event) {
    fetch("https://127.0.0.1:8000/api/articles")
        .then(function(response) {
            return response.json()
        })
        .then((responseJSON) => {
            var articles = responseJSON["hydra:member"];
            for (let i = 0; i < articles.length; i++) {

                var option = document.createElement('option');
                option.value = articles[i].id;
                option.innerHTML = `${articles[i].title}`;
                selectArticle.appendChild(option);
            };

            var divArticle = document.createElement('div');
            document.querySelector('#articleDisplay').appendChild(divArticle);

            selectArticle.addEventListener('change', () => {
                var selectValue = parseInt(selectArticle.value);

                while (divArticle.firstChild) {
                    divArticle.firstChild.remove();
                }

                var div1 = document.createElement('div')
                div1.id = "div1";
                divArticle.appendChild(div1);

                var input = document.createElement('input');
                input.id = "title";
                input.value = articles[selectValue - 1].title;
                div1.appendChild(input);

                var div2 = document.createElement('div')
                div2.id = "div2";
                divArticle.appendChild(div2);

                var textarea = document.createElement('textarea');
                textarea.id = "body";
                textarea.cols = "40";
                textarea.rows = "15";
                textarea.innerHTML = articles[selectValue - 1].body;
                div2.appendChild(textarea);

                var updateBtn = document.createElement('button');
                updateBtn.id = "update"
                updateBtn.innerHTML = "Update";
                divArticle.appendChild(updateBtn);

                var deleteBtn = document.createElement('button');
                deleteBtn.id = "delete";
                deleteBtn.innerHTML = "Delete";
                divArticle.appendChild(deleteBtn);
            })
        })
}

articlesList();

// PUT
document.addEventListener('change', () => {
    var title = document.getElementById('title').value;
    var body = document.getElementById('body').value;
    var updateBtn = document.getElementById('update');
    var deleteBtn = document.getElementById('delete');
    var articleId = parseInt(selectArticle.value) + 1;

    var updateArticle = function(event) {
        var requestBody = {
            "title": title,
            "body": body
        };
        fetch(`https://127.0.0.1:8000/api/articles/${articleId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            }).then(function(response) {
                return response.json()
            })
            .then(function(responseJSON) {
                var resultP = document.createElement("p");
                if (responseJSON["@type"] == "hydra:Error") {
                    console.log("Une erreur est survenue : " + responseJSON["hydra:description"]);
                    resultP.innerHTML = "Une erreur est survenue";
                } else {
                    console.log(responseJSON);
                    resultP.innerHTML = "Article mis à jour";
                }
                document.querySelector('#result').appendChild(resultP);
            });
    };

    updateBtn.addEventListener("click", updateArticle);

    var deleteArticle = function(event) {
        fetch(`https://127.0.0.1:8000/api/articles/${articleId}`, { method: "DELETE" })
    };

    deleteBtn.addEventListener("click", deleteArticle);
});