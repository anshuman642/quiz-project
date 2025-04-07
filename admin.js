function login() {
    const user = document.getElementById('adminUser').value;
    const pass = document.getElementById('adminPass').value;
    if (user === 'admin' && pass === '1234') {
      document.getElementById('adminPanel').style.display = 'block';
    } else {
      alert('Invalid credentials');
    }
  }
  
  function addQuestion() {
    const question = document.getElementById('question').value;
    const a = document.getElementById('opt_a').value;
    const b = document.getElementById('opt_b').value;
    const c = document.getElementById('opt_c').value;
    const d = document.getElementById('opt_d').value;
    const correct = document.getElementById('correct').value;
  
    const quizData = JSON.parse(localStorage.getItem('quizData')) || [];
    quizData.push({ question, a, b, c, d, correct });
    localStorage.setItem('quizData', JSON.stringify(quizData));
    alert('Question Added!');
    loadQuestions();
  }
  
  function loadQuestions() {
    const quizData = JSON.parse(localStorage.getItem('quizData')) || [];
    const list = document.getElementById('questionList');
    list.innerHTML = '';
    quizData.forEach((q, i) => {
      const li = document.createElement('li');
      li.innerText = (i+1) + '. ' + q.question;
      list.appendChild(li);
    });
  }
  
  window.onload = loadQuestions;
  