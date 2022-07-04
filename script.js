const fileInput = document.querySelector('input');
const resultField = document.querySelector('.main-body-result')


fileInput.addEventListener('change', function(e) {
    var file = fileInput.files[0];
    var textType = /text.*/;

    if (file.type.match(textType)) {
        var reader = new FileReader();
        let result = '';

        reader.onload = function() {
            result = reader.result;
            resultArr = result.split(/\r?\n/).filter(element => element);
            resultArr.forEach(element => {
                element = element.split(' ');
                const letter = element[0];
                const min = element[1][0];
                const max = element[1][element[1].length -2];
                const findString = element[2];

                const re = new RegExp(letter, 'g');

                const count = findString.match(re).length;

                if (count >= min && count <= max) {
                    const textResult = document.createElement('span');
                    resultField.append(textResult);
                    textResult.classList.add('success');
                    textResult.innerHTML = `Шукана літера ${letter}, в діапазоні від ${min} до ${max}, для паролю ${findString} зустрічається ${count} раз(-и, -ів)`
                } else {
                    const textResult = document.createElement('span');
                    resultField.append(textResult);
                    textResult.classList.add('fail');
                    textResult.innerHTML = `Шукана літера ${letter}, в діапазоні від ${min} до ${max}, для паролю ${findString} зустрічається ${count} раз(-и, -ів)`
                }
            });
        }

        reader.readAsText(file);	
    } else {
        resultField.innerText = "File not supported!"
    }
})
