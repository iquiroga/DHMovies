const db = require("../database/models");
const { Op } = require("sequelize");
let moment = require('moment');

let moviesController = {
  allMovies: (req, res) => {
    db.Peliculas.findAll({order: [
      ['title', 'ASC']
    ]}).then((peliculas) => {
      res.render('index', { peliculas });
    });
  },
  moviesById: (req, res) => {
    let movieId = req.params.id;
    db.Peliculas.findByPk(movieId).then(pelicula => {
      pelicula.release_date = moment(pelicula.release_date).format('YYYY/MM/DD');
      res.render('movieDetail', { pelicula: pelicula });
    });
  },
  newMovies: (req, res) => {
    db.Peliculas.findAll({order: [
      ['release_date', 'DESC']
    ],limit:5})
      .then((peliculas) => {
      res.render('new', {peliculas});
    });
    
  },
  recommended: (req, res) => {
    db.Peliculas.findAll({
      where: {
        rating: {[Op.gte]: 8}
      }
    }).then((peliculas) => {
      res.render('recommended', { peliculas });
    });
  },
  searchMovies: (req, res) => {
    let movie = req.body.search;
    db.Peliculas.findAll({
      order: [
        ['title', req.body.order]
      ],
      where: {
        title: {[Op.substring]: movie}
      }
    }).then((peliculas) => {
      res.render('search', { peliculas });
    });

  },
  loadMovies: (req, res) => {
    res.render('create');
  },
  createMovies: (req, res) => {
    db.Peliculas.create({
      title: req.body.title,
      awards: req.body.awards,
      length: req.body.length,
      release_date: req.body.release_date,
      rating: req.body.rating
    })
    res.redirect('/')
  },
  getEditMovies: (req, res) => {
    let movieId = req.params.id;
    db.Peliculas.findByPk(movieId).then((pelicula) => {
      res.render('edit', { pelicula, movieId });
    });
    
  },
  editMovies: (req, res) => {
    let movieId = req.params.id;
    console.log(movieId)
    db.Peliculas.update({
      title: req.body.title,
      awards: req.body.awards,
      length: req.body.length,
      release_date: req.body.release_date,
      rating: req.body.rating
    },{
      where: {
        id: movieId
      }
    })

    res.redirect('/')
  },
  deleteMovies: (req, res) => {
    let movieId = req.params.id;
    console.log(movieId)
    db.Peliculas.destroy({
      where: {
        id: movieId
      }
    })
    res.redirect('/')
  }
}

module.exports = moviesController;