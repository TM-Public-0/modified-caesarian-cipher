import { useState } from "react";



// export default function Input({ keyA, keyB }) {
//     const [encryptInput, setEncryptInput] = useState('');
//     const [decryptInput, setDecryptInput] = useState('');
//     const [encrypted, setEncrypted] = useState('');
//     const [decrypted, setDecrypted] = useState('');

//     function handleChange(e){
//         if(e.target.dataset.type === 'encrypt'){
//             setEncryptInput(e.target.value)
//         }
//         else if(e.target.dataset.type === 'decrypt'){
//             setDecryptInput(e.target.value)
//         }
//         // setInput(e.target.value)
//     };

//     function handleClear(){
//         setInput('')
//     };

//     function handleOperation(){
//         if(purpose === 'encrypt'){
//             setEncrypted(caesarEncrypt(encryptInput, keyA, keyB))
//         }
//         else if(purpose === 'decrypt'){
//             setDecrypted(caesarDecrypt(decryptInput, keyA, keyB))
//         }
//     }

//   return (
//     <div>
//         <div className="input-fields">
//         <input data-type={purpose} type="text" placeholder={"Enter text to " + purpose} onChange={handleChange} />
//         <button onClick={handleClear}>Clear</button>
//         <button onClick={handleOperation}>{purpose.toUpperCase()}</button>
//         </div>

//         <div>
//             <h3>Output</h3>
//             <p>{}</p>
//         </div>
//     </div>
//   );
// }