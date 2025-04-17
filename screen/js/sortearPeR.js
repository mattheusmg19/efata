document.addEventListener("DOMContentLoaded", () => {
    const sortearBtn = document.getElementById("sortear"); // Ajustado para o ID correto
    const perguntasDiv = document.querySelector(".perguntas");
    const jogadorSelect = document.getElementById("players");
  
    let jogadores = [];
    let perguntasPorJogador = {};
    let perguntasRespondidas = [];
    let jogadoresRestantes = [];
  
    // Função para sortear
    sortearBtn.addEventListener("click", () => {
      const jogadorSelecionado = jogadorSelect.value;
  
      if (jogadorSelecionado === "0") {
        alert("Escolha um jogador antes de sortear!");
        return;
      }
  
      // Esconder perguntas e alternativas
      perguntasDiv.style.display = "none";
  
      // Resetar tudo antes de fazer o sorteio
      perguntasRespondidas = [];
      jogadoresRestantes = [];
  
      // Carregar jogadores e suas perguntas
      for (let i = 1; i <= 4; i++) {
        if (i !== parseInt(jogadorSelecionado)) {
          jogadores.push(i);
        }
      }
  
      // Organizar as perguntas de cada jogador
      for (let i = 1; i <= 4; i++) {
        const perguntas = JSON.parse(localStorage.getItem(`jogador_${i}`));
        if (perguntas) {
          perguntasPorJogador[i] = perguntas;
        }
      }
  
      // Remover perguntas já respondidas
      jogadoresRestantes = [...jogadores]; // Jogadores que ainda vão responder
      sortearPergunta();
    });
  
    // Função para sortear uma pergunta
    function sortearPergunta() {
      // Verificar se temos jogadores restantes
      if (jogadoresRestantes.length === 0) {
        alert("Todas as perguntas foram respondidas!");
        return;
      }
  
      // Sortear um jogador
      const jogadorIndex = Math.floor(Math.random() * jogadoresRestantes.length);
      const jogadorId = jogadoresRestantes.splice(jogadorIndex, 1)[0];
  
      // Obter as perguntas do jogador
      const perguntas = perguntasPorJogador[jogadorId];
  
      // Sortear uma pergunta que não foi respondida
      let perguntaIndex;
      do {
        perguntaIndex = Math.floor(Math.random() * perguntas.length);
      } while (perguntasRespondidas.includes(perguntaIndex));
  
      perguntasRespondidas.push(perguntaIndex);
      const pergunta = perguntas[perguntaIndex];
  
      // Exibir pergunta sorteada
      mostrarPergunta(pergunta, jogadorId);
    }
  
    // Função para mostrar a pergunta sorteada
    function mostrarPergunta(pergunta, jogadorId) {
      perguntasDiv.style.display = "block";
      
      // Limpar campos de perguntas anteriores
      for (let i = 1; i <= 5; i++) {
        const perguntaElement = document.querySelector(`#p${i}`);
        const alternativas = document.querySelectorAll(`#p${i}a1, #p${i}a2, #p${i}a3, #p${i}a4`);
        const correta = document.getElementById(`certa${i}`);
  
        if (perguntaElement && alternativas.length === 4) {
          if (perguntaIndex === i - 1) {
            perguntaElement.value = pergunta.pergunta;
            alternativas[0].value = pergunta.alternativas[0];
            alternativas[1].value = pergunta.alternativas[1];
            alternativas[2].value = pergunta.alternativas[2];
            alternativas[3].value = pergunta.alternativas[3];
            correta.value = pergunta.respostaCorreta;
            break;
          }
        }
      }
    }
  });
  