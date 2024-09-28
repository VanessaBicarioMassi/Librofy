import express from "express";
import cors from "cors";
import { Request, Response } from "express";

const app = express();

app.use(express.json());
app.use(cors());

// Criação do tipo usuário
type User = {
  id: number; 
  username: string;
  email: string;
  password: string;
};

// Criação do vetor dos usuários
let users: User[] = [];

// Método para buscar usuários por ID
app.get("/users/:id", (req: Request, res: Response) => {

  const userId = Number(req.params.id); 
  const user = users.find(user => user.id === userId);

  if (!user) {
    throw res.status(404).json({ message: "Usuário não encontrado" });
  }

  // Retorno das informações do usuário
  res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
  });
});

// Método para criação de usuário
app.post("/users", (req: Request, res: Response) => {

  const { username, email, password } = req.body;

  if ( !username || !email || !password ) {
    throw res.status(400).json({ message: "Nome, email e senha são obrigatórios." });
  } 

  // Adiconando os dados do usuário criado no vetor Users
  const id = users.length + 1 
  const newUser: User = { id, username, email, password };
  users.push(newUser);

  // Retorno dos dados do criados
  res.status(201).json({
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    message: "Usuário criado com sucesso",
  });
});


// Método para deletar usuário por ID
app.delete("/users/:id", (req: Request, res: Response) => {

  const userId = Number(req.params.id); 

  const user = users.find(user => user.id === userId);
  if(!user) {
    throw res.status(404).json({ message: "Usuário não encontrado" }); 
  }

  users = users.filter(user => user.id !== userId);
  res.status(200).json({ message: "Usuário deletado com sucesso" });
});


// Método da porta 
app.listen(3003, () => {
  console.log("Servidor está rodando na porta 3003");
});