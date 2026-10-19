function validarAluno(req, res, next) {
  const {nome,curso} = req.body;
  if (
    typeof nome !== 'string' ||
    nome.trim() === '' ||
    typeof curso !== 'string' ||
    curso.trim() === '' ) {
    return res.status(400).json({errp:'Nome e curso são obrigatórios e devem ser textos não vazios.'});
    }
  next();
}
module.exports = validarAluno;
