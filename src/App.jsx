import './App.css';
import AuroraBackgroundDefault, {AuroraBackground} from './components/background';
import EncryptDecrypt from './components/EncryptDecrypt.jsx';
import Nav from './components/Nav.jsx';
// import Input from './components/inputFields';
import caesarImg1 from './assets/caesar-img-1.jpg';

function App() {
  return (
    <AuroraBackgroundDefault>
      <Nav />
      <header className="font-bold text-center text-white mb-8 flex justify-evenly items-center">
        <div>
          <h1 className='text-4xl' style={{ fontFamily: 'Georgia'}}>
            {/* <code>Modified Caesarian Cipher</code> */}
            <code>ULTRA Caesar Cipher (UNDER DEVELOPMENT)</code>

          </h1>
          <h2 className='text-2xl'>
            {/* <code>Encrypt and decrypt your information</code> */}
            <code>Securely encrypt and decrypt your documents with a modern twist</code>

          </h2>
        </div>
        <img src={caesarImg1} alt='caesar-img-1' style={{ width: '275px', borderRadius: '10px',  }} /> 
        {/* border: "2px solid #ffffffa3" */}
      </header>

      <EncryptDecrypt />

    </AuroraBackgroundDefault>

  );
}

export default App;
