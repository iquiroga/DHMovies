module.exports = (sequelize, dataTypes) => {
  let alias = "Peliculas";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: dataTypes.STRING,
    awards: dataTypes.INTEGER,
    length: dataTypes.INTEGER,
    release_date: dataTypes.DATEONLY,
    rating: dataTypes.FLOAT
  };
  let config = {
    tableName: "movies",
    timestamps: false
  }

  const Pelicula = sequelize.define(alias, cols, config);

  return Pelicula;
}