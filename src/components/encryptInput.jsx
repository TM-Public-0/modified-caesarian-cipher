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
        window.confirm('Are you sure you want to clear?') && setEncrypted('')
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
        <div className="input-fields">
                <label htmlFor="Encrypt Text">Enter text to encrypt</label>
                <input name="Encrypt Text" type="text" placeholder={"Enter text to encrypt"} onChange={handleChange} />
            {/* <div>
            </div> */}
                <label htmlFor="First Key">First Key</label>
                <input name="First Key" type="text" placeholder={"First key"} onChange={handleKeyA} />
            {/* <div>
            </div> */}
                <label htmlFor="Second Key">Second Key</label>
                <input name="Second Key" type="text" placeholder={"Second key"} onChange={handleKeyB} />
            {/* <div> > */}
            <div />
            <div style={{display: 'flex', flexDirection: "column", justifyContent: 'space-between'}}>
                <button disabled={encryptInput === '' ? true : false} onClick={handleOperation}>Encrypt!</button>
                <button disabled={encrypted.length === 0 ? true : false} onClick={handleClear}>Clear Output</button>
            </div>  
        </div>

        <div style={{  }}>
            <h3>Output</h3>
            <div style={{ display: 'flex', flexFlow: 'column wrap', gap:'0.5rem', maxHeight: '12vh' }}>
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