(function () {

  var F = Solipsist.Factory;

  var ProductFactory = F({
    id: F.int_sequence(),
    nombre: F.string_random_combinations(
      ["camisa", "pantalon", "camiseta", "abrigo", "sombrero", "zapato"],
      ["rojo", "negro", "blanco", "lila", "pardo", "azul", "verde"],
      ["de vestir", "de sport", "de gala", "informal", "fashion", "barato"]
    ),
    categoria: F.string_random_combinations(
      ["Privaera", "Verano", "Otoño", "Invierno"]
    ),
    precio: F.int_between(15, 200),
    pais: F.string_random_combinations(
      ["España", "Francia", "Portugal"]
    )
  });

  var _products = [];

  var id;
  for (var i=0; i<100; i++) {
    id = i + (Math.floor(Math.random() * 10) - 5);
    id = Math.max(id, 0);
    _products[id] = ProductFactory({id: id});
  }

  var Request = Solipsist.Request;

  Request.get('/products/:id', {delay: 300}, function (req) {
    var id = req.params['id'];
    var product = _products[id];
    if (product) {
      req.success(product);
    } else {
      req.error();
    }
  });

  Request.put('/products/:id', {delay: 300}, function (req) {
    var id = req.params['id'];
    var product = JSON.parse(req.data);
    _products[id] = product;
    req.success({id: id});
  });

  Request.delete('/products/:id', {delay: 300}, function (req) {
    var id = req.params['id'];
    if (_products[id]) {
      delete _products[id];
      req.success();
    } else {
      req.error();
    }
  });

  Request.post('/products', {delay: 300}, function (req) {
    var id = _.max(_.pluck(_products, "id")) + 1;
    var product = JSON.parse(req.data);
    product.id = id;
    _products[id] = product;
    req.success({id: id});
  });

  Request.get('/products', {delay: 700}, function (req) {
    req.success(_products.slice());
  });

}());
