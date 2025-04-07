const defaultQuestions = [
    {
      question: "HTML ka full form kya hai?",
      a: "Hyper Text Markup Language",
      b: "High Text Machine Language",
      c: "Hyperlinks and Text Markup Language",
      d: "Home Tool Markup Language",
      correct: "a"
    },
    {
      question: "Java me 'public static void main' ka kya role hai?",
      a: "Function end karta hai",
      b: "Object banata hai",
      c: "Program start point hai",
      d: "Library call karta hai",
      correct: "c"
    },
    // Add more questions as needed
  ];
  
  let quizData = JSON.parse(localStorage.getItem('quizData')) || defaultQuestions;
  localStorage.setItem('quizData', JSON.stringify(quizData));
  
  let currentQuestion = 0;
  let score = 0;
  let answers = Array(quizData.length).fill(null);
  let timeLeft = 60;
  
  function loadQuestion() {
    const q = quizData[currentQuestion];
    document.getElementById('question').innerText = q.question;
    document.getElementById('opt_a').innerText = q.a;
    document.getElementById('opt_b').innerText = q.b;
    document.getElementById('opt_c').innerText = q.c;
    document.getElementById('opt_d').innerText = q.d;
  
    const options = document.querySelectorAll('input[name="option"]');
    options.forEach(opt => opt.checked = false);
    if (answers[currentQuestion]) {
      document.querySelector(`input[value="${answers[currentQuestion]}"]`).checked = true;
    }
  }
  
  function saveAnswer() {
    const selected = document.querySelector('input[name="option"]:checked');
    if (selected) {
      answers[currentQuestion] = selected.value;
    }
  }
  
  function nextQuestion() {
    saveAnswer();
    if (currentQuestion < quizData.length - 1) {
      currentQuestion++;
      loadQuestion();
    }
  }
  
  function prevQuestion() {
    saveAnswer();
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion();
    }
  }
  
  function submitQuiz() {
    saveAnswer();
    score = 0;
    quizData.forEach((q, i) => {
      if (answers[i] === q.correct) score++;
    });
  
    const name = document.getElementById('name').value;
    const course = document.getElementById('course').value;
  
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Certificate of Completion", 20, 30);
    doc.text(`Name: ${name}`, 20, 50);
    doc.text(`Course: ${course}`, 20, 60);
    doc.text(`Score: ${score}/${quizData.length}`, 20, 70);
    doc.save("certificate.pdf");
  
    document.getElementById('result').innerText = `Aapka Score: ${score} / ${quizData.length}`;
    document.getElementById('downloadLink').style.display = 'inline-block';
  }
  
  function startQuiz() {
    document.getElementById('userForm').style.display = 'none';
    document.getElementById('quizBox').style.display = 'block';
    loadQuestion();
    startTimer();
  }
  
  function startTimer() {
    const timerEl = document.getElementById('time');
    const interval = setInterval(() => {
      timeLeft--;
      timerEl.innerText = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(interval);
        alert("Time's up! Quiz auto-submit ho gaya.");
        submitQuiz();
      }
    }, 1000);
  }
  