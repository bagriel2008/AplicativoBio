const questions = [
  { q: "Qual órgão é mais afetado pelo consumo crônico de álcool?", o: ["Pulmão", "Fígado", "Rins", "Coração"], a: 1, exp: "O álcool afeta principalmente o fígado, podendo causar cirrose e insuficiência hepática." },
  { q: "O THC da maconha pode causar?", o: ["Aumento da frequência cardíaca", "Cirrose", "Catarata", "Úlcera"], a: 0, exp: "O THC pode aumentar a frequência cardíaca e alterar a percepção." },
  { q: "Qual neurotransmissor está ligado à dependência?", o: ["GABA", "Dopamina", "Histamina", "Serotonina"], a: 1, exp: "A dopamina está ligada à sensação de prazer e reforço do uso da droga." },
  { q: "Qual órgão é gravemente afetado pelo uso prolongado de cocaína?", o: ["Coração", "Estômago", "Pele", "Baço"], a: 0, exp: "A cocaína pode causar arritmias e infarto devido ao dano no coração." },
  { q: "O consumo de crack pode levar a?", o: ["Perda de apetite", "Melhora da memória", "Fortalecimento muscular", "Visão mais apurada"], a: 0, exp: "O crack reduz o apetite e causa danos severos ao organismo." },
  { q: "O que caracteriza a dependência química?", o: ["Desejo intenso e contínuo de usar a substância", "Aumento da resistência física", "Capacidade de parar facilmente", "Imunidade ao efeito"], a: 0, exp: "A dependência química envolve compulsão pelo uso, mesmo com consequências negativas." },
  { q: "Quais são efeitos comuns do álcool a curto prazo?", o: [ "Melhora da concentração", "Visão noturna","Sonolência, fala arrastada e falta de coordenação", "Aumento da força"], a: 2, exp: "O álcool deprime o sistema nervoso central, causando sonolência e perda de coordenação." },
  { q: "Qual o papel da dopamina na dependência?", o: [ "Aumentar a pressão arterial", "Melhorar o sistema imunológico", "Regular a digestão","Produzir sensação de prazer e reforço do uso"], a: 3, exp: "A dopamina reforça o comportamento de busca pela droga." },
  { q: "O cigarro pode causar câncer principalmente em qual órgão?", o: [ "Fígado", "Estômago","Pulmão", "Rins"], a: 2, exp: "O tabagismo é a principal causa de câncer de pulmão." },
  { q: "Quais órgãos podem ser prejudicados pelo uso de ecstasy?", o: [ "Pele e ossos", "Orelhas e nariz","Fígado e rins", "Baço e vesícula"], a: 2, exp: "O ecstasy pode causar falência hepática e renal." },
  { q: "O uso de inalantes pode causar danos a qual sistema?", o: ["Nervoso", "Digestivo", "Muscular", "Esquelético"], a: 0, exp: "Inalantes destroem células nervosas e podem levar à morte." },
  { q: "A abstinência é caracterizada por?", o: [ "Melhora da saúde", "Aumento da resistência física", "Cura imediata","Sintomas físicos e psicológicos após parar o uso"], a: 3, exp: "Na abstinência surgem sintomas como ansiedade, tremores e sudorese." },
  { q: "Fatores que aumentam o risco de dependência incluem?", o: [ "Boa alimentação","Problemas emocionais e pressão social", "Exercício físico", "Sono regular"], a: 1, exp: "Ambiente, emoções e pressão social influenciam no risco de vício." },
  { q: "O LSD afeta principalmente qual parte do corpo?", o: [ "Pulmões","Cérebro", "Coração", "Estômago"], a: 1, exp: "O LSD altera a atividade cerebral, causando alucinações." },
  { q: "A heroína é classificada como?", o: ["Depressor do sistema nervoso", "Estimulante", "Anabolizante", "Vitaminas"], a: 0, exp: "A heroína deprime o sistema nervoso, causando relaxamento extremo." }
];

let current = 0, score = 0;

function initQuiz(){
  const container = document.querySelector('.container') || document.body;

  function ensureEl(id){
    let el = document.getElementById(id);
    if(!el){
      el = document.createElement('div');
      el.id = id;
      container.appendChild(el);
    }
    return el;
  }

  const quiz = document.getElementById('quiz') || ensureEl('quiz');
  const feedback = document.getElementById('feedback') || ensureEl('feedback');
  const result = document.getElementById('result') || ensureEl('result');

  function loadQuestion() {
    feedback.style.color = '';
    feedback.textContent = '';
    quiz.innerHTML = `<div class='question'>${questions[current].q}</div>`;
    questions[current].o.forEach((opt, i) => {
      const btn = document.createElement('div');
      btn.className = 'option';
      btn.textContent = opt;
      btn.addEventListener('click', ()=>selectOption(i));
      quiz.appendChild(btn);
    });
  }

  function selectOption(i) {
    const correctIndex = questions[current].a;
    if (i === correctIndex) {
      score++;
      feedback.innerHTML = `✅ Resposta correta! <br>${questions[current].exp}`;
      feedback.style.color = 'green';
    } else {
      feedback.innerHTML = `❌ Resposta errada!<br>Resposta certa: <b>${questions[current].o[correctIndex]}</b><br>${questions[current].exp}`;
      feedback.style.color = 'red';
    }

    // Remover botão anterior caso exista
    const oldBtn = document.getElementById('nextBtn');
    if(oldBtn) oldBtn.remove();

    // Criar botão próxima pergunta
    const nextBtn = document.createElement('button');
    nextBtn.id = 'nextBtn';
    nextBtn.textContent = 'Próxima Pergunta';
    nextBtn.onclick = nextQuestion;
    feedback.appendChild(document.createElement('br'));
    feedback.appendChild(nextBtn);

    // Desabilitar opções após selecionar
    const options = quiz.querySelectorAll('.option');
    options.forEach(opt => opt.style.pointerEvents = 'none');
  }

  function nextQuestion(){
    current++;
    const nextBtn = document.getElementById('nextBtn');
    if(nextBtn) nextBtn.remove();
    if(current < questions.length){
      loadQuestion();
    } else {
      endQuiz();
    }
  }

  function endQuiz(){
    quiz.innerHTML = '';
    feedback.textContent = '';
    let img = score >= Math.ceil(questions.length * 0.7)
      ? './assets/67bfd9e2.jpg'
      : './assets/dce58ad4f36db404f5c9bc34ff0d104f.jpg';
    result.innerHTML = `<p>Você acertou ${score} de ${questions.length} perguntas.</p><img src='${img}' alt='resultado'>`;
  }

  loadQuestion();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initQuiz);
} else {
  initQuiz();
}
