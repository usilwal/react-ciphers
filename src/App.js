import React, { useState } from 'react';
import { FaLock, FaLockOpen } from "react-icons/fa";
import './App.css';
import './helpers';
import { run_cipher, value_randomizer, keyGuide } from './helpers';

function App() {
  const [cipher, setCipher] = useState('NONE')
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
  
  function handleEncrypt() {
    setModifiedMessage(run_cipher('e', get_cipher_type(), message, key))
  }

  function handleDecrypt() {
    setModifiedMessage(run_cipher('d', get_cipher_type(), message, key))
  }

  function handleRandomize() {
    setKey(value_randomizer(cipher, message));
  }

  return (
    <div class="min-h-screen flex m-auto bg-background bg-cover">
      <div className="m-auto align-middle flex flex-col bg-gray-300 w-6/12">
        <form className="">
          <p class="bg-gray-800 font-bold text-white py-8 text-center text-3xl">ENCRYPTION METHOD: <span className="text-blue-300">{cipher.toUpperCase()}</span></p>
          <div id="cipherType" class="bg-wire flex justify-center items-center">
            <input type="radio" id="caesar" name="cipher" value="caesar" className="hidden" onClick={handleCipherClick}/>
            <label htmlFor="caesar" className="bg-black hover:bg-gray-800 text-white px-4 py-2">Caesar</label>
            <input type="radio" id="monoalphabetic" name="cipher" value="monoalphabetic" className="hidden" onClick={handleCipherClick}/>
            <label htmlFor="monoalphabetic" className="bg-black hover:bg-gray-800 text-white px-4 py-2 ">Monoalphabetic</label>
            <input type="radio" id="vigenere" name="cipher" value="vigenere" className="hidden" onClick={handleCipherClick}/>
            <label htmlFor="vigenere" className="bg-black hover:bg-gray-800 text-white px-4 py-2">Vigenere</label>

          </div>
          <div id="cipherInputs">
            <p class="flex justify-center py-2 mt-4 font-bold">Your Message</p>
            <textarea id="yourMessage" rows={4} value={message} className="block m-auto p-2 w-10/12 text-center" onChange={handleMessageChange}/>
            <p class="flex justify-center py-2 mt-4 font-bold">Key</p>
            <p class="flex justify-center">{keyGuide(cipher)}</p>
            <input type="text" id="key" value={key} className="block m-auto w-10/12 text-center" onChange={handleKeyChange}/>
          </div>
        </form>
        <div id="cipherButtons" class="flex justify-center items-center mt-4">
          <button id="encrypt" onClick={handleEncrypt} class="flex bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mx-1"><FaLock class="my-1 mr-1"/>Encrypt</button>
          <button id="randomize" onClick={handleRandomize} class="flex text-white py-2 px-4 rounded mx-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500">Randomize</button>
          <button id="decrypt" onClick={handleDecrypt} class="flex bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mx-1"><FaLockOpen class="my-1 mr-1"/>Decrypt</button><br />
        </div>
        <p class="bg-wire text-white flex justify-center py-2 mt-4">Result</p>
        <textarea id="modifiedMessage" rows={4} value={modifiedMessage} className="block p-2 text-center" onChange={handleModifiedMessageChange}/>
      </div>
    </div>
  );
}

export default App;
