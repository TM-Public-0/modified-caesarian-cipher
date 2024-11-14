
export function caesarEncrypt(text, keyA, keyB) {
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];
    const grammarSymbols = ['?', '.', ',', ':', ';', '!', '-', '"', "'", '/'];

    function encryptChar(char, key, index) {
        const placeholder = [];
        
        if (alphabet.includes(char)) {
            const index = alphabet.indexOf(char.toLowerCase());
            // placeholder.push(alphabet[(index + key) % alphabet.length]);
            if (index % 3 === 0) {
                placeholder.push(uppercase[(index + key) % uppercase.length]);
                
            }
            else if (index % 2 === 0) {
                placeholder.push(numbers[(index + key) % numbers.length]);
            }
            else {
                placeholder.push(alphabet[(index + key) % uppercase.length]);
            }

        }
        else if (uppercase.includes(char)) {
            const index = uppercase.indexOf(char);
            if (index % 4 === 0) {
                placeholder.push(uppercase[(index + key) % uppercase.length]);
                
            }
            else {
                placeholder.push(alphabet[(index + key) % uppercase.length]);
            }
        }
        else if (numbers.includes(char)) {
            // const number = alphabet[Number(char)];
            const index = symbols.indexOf(char);
            if (Number(char) % 2 === 0) {
                placeholder.push(symbols[Number(char) - ((index + index) + 1)]);
                
            }
            else if (Number(char) % 3 === 0) {
                placeholder.push(uppercase[Number(char)]);

            }
            else {
                placeholder.push(Number(char) + Math.round(keyB/keyA));
            }
            // const index = Number(char) < 9 && 0 + Number(char);
            // placeholder.push(number)  //(alphabet[Number(char)]);
        }
        else if (symbols.includes(char)) {
            const index = symbols.indexOf(char);
            placeholder.push(numbers[index - ((index + index) + 1)]);

        }
        else if (char === ' ') {
            if (index % 2 === 0) {
                placeholder.push(symbols[(index + key) % symbols.length]);
            }
            else {
                placeholder.push(uppercase[(index + key) % symbols.length]);
            }
        }

        return placeholder;
    }

    return text.split('').map((char, index) => encryptChar(char, index % 2 === 0 ? keyA : keyB, index)) //.join('');
};


export default function caesarDecrypt(text, keyA, keyB) {
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];

    function decryptChar(char, key) {
        if (char.toLowerCase() in alphabet) {
            const index = alphabet.indexOf(char.toLowerCase());
            return alphabet[(index - key) % alphabet.length];
        }
        return char;
    }
    console.log(text.split('').map((char, index) => decryptChar(char, index % 2 === 0 ? keyA : keyB)).join(''));

    return text.split('').map((char, index) => decryptChar(char, index % 2 === 0 ? keyA : keyB)).join('');
};



// def decrypt(text, keyA, keyB):
//     alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ']

//     def decrypt_char(char, key):
//         if char.lower() in alphabet:
//             index = alphabet.index(char.lower())
//             return alphabet[(index - key) % len(alphabet)]
//         return char
    
//     decrypted_text = ''.join([decrypt_char(char, keyA if i % 2 == 1 else keyB) for i, char in enumerate(text)])
    
//     print(decrypted_text)
//     return decrypted_text
    
// decrypt(encrypted, 3, 5)




// // // // // // // // // // // // // //
 // // // //   use numbers for uppercase letters - index in alphabet but reversed and add key A to it.
 // // // // // // // // // // // // //   --> A is index 01. Reverse it to 10, add key A. U is index 21. Reverse it to 12, add key A.

// // // // // // // // // // // // // //  use symbols for numbers   // // // // // // // // // // // // //
//  1-0, 2-9, 3-8, 4-7, 5-6

 // // // // Use Key B for spaces