# apiDesafio
API de cadastro de usuários e dados profissionais desse usuário  
:gear: Tecnologias:  
- Node.JS 
- Express.JS
- Knex.JS
- JWT

### Inicia o serviço
```
npm run dev
```

## Rotas
### Get
#### /usuario/
```
[
    {
       "id": 23,
       "nome": "name1",
       "email": "name@teste.com"
       "nascimento": "01-01-1999"
       "telefone": "9999-7777",
       "cpf": "111111111",
       "genero": "F"
    },
    {
       "id": 24,
       "nome": "name2",
       "email": "name2@teste.com"
       "nascimento": "01-01-1999"
       "telefone": "9999-7777",
       "cpf": "111111111",
       "genero": "N"
    },
    {
       "id": 25,
       "nome": "name3",
       "email": "name3@teste.com"
       "nascimento": "01-01-1999"
       "telefone": "9999-7777",
       "cpf": "111111111",
       "genero": "M"
    },
]
```
#### /usuario/:id
```
[
    
    {
       "id": 25,
       "nome": "name3",
       "email": "name3@teste.com"
       "nascimento": "01-01-1999"
       "telefone": "9999-7777",
       "cpf": "111111111",
       "genero": "F"
    }
    
]
```
#### /dados/
```
[
    
    {
       "id": 25,
        "profissao": "profissaox",
        "numero_registro": "112233",
        "especialidade": "especialidadex",
        "localidade": "Cidade-ES",
        "area_atendimento": "179.50",
        "usuario_id": 2
    },

    {
       "id": 26,
        "profissao": "profissaox",
        "numero_registro": "112233",
        "especialidade": "especialidadex",
        "localidade": "Cidade-ES",
        "area_atendimento": "179.50",
        "usuario_id": 2
    },

]
```
### /dados/:id
```
[
 {
       "id": 25,
       "nome": "name3",
       "email": "name3@teste.com"
       "nascimento": "01-01-1999"
       "telefone": "9999-7777",
       "cpf": "111111111",
       "genero": "F"
    }
]
```
### Post
#### /usuario/store
```
O retorno é o usuário criado
[
    {
       "id": 25,
       "nome": "name3",
       "email": "name3@teste.com"
       "nascimento": "01-01-1999"
       "telefone": "9999-7777",
       "cpf": "111111111",
       "genero": "F"
    }
]
```
### /dados/store

```
O retorno são os dados criados
 {
       "id": 25,
       "nome": "name3",
       "email": "name3@teste.com"
       "nascimento": "01-01-1999"
       "telefone": "9999-7777",
       "cpf": "111111111",
       "genero": "F"
    }
```

### Put
#### /usuario/:id
```
O retorno é o usuário atualizado
[
    {
       "id": 25,
       "nome": "name3",
       "email": "name3@teste.com"
       "nascimento": "01-01-1999"
       "telefone": "9999-7777",
       "cpf": "111111111",
       "genero": "F"
    }
]
```
### /dados/:id

```
O retorno são os dados atualizados
 {
       "id": 25,
       "nome": "name3",
       "email": "name3@teste.com"
       "nascimento": "01-01-1999"
       "telefone": "9999-7777",
       "cpf": "111111111",
       "genero": "F"
    }
```
### Delete
#### /usuario/:id
```
"Usuário deletado com sucesso."
```
#### /dados/:id
```
"Dados deletados com sucesso."
```


