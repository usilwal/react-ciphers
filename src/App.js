import React, { useState } from 'react';
import './App.css';
import './helpers';
import { run_cipher, value_randomizer } from './helpers';

function App() {
  const [cipher, setCipher] = useState('')
  const [message, setMessage] = useState('')
  const [key, setKey] = useState('')
  const [modifiedMessage, setModifiedMessage] = useState('')

  function get_cipher_type() {
    if(cipher !== '') {
      return cipher;
    }
    else {
      alert('Please select a cipher type!');
    }
  }

  function handleCipherClick(e) {
    setCipher(e.target.value);
  }

  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

  function handleModifiedMessageChange(e) {
    setModifiedMessage(e.target.value);
  }

  function handleKeyChange(e) {
    setKey(e.target.value);
  }
  
  function handleEncrypt(e) {
    setModifiedMessage(run_cipher('e', get_cipher_type(), message, key))
  }

  function handleDecrypt(e) {
    setModifiedMessage(run_cipher('d', get_cipher_type(), message, key))
  }

  function handleRandomize(e) {
    setKey(value_randomizer(cipher, message));
  }

  return (
    <div>
      <form>
        <p>Choose encryption method:</p>
        <div id="cipherType">
          <input type="radio" id="caesar" name="cipher" value="caesar" onClick={handleCipherClick}/>
          <label htmlFor="caesar">Caesar</label>
          <input type="radio" id="vigenere" name="cipher" value="vigenere" onClick={handleCipherClick}/>
          <label htmlFor="vignere">Vigenere</label>
          <input type="radio" id="monoalphabetic" name="cipher" value="monoalphabetic" onClick={handleCipherClick}/>
          <label htmlFor="monoalphabetic">Monoalphabetic</label>
        </div>
        <div id="cipherInputs">
          Your Message: <input type="text" id="yourMessage" size={80} value={message} onChange={handleMessageChange}/><br />
          Key: <input type="text" id="key" size={80} value={key} onChange={handleKeyChange}/><br />
        </div>
      </form>
      <div id="cipherButtons">
        <button id="encrypt" onClick={handleEncrypt}>Encrypt</button>
        <button id="randomize" onClick={handleRandomize}>Randomize Values</button>
        <button id="decrypt" onClick={handleDecrypt}>Decrypt</button><br />
      </div>
      Modified Message: <input type="text" id="modifiedMessage" size={80} value={modifiedMessage} onChange={handleModifiedMessageChange}/>
    </div>
  );
}

export default App;
