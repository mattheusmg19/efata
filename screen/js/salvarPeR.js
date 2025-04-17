document.addEventListener("DOMContentLoaded", () => {
    const salvarBtn = document.getElementById("salvar");
    const limparBtn = document.getElementById("limpar");
    const jogadorSelect = document.getElementById("players");
  
    salvarBtn.addEventListener("click", () => {
      const jogador = jogadorSelect.value;
      if (jogador === "0") {
        alert("Selecione um jogador!");
        return;
      }
  
      const perguntas = [];
  
      for (let i = 1; i <= 5; i++) {
        const pergunta = document.getElementById(`p${i}`).value.trim();
        const a1 = document.getElementById(`p${i}a1`).value.trim();
        const a2 = document.getElementById(`p${i}a2`).value.trim();
        const a3 = document.getElementById(`p${i}a3`).value.trim();
        const a4 = document.getElementById(`p${i}a4`).value.trim();
        const certa = document.getElementById(`certa${i}`).value;
  
        if (!pergunta || !a1 || !a2 || !a3 || !a4 || !certa) {
          alert(`Preencha todos os campos da pergunta ${i}!`);
          return;
        }
  
        perguntas.push({
          pergunta,
          alternativas: [a1, a2, a3, a4],
          correta: parseInt(certa) - 1 // índice começa em 0
        });
      }
  
      localStorage.setItem(`jogador_${jogador}`, JSON.stringify(perguntas));
  
      // limpar os campos
      for (let i = 1; i <= 5; i++) {
        document.getElementById(`p${i}`).value = "";
        document.getElementById(`p${i}a1`).value = "";
        document.getElementById(`p${i}a2`).value = "";
        document.getElementById(`p${i}a3`).value = "";
        document.getElementById(`p${i}a4`).value = "";
        document.getElementById(`certa${i}`).value = "1";
      }
  
      jogadorSelect.value = "0";
      alert("Perguntas salvas com sucesso!");
    });
  
    limparBtn.addEventListener("click", () => {
      const jogador = jogadorSelect.value;
      if (jogador === "0") {
        alert("Selecione um jogador para limpar as perguntas!");
        return;
      }
  
      // Limpar dados do jogador selecionado no localStorage
      localStorage.removeItem(`jogador_${jogador}`);
  
      // Limpar os campos de input
      for (let i = 1; i <= 5; i++) {
        document.getElementById(`p${i}`).value = "";
        document.getElementById(`p${i}a1`).value = "";
        document.getElementById(`p${i}a2`).value = "";
        document.getElementById(`p${i}a3`).value = "";
        document.getElementById(`p${i}a4`).value = "";
        document.getElementById(`certa${i}`).value = "1";
      }
      jogadorSelect.value = "0";
      alert("Perguntas apagadas do localStorage!");
    });
  });
  