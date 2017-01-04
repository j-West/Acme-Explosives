let categories;
let types;
let products;
let selectedCat;
let typeList;
let captionDivs = $(".caption")

function displayProducts() {

  for (var i = 0; i < captionDivs.length; i++) {
    captionDivs[i].innerHTML =
    `
      <h2>${categories.name}</h2>
      <h3>${products[i].type_id}</h3>
      <h5>${products[i].name}</h5>
      <p>${products[i].description}</p>
      <p><a href="#" class="btn btn-primary" role="button">Buy Now</a> <a href="#" class="btn btn-default" role="button">Add To Cart</a></p>
    `
  }
}

function formattingProducts() {
  for (var i = 0; i < products.length; i++) {
    switch (products[i].type_id) {
      case 0:
        products[i].type_id = typeList[0].name
        break;
      case 1:
        products[i].type_id = typeList[1].name
        break;
      case 2:
        products[i].type_id = typeList[2].name
        break;
      case 3:
        products[i].type_id = typeList[3].name
        break;
      case 4:
        products[i].type_id = typeList[4].name
        break;
      case 5:
        products[i].type_id = typeList[5].name
        break;
    }
  }
  displayProducts()
}


function loadData() {
  var promise1 = new Promise(function(resolve, reject){
    var request1 = new XMLHttpRequest()
    request1.addEventListener("load", function() {
      var list = JSON.parse(request1.responseText).categories[selectedCat]
      resolve(list)// pass the info we're waiting for to the resolve
    })
    request1.open("GET", "categories.json")
    request1.send()
  })

  promise1
    .then(
    function(val){
      categories = val
      console.log("promise one resolved, ", categories)
      return promise2
    })
    .then(
      function(val) {
        types = val
        console.log("promise two resolved, ", types)
        return promise3
      })
      .then(
        function(val) {
        products = val
        console.log("promise three resolved, ", products)
      })
      .then(formattingProducts)


  var promise2 = new Promise(function(resolve, reject){
    var request2 = new XMLHttpRequest()
    request2.addEventListener("load", function() {
      typeList = JSON.parse(request2.responseText).types
      let list = typeList.map((typeList) => {
      return typeList
      }).filter(function(list) {
        if(list.category_id === selectedCat)
        return typeList
        })
      resolve(list)
    })
    request2.open("GET", "types.json")
    request2.send()
  })

  var promise3 = new Promise(function(resolve, reject){
    var request3 = new XMLHttpRequest()
    request3.addEventListener("load", function() {
      var list = JSON.parse(request3.responseText).products
      list = list.filter((list) => {
        if(list.type_id === types[0].id || list.type_id === types[1].id || list.type_id === types[2].id)
        return list
      })
      resolve(list)
    })
    request3.open("GET", "products.json")
    request3.send()
  })
}

$(".dropdown-menu").click(function(e) {
  if(e.target.text === "Demolition") selectedCat = 1;
    else selectedCat = 0;
    $(".hidden-stuff").removeClass("hidden-stuff");
  loadData()
})
