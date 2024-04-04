let participantes = [
    {
        nome: "Ricardo Teixeira",
        email: "ricardo@gmail.com",
        dataInscricao: new Date(2024, 2, 01, 19, 23),
        dataCheckIn: new Date(2024, 2, 01, 22, 20)
    },
    {
        nome: "Maria Silva",
        email: "maria@gmail.com",
        dataInscricao: new Date(2024, 1, 15, 10, 45),
        dataCheckIn: null
    },
    {
        nome: "João Oliveira",
        email: "joao@gmail.com",
        dataInscricao: new Date(2024, 3, 05, 14, 20),
        dataCheckIn: new Date(2024, 3, 07, 16, 15)
    },
    {
        nome: "Ana Souza",
        email: "ana@gmail.com",
        dataInscricao: new Date(2024, 4, 10, 18, 50),
        dataCheckIn: null
    },
    {
        nome: "Pedro Santos",
        email: "pedro@gmail.com",
        dataInscricao: new Date(2024, 5, 20, 11, 15),
        dataCheckIn: new Date(2024, 5, 22, 13, 40)
    },
    {
        nome: "Carla Lima",
        email: "carla@gmail.com",
        dataInscricao: new Date(2024, 6, 25, 9, 30),
        dataCheckIn: new Date(2024, 6, 27, 12, 20)
    },
    {
        nome: "Marcos Pereira",
        email: "marcos@gmail.com",
        dataInscricao: new Date(2024, 7, 12, 15, 10),
        dataCheckIn: null
    },
    {
        nome: "Fernanda Almeida",
        email: "fernanda@gmail.com",
        dataInscricao: new Date(2024, 8, 08, 20, 45),
        dataCheckIn: new Date(2024, 8, 10, 22, 30)
    },
    {
        nome: "Luiz Costa",
        email: "luiz@gmail.com",
        dataInscricao: new Date(2024, 9, 18, 13, 55),
        dataCheckIn: new Date(2024, 9, 20, 16, 10)
    },
    {
        nome: "Cristina Oliveira",
        email: "cristina@gmail.com",
        dataInscricao: new Date(2024, 10, 30, 8, 20),
        dataCheckIn: null
    }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)
  
  // condicional
  if(participante.dataCheckIn == null) {
     dataCheckIn =`
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        confirmar chack-in
      </button>
     `
  }
  
  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
      ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}
    <td>${dataCheckIn}
  </tr>
  `
}

const atualizarlista = (participantes) => {
  let output = ""
  // ertutura de repetição - loop
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  // substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarlista(participantes)


const adicionarParticipante = (event) => {
   event.preventDefault()

   const dadosDoFormulario = new FormData(event.target)

   const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
   }

   // verificar se o participante já xiste
   const participanteExiste = participantes.find(
    (p) => p.email == participante.email
   )

   if(participanteExiste) {
    alert('Email já cadastrado!')
    return
   }

  participantes = [participante, ...participantes]
  atualizarlista(participantes)

  // limpar o formulario 
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realment quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  //atualizar a lista do participante
  atualizarlista(participantes)
}