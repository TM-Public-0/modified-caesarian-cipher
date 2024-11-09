import { useEffect, useState } from "react";
import { caesarEncrypt } from '../utils/cipher.js';


export default function EncryptInput({keyA, keyB}) {
    const [encryptInput, setEncryptInput] = useState('');
    const [stateKeyA, setStateKeyA] = useState('');
    const [stateKeyB, setStateKeyB] = useState('');
    const [encrypted, setEncrypted] = useState('');

    function handleChange(e){
        setEncryptInput(e.target.value)
        // setInput(e.target.value)
    };
    
    function handleKeyA(e){
        setStateKeyA(e.target.value)
    };
    
    function handleKeyB(e){
        setStateKeyB(e.target.value)
    };

    function handleClear(){
        window.confirm('Are you sure you want to clear?') && setEncrypted('')
        // setEncrypted('')
    };

    function handleOperation(){
        setEncrypted([...encrypted, caesarEncrypt(encryptInput, stateKeyA, stateKeyB)])

    }

    useEffect(() => {
        console.log(encrypted)
    }, [encrypted])

  return (
    <div className="container-input-fields"> 
        <div className="input-fields">
                <label for="Encrypt Text">Enter text to encrypt</label>
                <input name="Encrypt Text" type="text" placeholder={"Enter text to encrypt"} onChange={handleChange} />
            {/* <div>
            </div> */}
                <label for="First Key">First Key</label>
                <input name="First Key" type="text" placeholder={"First key"} onChange={handleKeyA} />
            {/* <div>
            </div> */}
                <label for="Second Key">Second Key</label>
                <input name="Second Key" type="text" placeholder={"Second key"} onChange={handleKeyB} />
            {/* <div> > */}
            <div />
            <div style={{display: 'flex', flexDirection: "column", justifyContent: 'space-between'}}>
                <button disabled={encryptInput === '' ? true : false} onClick={handleOperation}>Encrypt!</button>
                <button disabled={encrypted.length === 0 ? true : false} onClick={handleClear}>Clear Output</button>
            </div>  
        </div>

        <div>
            <h3>Output</h3>
            <div>
            {
                encrypted.length > 0 && 
                encrypted.map((each, key) => (
                    <>
                        <code key={key + 1}>{key + 1}) {each}</code> 
                        <br/>
                        <br/>
                    </>
                ))
            
            }
            </div>
        </div>
    </div>
  );
}