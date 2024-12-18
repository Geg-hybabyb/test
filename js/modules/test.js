function test() {
        
    const qst = document.querySelector('.question'),
          ans = document.querySelectorAll('.answer'),
          ansverBlock = document.querySelector('.answers'),
          btnCnf = document.querySelector('.confirm'),
          qstList = document.querySelector('.quest-list'),
          btnNext = document.querySelector('.next');

        const getResourse = async (url) => {
            const res = await fetch(url);

            return await res.json()
        };
    
    getResourse('http://localhost:3000/qstPule')
        .then(qstPule => {
            qstPule.forEach((qstBlock, i) => {
                    const block = document.createElement('div');
                    block.innerHTML = `
                        <div class='quest-list-chailds' data-list='${i}'>${i + 1}. ${qstBlock.question}</div>
                    `
                    qstList.append(block);
                });

                let counter = 0,
                answerСheck,
                totalCorrectAnsver = 0;
        
            chaildQstList = document.querySelectorAll('.quest-list-chailds');
        
            chaildQstList.forEach(block => {
                block.addEventListener('click', (e) => {
                    qstPule.forEach((item, i) => {
                        if(i == e.target.getAttribute('data-list')){
                            counter = e.target.getAttribute('data-list');   
        
                            nextQuestion()
                            if(qstPule[counter].completed === true) {
                                ansverBlock.removeEventListener('click', elem);
                            };
        
                            chaildQstList.forEach(btn => {
                                btn.classList.remove('activity')
                            });
                            block.classList.add('activity');
                        };
                    });
        
                    btnNext.classList.add('hide');
                    btnCnf.classList.remove('hide');
                });
                chaildQstList[0].classList.add('activity');
            });
        
            const elem = (e) => {
                if(e.target.getAttribute('data-choice')){
                    ans.forEach(btn => {
                        btn.classList.remove('activity')
                    });
        
                    e.target.classList.add('activity');
                    answerСheck = e.target.textContent;
                }
            };
            
            function nextQuestion() {
                qst.textContent = qstPule[counter].question;
                
                ansverBlock.addEventListener('click', elem);
        
                ans.forEach((item, i) => {
                    item.textContent = qstPule[counter].ansver[i];
        
                    item.classList.remove('activity');
                });
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
        
                    chaildQstList.forEach((btn, i) => {
                        btn.classList.remove('activity')
        
                        if (qstPule[i].correctAnswerId) {
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
                    qstPule[counter].correctAnswerId = true
                };
        
                if(!qstPule[counter].completed) {
                    qstPule[counter].completed = true;
                }
        
                if(counter == qstPule.length - 1) {
                    btnNext.textContent = 'Завершити';
                } else {
                    btnNext.textContent = 'Далі';
                }
                
                btnCnf.classList.add('hide');
                btnNext.classList.remove('hide')
            });
        });      
}

module.exports = test;