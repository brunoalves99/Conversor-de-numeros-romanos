import { result, inputText, btn, header } from "./elements.js";

btn.addEventListener("click", () => {
    let value = inputText.value;
    let isANumber = !isNaN(value) && (value >= 1 && value <= 3999);
    let inRoman = "";

    if(isANumber) {
        let totalValue = Number(value);
        let m = firstDigit(totalValue / 1000);

        if(m > 0) {
            for(let i = 1; i <= m; i++) {
                inRoman += "M";
                totalValue -= 1000;
            }
        }

        let d = firstDigit(totalValue / 500);

        if(d >= 1) {
            if(totalValue <= 899) {
                inRoman += "D";
                totalValue -= 500;
            } else {
                inRoman += "CM";
                totalValue -= 900;
            }
        }

        let c = firstDigit(totalValue / 100);

        if(c > 0) {
            if(c <= 3) {
                for(let i = 1; i <= c; i++) {
                    inRoman += "C";
                    totalValue -= 100;
                }
            } else {
                inRoman += "CD";
                totalValue -= 400;
            }
        }
        
        let l = firstDigit(totalValue / 50);

        if(l >= 1) {
            if(totalValue <= 89) {
                inRoman += "L";
                totalValue -= 50;
            } else {
                inRoman += "XC";
                totalValue -= 90;
            }
        }

        
        let x = firstDigit(totalValue / 10);

        if(x > 0) {
            if(x <= 3) {
                for(let i = 1; i <= x; i++) {
                    inRoman += "X";
                    totalValue -= 10;
                }
            } else {
                inRoman += "XL";
                totalValue -= 40;
            }
        }
        
        let v = firstDigit(totalValue / 5);

        if(v >= 1) {
            if(totalValue <= 8) {
                inRoman += "V";
                totalValue -= 5;
            } else {
                inRoman += "IX";
                totalValue -= 9;
            }
        }

        let i = totalValue;

        if(i > 0) {
            if(i <= 3) {
                for(let j = 1; j <= i; j++) {
                    inRoman += "I";
                    totalValue -= 1;
                }
            } else {
                inRoman += "IV";
                totalValue -= 4;
            }
        }

        result.textContent = inRoman;
    } else {

        let romanValue = Array.from(value.toUpperCase());
        let inDecimal = 0;

        const values = {
            "M": 1000,
            "D": 500,
            "C": 100,
            "L": 50,
            "X": 10,
            "V": 5,
            "I": 1
        }

        

        const romanLetters = ["M", "D", "C", "L", "X", "V", "I"];
        const romanFirstLetter = ["C","C","X","X","I","I"];
        const romanSecondLetter = ["M","D","C","L","X","V"];

        function verify(value) {
            let isValid = false;
            let totalChar = value.length;
            let valids = 0;
            
            value.forEach((char) => {
                for(let i = 0; i < 7; i++) {
                    if(char === romanLetters[i]) {
                        valids++;
                        continue;
                    }
                }
            });
        
            if(valids === totalChar) {
                isValid = true;
            }
           
            return isValid;
        }

        if(!verify(romanValue)) {
            header.classList.remove("hide");
            return;
        }
        
        for(let i = 0; i < romanValue.length; i++) {

            for(let j = 0; j < 7; j++) {

                for(let y = 0; y < 6; y++) {
                    if(romanValue[i] == romanFirstLetter[y] && romanValue[i + 1] == romanSecondLetter[y]) {
                        inDecimal += addToDecimal(String(romanFirstLetter[y] + romanSecondLetter[y]));
                        i = i + 2;
                    }
                }

                if(romanValue[i] === romanLetters[j]) {
                    inDecimal += values[romanLetters[j]];
                }
                
            }
        }

        if(value.length > 0) {
            result.textContent = inDecimal;
        } else {
            header.classList.remove("hide");
        }
    }
});

function firstDigit(num) {
    const matchs = String(num).match(/\d/);
    return Number(matchs[0]);
}

function addToDecimal(value) {

    let letters = {
        "CM": 900,
        "CD": 400,
        "XC": 90,
        "XL": 40,
        "IX": 9,
        "IV": 4
    }

    return letters[value];
}

inputText.onfocus = () => header.classList.add("hide");

