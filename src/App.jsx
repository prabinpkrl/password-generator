import { useState, useEffect, useCallback } from 'react';
import './App.css';
import PasswordStrengthIndicator from './components/passwordindicator';

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState('');
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolAllowed, setSymbolAllowed] = useState(false);

  const generatePassword = useCallback(() => {
    let pass = '';
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let number = '0123456789';
    let symbol = '!~@#%^&*/';

    if (numberAllowed) {
      string += number;
    }
    if (symbolAllowed) {
      string += symbol;
    }

    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * string.length);
      pass += string.charAt(randomNumber);
    }
    setPassword(pass);
  }, [length, numberAllowed, symbolAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, symbolAllowed, generatePassword]);

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password);
    window.alert('Password copied to clipboard');
  };

  return (
    <div className='wholebox'>
      <div className='passwordBox'>
        <label>Password:
          <input type='text'
            name='password'
            value={password}
            
          />
        </label>
        <button onClick={copyPassword}>Copy</button>
      </div>
      <div>
        <PasswordStrengthIndicator password={password}/>
      </div>
      <div className='controls'>
        <label>Password Length:{length}</label>
        <input type='range'
        id='password-length'
          name='lengthrange'
          min={6}
          max={25}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
        <p id='charactertext'>Character Used:</p>
        <div className='checkboxes'>
          <label>
            <input type='checkbox'
            className='checkbox'
              name='numberallowed'
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            Numbers
          </label>
          <label>
            <input type='checkbox'
            className='checkbox'
              name='symbolallowed'
              checked={symbolAllowed}
              onChange={() => setSymbolAllowed((prev) => !prev)}
            />
            Symbols
          </label>
        </div>
        <div className='generateBtn'>
          <button 
          onClick={generatePassword}
          >Generate password</button>
        </div>
      </div>
    </div>
  );
}

export default App;
