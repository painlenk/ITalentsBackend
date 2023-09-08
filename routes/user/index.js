const express = require("express");
const router = express.Router();
const fs = require("fs");

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  try {
    const existUser = fs.existsSync(`./data/users/${email}.json`);
    console.log("existUser", existUser);
    if (existUser) {
      res.status(400).send("usuário ja criado -->");
      throw new Error("usuário ja criado");
    }

    const userData = {
      email,
      password,
    };

    fs.writeFileSync(
      `./data/users/${email}.json`,
      JSON.stringify(userData),
      (error, _) => {
        if (error) {
          res.status(400).send("O nome de usuário ja existe");
          throw new Error("error ao criar usuário");
        }
      }
    );
    res.status(201).send("Usuário criado com sucesso");
  } catch (e) {
    res.status(400).send("Erro ao criar o usuário");
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  try {
    const existUser = fs.existsSync(`./data/users/${email}.json`);
    if (!existUser) {
      res.status(400).send("usuário não existe");
      throw new Error("usuário não existe");
    }

    const userDataRead = fs.readFileSync(
      `./data/users/${email}.json`,
      (error, data) => {
        if (error) {
          res.status(400).send("erro");
          throw new Error("erro na leitura do arquivo");
        }

        return data;
      }
    );

    const userData = JSON.parse(userDataRead);

    const permitLogin =
      userData.email === email && userData.password === password;

    if (!permitLogin) {
      res.status(400).send("email ou senha inválido");
      throw new Error("email ou senha inválido");
    }

    res.status(200).send("usuário logado");
  } catch (e) {
    console.log("error -->", e);
    res.status(400).send("error");
  }
});

module.exports = router;
