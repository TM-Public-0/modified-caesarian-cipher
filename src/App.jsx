import './App.css';
import EncryptInput from './components/encryptInput';
// import Input from './components/inputFields';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Caesarian Cipher</h1>
      </header>
      <h2>
        <code>Encrypt and decrypt your information</code>
      </h2>

      <div style={{ height: '100vh'}}>
        <EncryptInput />
      </div>

    </div>
  );
}

export default App;
