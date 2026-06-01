import { createContext, useContext, useEffect, useId, useState } from "react";
import { caesarEncrypt, caesarDecrypt } from '../utils/cipher.js';
import { TextGenerateEffect } from "./textGenerateEffect.jsx";
// import { input } from "framer-motion/client";
import { Input } from "../shad-components/ui/input.jsx";
import { HoverEffect } from "./CardHover.jsx";
import FileUploadPreview, { EncryptedFileInput } from "./FilePreview.jsx";
import React from "react";
import { FileIcon } from "lucide-react";
// import { useFileUpload, formatBytes } from "../shad-components/hooks/use-file-upload.ts";
import {
    Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../shad-components/ui/select.jsx";

// import {
//     initialFiles,
//     formatBytes,
//     FileIcon,
//     Button,
//     UploadIcon,
// } from "../shad-components/ui/button.jsx";

export default function EncryptDecrypt() {
  return (
    <div className="flex" style={{  overflowX: 'hidden', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5rem' }}>
        <Encrypt />
        <hr className="border-gray-200 border-1 w-full" />
        <Decrypt />
    </div>
  );
};

function Encrypt (){
    const [encryptInput, setEncryptInput] = useState('');
    const [stateKeyA, setStateKeyA] = useState('');
    const [stateKeyB, setStateKeyB] = useState('');
    const [encrypted, setEncrypted] = useState('');
    const [showCode, setShowCode] = useState(true);
    // const [showTextArea, setShowTextArea] = useState(false);

    const [inputOption, setInputOption] = useState('text');
    // const [encryptedOutputFormat, setEncryptedOutputFormat] = useState(undefined);
    const [files, setFiles] = useState(undefined);
    const [encryptedOutputLink, setEncryptedOutputLink] = useState(undefined);
    const [fileDataToEncrypt, setFileDataToEncrypt] = useState('');

    function handleChange(e){
        setEncryptInput(e.target.value);
    };

    // useEffect(() => {
    //     console.log('encryptInput', encryptInput);
    // }, [encryptInput]);
    
    function isNumericString(value) {
        console.log(/[^0-9]/g.test(value.trim()) ? false : true)
        // 
        return /[^0-9]/g.test(value.trim()) ? false : true
        // return /^\d+(\.\d+)?$/.test(value.trim());
    };
    
    // useEffect(() => {
    //     console.log('stateKeyA', stateKeyA);
    //     console.log('stateKeyB', stateKeyB);

    // }, [stateKeyA, stateKeyB]);

    function handleKeyA(e){
        if (isNumericString(e.target.value) === false || e.target.value === 0 || e.target.value === '0') {
            e.preventDefault();
            document.getElementById("encrypt-key-a").value = document.getElementById("encrypt-key-a").value.replace(/[^1-9]/g, '');
            // input.value = input.value.replace(/[^0-9]/g, '')
            return false;
            
        }
        else if (e.target.value === '') {
            setStateKeyA('');
            document.getElementById("encrypt-key-a").value = '';
            
        }
        else if (isNumericString(e.target.value)) {
            setStateKeyA(e.target.value);

        }
    };
    
    function handleKeyB(e){
        if (isNumericString(e.target.value) === false || e.target.value === 0 || e.target.value === '0') {
            e.preventDefault();
            // document.getElementById("encrypt-key-b").value = '';
            document.getElementById("encrypt-key-b").value = document.getElementById("encrypt-key-b").value.replace(/[^1-9]/g, '');

            return false;
            
        }
        else if (e.target.value === '') {
            setStateKeyB('');
            document.getElementById("encrypt-key-b").value = '';
            
        }
        else if (isNumericString(e.target.value)) {
            setStateKeyB(e.target.value);

        }
    };

    function handleClear(){
        window.confirm('Are you sure you want to clear?') && setShowCode(false)
        setTimeout(() => {
            setEncrypted('');
            // setEncryptedMaster([]);
            setShowCode(true);

        }, 1.5 * 1000);
        
        // setEncrypted('')
    };

    // function handleChangeInputOption() {
    //     setShowTextArea(prev => !prev)
    // }

    function handleOperation(){
        const pattern = /[^0-9]/;
        if (pattern.test(Number(stateKeyA)) || pattern.test(Number(stateKeyB))) {
            alert('Please only enter numbers as private keys.'); 
            return false;
            
        }
        if (inputOption !== 'text') {
            // processEncryptedOutput();
            encryptFileData();
            
        }
        else {
            console.log('encryptInput', encryptInput);
            const encryptedResponse = caesarEncrypt(encryptInput, stateKeyA, stateKeyB);
            let text = '';
            encryptedResponse.flat(2).forEach(each => text += each);
            setEncrypted([...encrypted, text]);

        }


    };

    function handleChangeInputOption(e) {
        console.log('handleChangeInputOption', e.target.value);
        setInputOption(e.target.value);
        setEncryptedOutputLink(undefined);
        setFiles(undefined);
        setFileDataToEncrypt('');
        setEncryptInput('');
    };

    // function handleChangeEncryptedOutputFormat(e) {
    //     setEncryptedOutputFormat(e.target.value);
    // };

    async function handleFileChange(e) {
        const files = Array.from(e.target.files || []);
        console.log(files, files[0].type);
        if (files[0].type.includes('image')) { // or   !files[0].type.includes('text)
            e.target.value = null;
            alert('Please only upload supported file types');
            return false;
        }
        else {
            setFiles(files);
            setFileDataToEncrypt(await files[0].text());
            // const fileData = await files[0].text();        
            // console.log("fileData", fileData);


            // const encryptedFileData = caesarEncrypt(fileDataToEncrypt, stateKeyA, stateKeyB);
            // let text = '';
            // encryptedFileData.flat(2).forEach(each => text += each);
            // setEncryptInput(text);

        }
    };

    useEffect(() => {
        console.log('fileDataToEncrypt', fileDataToEncrypt)
    }, [fileDataToEncrypt]);

    async function encryptFileData() {
        console.log('encryptFileData() executing...');
        const encryptedFileData = await caesarEncrypt(fileDataToEncrypt, stateKeyA, stateKeyB);
        let text = '';
        encryptedFileData.flat(2).forEach(each => text += each);
        setEncryptInput(text);
    };

    async function processEncryptedOutput() {
        try {
            console.log('inputOption', inputOption);

            if (inputOption !== 'text') {

                const format = files[0].type.includes('pdf') ? 'application/pdf' : files[0].type.includes('docx') ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : files[0].type.includes('txt') ? 'text/plain' : files[0].type.includes('json') ? 'application/json' : 'text/plain';
                
                if (format === "text/plain") {
                    console.log('encryptInput', encryptInput);
                    const blob = new Blob([encryptInput], { type: format });
                    const url = URL.createObjectURL(blob);
            
                    console.log('url', url);
                    setEncryptedOutputLink({url: url, fileName: `encrypted.${files[0].name}`, encryptedInput: encryptInput, size: files[0].size, type: files[0].type});
                    
                }
            }
            
        } catch (error) {
            console.error('Error processing encrypted output:', error);
            setEncryptedOutputLink({errors: 'Error processing encrypted output'});
        }
        
    };

    useEffect(() => {
        if (fileDataToEncrypt !== '' && files[0] !== undefined) {
            processEncryptedOutput();
        }

    }, [encryptInput]);

    const id = useId();

    return (
        <div className="container-input-fields"> 
            <div className="flex flex-row" style={{ gap: '5rem', justifyContent: 'space-between' }}>
                <h2 className="text-white text-3xl font-bold"  style={{color:"#dbdbdb"}}>Encrypt Data</h2>
                <div className="input-fields text-white text-base">
                    <label htmlFor="input-type" className="text-white font-bold text-lg rounded ps-2">Input Data Format</label>
                    <select className="text-white opacity-80 rounded ps-2 border-input data-[placeholder]:text-muted-foreground
                     [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 
                     aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive 
                     dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border 
                     bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none 
                     focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 
                     *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center 
                     *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
                    " style={{ maxWidth:'10rem', backgroundColor: "transparent" }} name="input-type" onChange={handleChangeInputOption}>
                        <option className="text-black" value="text">Plain Text</option>
                        <option className="text-black" value="file">File</option>                    
                    </select>

                    {inputOption === 'text' ?
                        <>
                            <label htmlFor="Encrypt Text">Enter Text To Encrypt</label>
                            {/* <textarea className="text-black font-bold opacity-60 rounded ps-2" wrap="hard" placeholder={"Enter text to encrypt"} onChange={handleChange} /> */}
                            <Input type="text" placeholder="Enter Text To Encrypt" height="10rem" onChange={handleChange} />
                        </>
                        // {showTextArea === true ? 
                        
                        // : 
                        //     <input className="text-black font-bold opacity-60 rounded ps-2" name="Encrypt Text" type="text" placeholder={"Enter text to encrypt"} onChange={handleChange} />
                        
                        // }
                    :
                        <>
                            <p style={{color:"#dbdbdb", maxWidth:"15rem", textWrap:"wrap"}}>Supported formats: pdf, doc, docx, txt, json</p>  

                            {/* <input type="file" id="encrypt-file-input" name="input-file"
                                accept=".doc,.docx, .json, .pdf, .txt, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={handleFileChange}
                                className="text-black font-bold opacity-60 rounded ps-2"
                                disabled={stateKeyA === '' || stateKeyB === '' ? true : false}
                            /> */}

                            <EncryptedFileInput handleFileChange={handleFileChange} inputStates={{stateKeyA, stateKeyB}} files={files} />
                        </>
                    
                    }



                    <label htmlFor="Private Key A">Private Key A</label>
                    {/* <input className="text-black font-bold opacity-60 rounded ps-2" name="Private Key A" type="number"  pattern="[0-9]{3}" placeholder={"First key"} onChange={handleKeyA} />  */}
                    {/* <div /> */}
                    <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                        <Input id="encrypt-key-a" placeholder="Private Key A" type="text"  pattern="[0-9]+" onChange={handleKeyA} style={{ width: '10rem', textAlign: 'center' }} />
                        <p
                            className="text-muted-foreground mt-2 text-xs"
                            role="region"
                            aria-live="polite"
                            style={{color:"#dbdbdb"}}
                        >
                            Provide a number greater than 0. This will be used to encrypt the text. 
                        </p>

                    </div>

                    <label htmlFor="Private Key B">Private Key B</label>
                    {/* <input className="text-black font-bold opacity-60 rounded ps-2" name="Private Key B" type="number" pattern="[0-9]{3}" placeholder={"Second key"} onChange={handleKeyB} /> */}
                    
                    <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                        <Input id="encrypt-key-b" placeholder="Private Key B" type="text"  pattern="[0-9]+" onChange={handleKeyB} style={{ width: '10rem', textAlign: 'center' }} />
                    </div>
                
                <div />
                <div id="container-buttons">
                    {
                        inputOption === 'text' ?
                        <>
                            <button disabled={encryptInput === '' || stateKeyA === '' || stateKeyB === '' ? true : false} onClick={handleOperation} className="me-1 dark:text-white/60" >Encrypt</button>
                            <button disabled={encrypted.length === 0 ? true : false} onClick={handleClear} >Clear Output</button>
                        </>
                        :
                        <button disabled={stateKeyA === '' || stateKeyB === '' || files === undefined ? true : false} onClick={handleOperation} >Encrypt</button>
                    }
                    {/* {
                        inputOption === 'text' ?
                        :
                        ''
                    } */}
                </div>  
                </div>

            </div>

        <div>
            <h3 className="text-white text-3xl font-bold">Encrypted Output</h3>
            <div className="flex flex-row" style={{ gap: '2rem', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* <label htmlFor="Output Format" className="text-white font-bold text-lg rounded ps-2">Output format</label> */}
                {/* <select className="text-black font-bold opacity-60 rounded ps-2" name="Output Format" onChange={handleChangeEncryptedOutputFormat}
                    defaultValue={inputOption === 'text' ? 'plain-text' : 'pdf'}
                >
                    {inputOption !== 'text' ? '' : <option value="plain-text">Plain Text</option>}
                    <option value="pdf">.PDF</option>
                    <option value="docx">.DOCX</option>
                    <option value="txt">.TXT</option>
                    {inputOption !== 'text' && files && files[0].type.includes('json') ? <option value="json">.JSON</option> : ''}
                </select> */}

            </div>
            <div id="output-col">
                {
                    inputOption === 'text' ?
                    <ol style={{ color:'white', listStyle:"upper-roman" }}>
                        {
                            encrypted && encrypted.length > 0 && encrypted.map((each, key) => (
                                <li key={key}>
                                    <code style={{ opacity: showCode === true ? 1 : 0, transition: '700ms'}} key={key}>
                                        <TextGenerateEffect duration={0.5} filter={true} words={each} /> 
                                    </code>
                                </li>
                            ))

                        }

                    </ol>
                    : encryptedOutputLink ?
                    //  {
                        encryptedOutputLink.url === undefined 
                        ? 
                        // <EncryptedFileLink url={encryptedOutputLink.url} fileName={encryptedOutputLink.fileName} />
                        '' 
                        :
                        <div className="flex flex-row" style={{ gap: '2rem', alignItems: 'center', justifyContent: 'space-between' }}>
                            {/* <p style={{ color: 'white', fontSize: '1.5rem' }}>Encrypted File</p> */}
                            {/* <HoverEffect items={[
                                { title: encryptedOutputLink.fileName, description: encryptedOutputLink.encryptedInput, link: encryptedOutputLink.url },
                            ]} /> */}
                            <FileUploadPreview fileMetadata={encryptedOutputLink} setEncryptedOutputLink={setEncryptedOutputLink} setFileDataToEncrypt={setFileDataToEncrypt} setFiles={setFiles} />

                            {/* <a href={encryptedOutputLink.url} download={encryptedOutputLink.fileName} style={{ color: 'white', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">Download Encrypted File</a> */}
                            {/* <p style={{ color: 'white', fontSize: '1rem' }}>{encryptedOutputLink.fileName}</p> */}
                            {/* <button onClick={() => setEncryptedOutputLink(undefined)} style={{ backgroundColor: 'red', color: 'white', padding: '0.5rem 1rem', borderRadius: '5px' }}>Clear Link</button> */}
                        </div>
                    //  }
                    :
                    ''
                }
            </div>
        </div>
            
        </div>
    )
};



function Decrypt (){

    const [decryptInput, setDecryptInput] = useState('');
    const [stateKeyA, setStateKeyA] = useState('');
    const [stateKeyB, setStateKeyB] = useState('');
    const [decrypted, setDecrypted] = useState('');
    const [showCode, setShowCode] = useState(true);
    const [showTextArea, setShowTextArea] = useState(false);

    // const { encryptedMaster, setEncryptedMaster } = useContext(EncryptedContext);

    function handleChange(e){
        // console.log(e.target.value);
        setDecryptInput(e.target.value)
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
            setDecrypted('')
            setShowCode(true)

        }, 2.5 * 1000);
        
    };

    function handleChangeInputOption() {
        setShowTextArea(prev => !prev)
    }

    function handleOperation(){
        const decryptedResponse = caesarDecrypt(decryptInput, stateKeyA, stateKeyB);
        // console.log(decryptedResponse.flat(2));
        let text = '';
        decryptedResponse.flat(2).forEach(each => text += each);
        // console.log('text', text);
        setDecrypted([...decrypted, text]);

    }

    return (
        <div className="container-input-fields"> 
            <div className="input-fields text-white text-base">
            <select className="text-black font-bold opacity-60 rounded ps-2" name="Output Format" >
                    <option value="plain-text">Plain Text</option>
                    <option value="pdf">.PDF</option>
                    <option value="docx">.DOCX</option>
                    <option value="txt">.TXT</option>
                    <option value="json">.JSON</option>
                </select>
                    <label htmlFor="Encrypt Text">Enter text to decrypt</label>
                    {showTextArea === true ? 
                        <textarea className="text-black font-bold opacity-60 rounded ps-2" placeholder={"Enter text to decrypt"} onChange={handleChange} />
                    
                    : 
                        <input className="text-black font-bold opacity-60 rounded ps-2" name="Decrypt Text" type="text" placeholder={"Enter text to encrypt"} onChange={handleChange} />
                    
                    }

                    <label htmlFor="First Key">First Key</label>
                    <input className="text-black font-bold opacity-60 rounded ps-2" name="First Key" type="number" placeholder={"First key"} onChange={handleKeyA} /> 

                    <label htmlFor="Second Key">Second Key</label>
                    <input className="text-black font-bold opacity-60 rounded ps-2" name="Second Key" type="text" placeholder={"Second key"} onChange={handleKeyB} />
                <div />
                <div id="container-buttons" style={{}}>
                    <button disabled={decryptInput === '' ? true : false} onClick={handleOperation}>Decrypt</button>
                    <button disabled={decrypted.length === 0 ? true : false} onClick={handleClear}>Clear Output</button>
                    <button onClick={handleChangeInputOption}>Write {showTextArea === false ? 'Longer' : 'Shorter'} Text</button>
                </div>  
            </div>

            <div>
                <h3 className="text-white text-3xl font-bold">Decrypted Output</h3>
                <div id="output-col">
                    <ol style={{ color:'white', listStyle:"upper-roman" }}>
                        {
                            decrypted.length > 0 && 
                            decrypted.map((each, key) => (
                                <li key={key}>
                                    <code style={{ opacity: showCode === true ? 1 : 0, transition: '700ms'}} key={key + 1}>
                                        <TextGenerateEffect duration={0.8} filter={true} words={each} /> 
                                    </code>
                                </li>

                            ))
                        
                        }

                    </ol>
                </div>
            </div>
            
        </div>
    )
};