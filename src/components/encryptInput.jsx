import { useEffect, useState } from "react";
import { caesarEncrypt } from '../utils/cipher.js';
import AuroraBackgroundDefault from "./background.jsx";
import { TextGenerateEffect } from "./textGenerateEffect.jsx";


export default function EncryptInput() {
    const [encryptInput, setEncryptInput] = useState('');
    const [stateKeyA, setStateKeyA] = useState('');
    const [stateKeyB, setStateKeyB] = useState('');
    const [encrypted, setEncrypted] = useState('');
    const [showCode, setShowCode] = useState(true);

    function handleChange(e){
        setEncryptInput(e.target.value)
        // setInput(e.target.value)
    };

    function isNumericString(value) {
        return /^\d+(\.\d+)?$/.test(value.trim());
      }
    
    function handleKeyA(e){
        if (isNumericString(e.target.value)) {
            setStateKeyA(e.target.value)
        }
        else {
            document.getElementsByName('First Key')[0].value = '';
            return false;
        }
    };
    
    function handleKeyB(e){
        if (isNumericString(e.target.value)) {
            setStateKeyB(e.target.value)
        }
        else {
            document.getElementsByName('Second Key')[0].value = '';
            return false;
        }
    };

    function handleClear(){
        window.confirm('Are you sure you want to clear?') && setShowCode(false)
        setTimeout(() => {
            setEncrypted('')
            setShowCode(true)

        }, 2.5 * 1000);
        
        // setEncrypted('')
    };

    function handleOperation(){
        setEncrypted([...encrypted, caesarEncrypt(encryptInput, stateKeyA, stateKeyB)])

    }

    // useEffect(() => {
    //     console.log(encrypted)
    // }, [encrypted])

  return (
        <div className="container-input-fields"> 
            <div className="input-fields text-white text-base">
                    <label htmlFor="Encrypt Text">Enter text to encrypt</label>
                    <input className="text-black font-bold" name="Encrypt Text" type="text" placeholder={"Enter text to encrypt"} onChange={handleChange} />

                    <label htmlFor="First Key">First Key</label>
                    <input className="text-black font-bold" name="First Key" type="text" placeholder={"First key"} onChange={handleKeyA} />

                    <label htmlFor="Second Key">Second Key</label>
                    <input className="text-black font-bold" name="Second Key" type="text" placeholder={"Second key"} onChange={handleKeyB} />
                <div />
                <div style={{display: 'flex', flexDirection: "column", justifyContent: 'space-between'}}>
                    <button disabled={encryptInput === '' ? true : false} onClick={handleOperation}>Encrypt!</button>
                    <button disabled={encrypted.length === 0 ? true : false} onClick={handleClear}>Clear Output</button>
                </div>  
            </div>

            <div>
                <h3 className="text-white text-3xl font-bold">Output</h3>
                <div id="output-col">
                {
                    encrypted.length > 0 && 
                    encrypted.map((each, key) => (
                        <code style={{ opacity: showCode === true ? 1 : 0, transition: '700ms'}} key={key + 1}>
                            <TextGenerateEffect duration={0.4} filter={true} words={key + 1 + ')' + each} /> 
                        </code>
                    ))
                
                }
                </div>
            </div>
        </div>
  );
}