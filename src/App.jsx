import './App.css';
import AuroraBackgroundDefault, {AuroraBackground} from './components/background';
import EncryptInput from './components/encryptInput';
// import Input from './components/inputFields';

function App() {
  return (
    <AuroraBackgroundDefault>
      <header className=" font-bold text-white">
        <h1 className='text-3xl' style={{ fontFamily: 'Georgia'}}><code>Modified Caesarian Cipher</code></h1>
        <h2 className='text-2xl'>
          <code>Encrypt and decrypt your information</code>
        </h2>
      </header>

      <div style={{ minHeight: '100vh', overflowX: 'hidden'}}>
        <EncryptInput />


      </div>

    </AuroraBackgroundDefault>

  );
}

export default App;
