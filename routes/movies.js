var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/moviesController');

router.get('/', moviesController.allMovies);

router.get('/detail/:id', moviesController.moviesById);//Detalle de peliculas

router.get('/new', moviesController.newMovies); //Mostrar ultimas 5 peliculas

router.get('/recommended', moviesController.recommended); //Recomendadas rating > 8

router.post('/search', moviesController.searchMovies); //Buscar peliculas, (Elegir criterio de ordenamiento de los resultados)

router.get('/create', moviesController.loadMovies);
router.post('/create', moviesController.createMovies);

router.get('/edit/:id', moviesController.getEditMovies);
router.put('/edit/:id', moviesController.editMovies);

router.delete('/delete/:id', moviesController.deleteMovies);

router.post('/search', moviesController.searchMovies);


module.exports = router;




