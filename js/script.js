document.addEventListener('DOMContentLoaded', () => {
    
    const qst = document.querySelector('.question'),
          ans = document.querySelectorAll('.answer'),
          btnCnf = document.querySelector('.confirm'),
          qstList = document.querySelector('.quest-list'),
          btnNext = document.querySelector('.next');
          
    const qstPule = [{
        question: 'Скільки сезонів в році?',
        ansver:[1, 2, 3, 4],
        correctAnswer: 4,
        completed: false
    },{
        question: 'Хто найкрутіший?',
        ansver:['Автор сайта', 'Мама', 'В.Зеленській', 'Я'],
        correctAnswer: 'Мама',
        completed: false
    },{
        question: 'Коли?',  
        ansver:[1923, 988, 585, 4],
        correctAnswer: 988,
        completed: false
    }];

    let counter = 0,
        answerСheck,
        totalCorrectAnsver = 0,
        blackList =[];

    qstPule.forEach((qstBlock, i) => {
        const block = document.createElement('div');
        block.innerHTML = `
            <div class='quest-list-chailds' data-list='${i}'>${i + 1}. ${qstBlock.question}</div>
        `
        qstList.append(block);
    });

    chaildQstList = document.querySelectorAll('.quest-list-chailds');

    chaildQstList.forEach(block => {
        block.addEventListener('click', (e) => {
            qstPule.forEach((item, i) => {
                if(i == e.target.getAttribute('data-list')){
                    qst.textContent = item.question;
                    ans.forEach((ans, j) => {
                        ans.textContent = qstPule[i].ansver[j];
                        ans.classList.remove('activity')
                    });
                    
                    chaildQstList.forEach(btn => {
                        btn.classList.remove('activity')
                    });
                    block.classList.add('activity');
                };
            });
            counter = e.target.getAttribute('data-list');   
            console.log(counter);
            btnNext.classList.add('hide');
            btnCnf.classList.remove('hide')
            
        });
        chaildQstList[0].classList.add('activity');
    });



    function nextQuestion() {


        qst.textContent = qstPule[counter].question;
        
        const elem = (e) => {
            ans.forEach(btn => {
                btn.classList.remove('activity')
            });

            
            e.target.classList.add('activity');
            answerСheck = e.target.textContent;
        };

        
        const a = blackList.some(bl => {
            console.log(bl);
            return bl == counter
        });


                ans.forEach((item, i) => {
                    item.textContent = qstPule[counter].ansver[i];
        
        
                    item.classList.remove('activity');
                    
                    // console.log(blackList[i] == counter);
                    // console.log(blackList, counter);
                    
                    // blackList.forEach((bl) => {
                        // })
                        
                        if(a) {
                            item.addEventListener('click', elem);
                        } else {
                            item.addEventListener('click', elem);
                            item.removeEventListener('click', elem); 
                        }
                    });
            
        console.log(a);
    };

    nextQuestion();

    btnNext.addEventListener('click', () => {
        if(counter == qstPule.length - 1) {
            btnCnf.remove(); 
            btnNext.remove();
        } else {   
            btnNext.classList.add('hide');
            btnCnf.classList.remove('hide')
        }

        if(counter < qstPule.length - 1) {
            blackList.push(counter);
            counter++
            nextQuestion();
        } else {
            qst.textContent = '';

            ans.forEach(ans => {
                ans.classList.add('hide');
            });

            const result = document.querySelector('.total-correct-ansver'),
                  totalMistake = document.querySelector('.total-mistake');

            result.textContent = `Правильних відповідей: ${totalCorrectAnsver}/${qstPule.length}`;
            totalMistake.textContent = `Всього помилок: ${qstPule.length - totalCorrectAnsver}`;

            document.querySelector('.result-block').classList.remove('hide')

            qst.style.display = 'block';

            chaildQstList.forEach((btn, i) => {
                btn.classList.remove('activity')

                if (qstPule[i].completed) {
                    btn.style.backgroundColor = '#82dd86';
                }
            });
        };

        chaildQstList.forEach(()  =>{
            chaildQstList.forEach(btn => {
                btn.classList.remove('activity')
            });

            chaildQstList[counter].classList.add('activity');
        });
    });

    btnCnf.addEventListener('click', () => {
        if (answerСheck == qstPule[counter].correctAnswer && qstPule[counter].completed == false) {
            totalCorrectAnsver++;
            qstPule[counter].completed = true;
        };

        if(counter == qstPule.length - 1) {
            btnNext.textContent = 'Завершити';
            
         
        } else {
            btnNext.textContent = 'Далі';
        }
        
        btnCnf.classList.add('hide');
        btnNext.classList.remove('hide')
    });
});