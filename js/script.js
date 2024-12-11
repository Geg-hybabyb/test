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
        question: 'В якому році?',  
        ansver:[1923, 988, 585, 4],
        correctAnswer: 988,
        completed: false
    }];

    let counter = 0,
    answerСheck,
    totalCorrectAnsver = 0;

    qstPule.forEach((qstBlock, i) => {
        const block = document.createElement('div');
        block.innerHTML = `
            <div class='quest-list-chaild' data-list='${i}'>${i + 1}. ${qstBlock.question}</div>
        `
        qstList.append(block);
    });

    chaildQstList = document.querySelectorAll('.quest-list-chaild');

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
            btnNext.classList.add('hide');
            btnCnf.classList.remove('hide')
        });
        chaildQstList[0].classList.add('activity');
    });

    function nextQuestion() {
        qst.textContent = qstPule[counter].question;
        
        ans.forEach((item, i) => {
            item.textContent = qstPule[counter].ansver[i];
            
            item.addEventListener('click', () => {
                ans.forEach(btn => {
                    btn.classList.remove('activity')
                });
                
                item.classList.add('activity');
                answerСheck = item.textContent;
            });
            item.classList.remove('activity');
        });
    };

    nextQuestion();

    btnNext.addEventListener('click', () => {

        if(counter < qstPule.length - 1) {
            counter++
            nextQuestion();
        } else {
            qst.textContent = '';

            ans.forEach(ans => {
                ans.classList.add('hide');
            });

            const result = document.createElement('div'),
                  totalMistake = document.createElement('div');

            result.textContent = `Правильних відповідей: ${totalCorrectAnsver}/${qstPule.length}`;
            totalMistake.textContent = `Всього помилок: ${qstPule.length - totalCorrectAnsver}`;

            result.classList.add('results')
            totalMistake.classList.add('results')

            qst.append(result);
            qst.append(totalMistake);

            qst.style.display = 'block';
        };

        if(counter == qstPule.length - 1) {
            btnNext.textContent = 'Завершити';
            
            chaildQstList.forEach(btn => {
                btn.classList.remove('activity')
            });
        } 

        chaildQstList.forEach(()  =>{
            chaildQstList.forEach(btn => {
                btn.classList.remove('activity')
            });

            chaildQstList[counter].classList.add('activity');
        });

        btnNext.classList.add('hide');
        btnCnf.classList.remove('hide')
    });

    btnCnf.addEventListener('click', () => {
        if (answerСheck == qstPule[counter].correctAnswer && qstPule[counter].completed == false) {
            totalCorrectAnsver++;
            console.log(qstPule[counter].completed);
            qstPule[counter].completed = true;
        };
        console.log(totalCorrectAnsver);
        btnCnf.classList.add('hide');
        btnNext.classList.remove('hide')
    });
});