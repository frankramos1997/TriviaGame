$(document).ready(function(){
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    
    questions: {
      q1: "What is Naruto's last Name? ",
      q2: 'Who is the first Hokage?',
      q3: 'Who is Narutos best friend?',
      q4: 'What Village in Naruto from?',
      q5: "Which Tailed Beast is in Naruto?",
      q6: 'What is the first move Naruto learns?',
      q7: "What is Narutos favorite meal?"
    },
    options: {
      q1: ['Haruno', 'Uzumaki', 'Uchiha', 'Hatake'],
      q2: ['Hashirama Senju', 'Minato Namikaze', 'Hiruzen Sarutobi', 'Tobirama Senju'],
      q3: ['Gaara', 'Sakura', 'Rock Lee', 'Sauske'],
      q4: ['Rain', 'Leaf', 'Mist', 'Sand'],
      q5: ['Two Tails','Nine Tails','Five Tails','Six Tails'],
      q6: ['Chibaku Tensei','Rasen-Shuriken','Shadow Clone Jutsu','Rasengan'],
      q7: ['Ramen', 'Rice', 'Sushi','Tempera']
    },
    answers: {
      q1: 'Uzumaki',
      q2: 'Tobirama Senju',
      q3: 'Sauske',
      q4: 'Leaf',
      q5: 'Nine Tails',
      q6: 'Shadow Clone Jutsu',
      q7: 'Ramen'
    },
    
    
    startGame: function(){
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      $('#game').show();
      $('#results').html('');
      $('#timer').text(trivia.timer);
      $('#start').hide();
      $('#remaining-time').show();
      trivia.nextQuestion();
      
    },
    
    nextQuestion : function(){
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    
    timerRunning : function(){ 
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        $('#game').hide();
        $('#start').show();
      }
      
    },
    
    guessChecker : function() {
      var resultId;
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      
      else{
        $(this).addClass('btn-danger').removeClass('btn-info');
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
    
    guessResult : function(){
      trivia.currentSet++; 
      $('.option').remove();
      $('#results h3').remove();
      trivia.nextQuestion();
       
    }
  
  }