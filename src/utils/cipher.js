
export function caesarEncrypt(text, keyA, keyB) {
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '?', '.', ',', ':', ';', '-', '"', `'`, '/', '|', '`', '~', '<', '>'];
    const space = ' ';
    // const specialCyrillic = ['Ж', 'Ц', 'Ч', 'И', 'Ќ', 'Я', 'Ю', 'Г', 'Э', 'Д']; // if char is specialCyr, then index of cyr + uppercase length will equal alphaindex + keyA + keyB. Sum of cyr + uppercase length minus keyA + keyB will equal the index of the char in the alphabet.
    const specialCyrillic = ['Ж', 'Ц', 'Ч', 'И', 'Ќ', 'Я', 'Ю', 'Г', 'Э', 'Д', 'Ё', 'Є', 'Ї', 'І', 'Ґ', 'ё', 'є', 'і', 'ґ', 'Б', 'З', 'Й', 'к', 'П', 'ф', 'щ' ]; // if char is specialCyr, then index of cyr + uppercase length will equal alphaindex + keyA + keyB. Sum of cyr + uppercase length minus keyA + keyB will equal the index of the char in the alphabet.
    // need to include at least 26 cyrillic characters for encryption
    const specialGreek = ['Δ', 'Θ', 'Λ', 'Ξ', 'Π', 'Σ', 'Φ', 'Ψ', 'Ω', 'λ', 'γ', 'δ', 'ε', 'ζ', 'η', 'κ', 'μ', 'ξ', 'π', 'σ', 'υ', 'ψ', 'ω']; // if char is specialGreek, then index of greek + uppercase length will equal alphaindex + keyA + keyB. Sum of greek + uppercase length minus keyA + keyB will equal the index of the char in the alphabet.

    function encryptChar(char, key, index) {
        const placeholder = [];
        keyA = Number(keyA);
        keyB = Number(keyB);

        if (alphabet.includes(char)) {
            const alphaIndex = alphabet.indexOf(char.toLowerCase()); 
            const formula = Number(alphaIndex) + keyA + keyB > 26 ? (Number(alphaIndex) + keyA + keyB) % 26 : Number(alphaIndex) + keyA + keyB;

            const difference = formula - uppercase.length;
            placeholder.push(difference === 0 ? '_' : uppercase[formula]);  // r

        }
        else if (uppercase.includes(char)) {
            const upperIndex = uppercase.indexOf(char); 
            const alphaIndex = alphabet.indexOf(char.toLowerCase()); 

            // const formula = Number(upperIndex) + keyA + keyB;
            const formula = Number(upperIndex) + keyA + keyB > 26 ? (Number(upperIndex) + keyA + keyB) % 26 : Number(upperIndex) + keyA + keyB;

            const difference = formula - alphabet.length;
            console.log('difference', difference, 'formula', formula);
            if (formula > uppercase.length) {
                placeholder.push(specialGreek[difference]);
            } 
            else {
                placeholder.push(difference === 0 ? '`' : alphabet[formula]); // R
            }

        }
        else if (numbers.includes(char)) {
            // const numIndex = numbers.indexOf(char);
            console.log('number', char)
            // placeholder.push(JSON.stringify(Number(char) + Math.round((keyB * keyA)/keyA)));
            const formula = Number(char) + keyB > 26 ? (Number(char) + keyB) % 26 : Number(char) + keyB;
            placeholder.push(specialCyrillic[formula]);

        }

        else if (symbols.includes(char)) {
            const symIndex = symbols.indexOf(char);
            // console.log('logging char because this is a symbol', char);
            const formula = Number(symIndex) + keyB > 23 ? (Number(symIndex) + (keyB % 23)) % 23 : Number(symIndex) + keyB;
            console.log(formula, specialGreek[formula]);
            placeholder.push(specialGreek[formula]);

            // const formula = Number(symIndex) + keyA + keyB;
            // if (formula > symbols.length) {
            //     const difference = formula - symbols.length;
            //     console.log('difference', difference, 'formula', formula, 'symIndex', symIndex, symbols[difference]);
            //     placeholder.push(symbols[difference]);                 
            // } 
            // else {
            //     placeholder.push(symbols[formula]);

            // }

        }
        else if (char === space) {
            placeholder.push('~');
        }

        return placeholder//.map(char => char.char).join('');
    }
    // ЁЄЇІҐёєіґБЗЙкПфщ
    const formattedText = text.match(/[0-9a-zA-Z~ЖЦЧИЌЯЮГЭДЁЄЇІҐёєіґБЗЙкПфщΔΘΛΞΠΣΦΨΩλγδεζηκμξπσυψω !@#$%^&*()<>?=\.,:;'"\/\-\]\`]+|\d+/g)?.map(item => 
        /^\d+$/.test(item) ? Number(item) : item
    )
    .map(each => each.split('')).flat()//.toSpliced(0, 1);  JSON.stringify(each)

    console.log('formattedText', formattedText);
    
    return formattedText.map((char, index) => encryptChar(char, index % 2 === 0 ? keyA : keyB, index))
};


export function caesarDecrypt(encryptedText, keyA, keyB) {
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    // const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '?', '.', ',', '，', ':', ';', '!', '-', '"', `'`, '/'];
    // const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '?', '.', '，', ':', ';', '!', '-', '"', `'`, '/'];
    const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '?', '.', ',', ':', ';', '-', '"', `'`, '/', '|', '`', '~', '<', '>'];

    const specialCyrillic = ['Ж', 'Ц', 'Ч', 'И', 'Ќ', 'Я', 'Ю', 'Г', 'Э', 'Д', 'Ё', 'Є', 'Ї', 'І', 'Ґ', 'ё', 'є', 'і', 'ґ', 'Б', 'З', 'Й', 'к', 'П', 'ф', 'щ' ]; // if char is specialCyr, then index of cyr + uppercase length will equal alphaindex + keyA + keyB. Sum of cyr + uppercase length minus keyA + keyB will equal the index of the char in the alphabet.
    const specialGreek = ['Δ', 'Θ', 'Λ', 'Ξ', 'Π', 'Σ', 'Φ', 'Ψ', 'Ω', 'λ', 'γ', 'δ', 'ε', 'ζ', 'η', 'κ', 'μ', 'ξ', 'π', 'σ', 'υ', 'ψ', 'ω']; // if char is specialGreek, then index of greek + uppercase length will equal alphaindex + keyA + keyB. Sum of greek + uppercase length minus keyA + keyB will equal the index of the char in the alphabet.

    function decryptChar(char, key, index) {
        // console.log('char', char);
        let result;
        const placeholder = [];
        
        if (alphabet.includes(char)) {
            const alphaIndex = alphabet.indexOf(char.toLowerCase());
            // const formula = Number(alphaIndex) - keyA - keyB;
            const formula = Number(alphaIndex) - keyA - keyB < 0 ? Math.abs((Number(alphaIndex) - keyA - keyB) % 26) : Number(alphaIndex) - keyA - keyB;

            const difference = formula < 0 ? formula : formula - uppercase.length;
            console.log('difference', difference, 'formula', formula);
            if (formula > uppercase.length) {
                placeholder.push(uppercase[alphaIndex]); 
            } 
            else {               
                const operation = Math.sign(Number(alphaIndex) - keyA - keyB) === 1 ? (Number(alphaIndex) - keyA - keyB) :  (alphabet.length - formula);
                placeholder.push(operation === 26 ? uppercase[0] : uppercase[operation]);      
            }


        } 
        else if (char === '~') {
            placeholder.push(' ');

        }
        else if (uppercase.includes(char)) {
            const alphaIndex = alphabet.indexOf(char.toLowerCase());
            const upperIndex = uppercase.indexOf(char);
            // const operation = Math.sign(Number(upperIndex) - keyA - keyB) === 1 ? (Number(upperIndex) - keyA - keyB) :  uppercase.length + (Number(upperIndex) - keyA - keyB) ;
            // console.log('operation', operation)

            // const formula = Number(upperIndex) - keyA - keyB;

            // const difference = formula - uppercase.length;
            const formula = Number(alphaIndex) - keyA - keyB < 0 ? Math.abs((Number(alphaIndex) - keyA - keyB) % 26) : Number(alphaIndex) - keyA - keyB;
            const difference = formula < 0 ? formula : formula - uppercase.length;

            // console.log('difference', difference, 'formula', formula);
            console.log('formula', formula);

            if (formula > alphabet.length) {
                placeholder.push(alphabet[alphaIndex]); 
            } 
            else {
                const operation = Math.sign(Number(alphaIndex) - keyA - keyB) === 1 ? (Number(alphaIndex) - keyA - keyB) :  (alphabet.length - formula);
                console.log('operation', operation);
                placeholder.push(operation === 26 ? alphabet[0] : alphabet[operation]);
            }
            
        } 
        else if (specialCyrillic.includes(char)) {
            // if char is specialCyr, then index of cyr + uppercase length will equal alphaindex + keyA + keyB. Sum of cyr + uppercase length minus keyA + keyB will equal the index of the char in the alphabet.
            const cyrIndex = specialCyrillic.indexOf(char);
            const formula = Number(cyrIndex) - keyB < 0 ? Math.abs((Number(cyrIndex) - keyB) % 26) : Number(cyrIndex) - keyB;
            console.log('cyr formula', formula);

            const operation = Math.sign(cyrIndex - keyB) === 1 ? (formula - keyB) : (specialCyrillic.length - formula);
            placeholder.push(operation === 26 ? alphabet[0] : numbers[operation]);
            // placeholder.push(cyrIndex);

        }
        else if (specialGreek.includes(char)) {
            // if char is specialGreek, then index of greek + uppercase length will equal alphaindex + keyA + keyB. Sum of greek + uppercase length minus keyA + keyB will equal the index of the char in the alphabet.
            const greekIndex = specialGreek.indexOf(char);
            const formula = Math.abs(Number(greekIndex) - keyB) > 23 ? Math.abs((Number(greekIndex) - (keyB % 23))) % 23 : Number(greekIndex) - keyB;
            console.log(formula, symbols[formula]);
            // const uppercaseIndex = (Number(greekIndex) + uppercase.length) - keyA - keyB;
            placeholder.push(symbols[formula]);

            // const formula = Number(symIndex) + keyB > 23 ? (Number(symIndex) + (keyB % 23)) % 23 : Number(symIndex) + keyB;
            // console.log(formula, specialGreek[formula]);
            // placeholder.push(specialGreek[formula]);
        }
        else if (char === '`'){
            const upperIndex = uppercase.length - keyA - keyB
            placeholder.push(uppercase[upperIndex]);
        }
        else if (char === '_'){
            const alphaIndex = uppercase.length - keyA - keyB
            placeholder.push(alphabet[alphaIndex]);
        }
        else if (numbers.includes(char)) {
            placeholder.push(JSON.stringify(Number(char) - Math.round((keyB / keyA)*keyA)));

        }
        else if (symbols.includes(char)) {
            // const symIndex = symbols.indexOf(char);
            // console.log('symbol', char)
            // const alphaIndex = alphabet.indexOf(char.toLowerCase()); 
            // const formula = Number(alphaIndex) + keyA + keyB;
            // const difference = formula - uppercase.length;

            // if (symIndex === difference) {
            //     placeholder.push(alphabet[Number(alphaIndex) - keyA - keyB]);
            // } 
            // else {
            //     const operation = Math.sign(Number(symIndex) - keyA - keyB) === 1 ? (Number(symIndex) - keyA - keyB) :  symbols.length + (Number(symIndex) - keyA - keyB) ;
            //     placeholder.push(operation === 20 ? symbols[0] : symbols[operation]);
            //     // console.log(char, operation, 'symbols', symbols[operation]);

            // }

            const symIndex = symbols.indexOf(char);
            const formula = Number(symIndex) - keyA - keyB;
            console.log('decrypting symbol.. formula', formula);

            if (formula > symbols.length) {
                const difference = formula - symbols.length;
                console.log('symIndex', symIndex, symbols[difference]);
                placeholder.push(symbols[difference]);
            } 
            else {
                placeholder.push(symbols[formula]);

            }
        } 
         else {
            result = char; // If char doesn't match any known category, return as is.
        }

        return placeholder;

    }

    const formattedText = encryptedText.match(/[0-9a-zA-Z~ЖЦЧИЌЯЮГЭДЁЄЇІҐёєіґБЗЙкПфщΔΘΛΞΠΣΦΨΩλγδεζηκμξπσυψω !@#$%^&*()<>?_=\.,:;'"\/\-\]\`]+|\d+/g)?.map(item => 
        /^\d+$/.test(item) ? Number(item) : item
    )
    .map(each => each.split('')).flat();  //  JSON.stringify(each)
    // .map(each => typeof each === 'string' ? each.split('') : each).flat();
    
    return formattedText.map((char, index) => decryptChar(char, index % 2 === 0 ? keyA : keyB, index))
} 



//  Concept of public key --> randomly selected number from 1-9 that multiplies the key A and key B times itself. Output will always be randomized
//  even if the input is always the same. Give the user the public key to be used for decryption.