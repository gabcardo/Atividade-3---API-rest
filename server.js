const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
let alunos = [
    {id: 1, nome:'Ana', curso: 'Computação'},
    {id: 2, nome:'Pedro', curso: 'Informação'}
]
let proximoID = 3;

app.get('/alunos', (req, res) => {
    res.status(200).json(alunos);
});
app.get('/alunos:id', (req, res) => {
    const id = parseInt(req.params.id);
    const aluno = alunos.find(a => a.id === id);
    if (!aluno) {
        return res.status(404).json({erro: 'Aluno não encontrado'});
    }
    res.status(200).json(aluno);
});
app.post('/alunos', (req, res) => {
    const {nome, curso} = req.body;
    if (!nome || !curso) {
    return res.status(400).json({erro: 'Os campos nome e curso são obrigatórios'});
    }
    const novoAluno = {id: proximoID++, nome, curso};
    alunos.push(novoAluno);
    res.status(201).json(novoAluno);
});
app.put('/alunos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, curso } = req.body;

    if(!nome || !curso ){
        return res.status(400).json({erro: 'Os campos curso e nome são obrigátorios'});
    }
  const aluno = alunos.find(a=> a.id === id);

  if (!aluno){
    return res.status(404).json({erro:'Aluno não encontrado'});
  }
  aluno.nome = nome;
  aluno.curso = curso;
  res.status(200).json(aluno);

});
app.delete('/alunos/:id', (req, res)=> {
    const id = parseInt(req.params.id);
    const indice = alunos.findIndex(a => a.id === id);

    if (indice === -1){
        return res.status(400).json({erro:'Aluno não encontrado'});
    }
    alunos.splice(indice, 1);
    res.status(204).send();
});
app.listen(PORT, ()=>{
    console.log("Servidor rodando em http://localhost:3000");
});