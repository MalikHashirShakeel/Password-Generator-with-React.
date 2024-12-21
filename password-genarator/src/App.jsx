import { useState ,useCallback ,useEffect ,useRef } from 'react'
import './App.css'

function App() {
  const [length ,setLength] = useState(12);
  const [hasNum ,setHasNum] = useState(false);
  const [hasChar ,setHasChar] = useState(false);
  const [password ,setPassword] = useState("");
  let passwordRef = useRef(null);
  const [copyText, setCopyText] = useState("Copy");

  const handleCopy = () => {
    copyPassword();
    setCopyText("Copied");
    setTimeout(() => setCopyText("Copy"), 2000);
  };

  const copyPassword = () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }

  const generatePassword = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "1234567890";
    let special = "!@#$%^&*()_~{}[]";
  
    if (hasNum) str += numbers;
    if (hasChar) str += special;
  
    let password = "";
    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length);
      password += str[index];
    }
  
    setPassword(password);
  }, [length, hasNum, hasChar, setPassword]);


  useEffect(() => {
    generatePassword()
  } ,[length ,hasChar ,hasNum ,generatePassword])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Password Generator
        </h1>

        {/* Password Display */}
        <div className="relative">
          <input
            type="text"
            readOnly
            className="w-full p-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Your Password Will Appear Here"
            value={password}
            ref={passwordRef}
          />
          <button
            onClick={handleCopy}
            className="absolute right-2 top-2 text-purple-500 hover:text-purple-700 focus:outline-none"
          >
            {copyText}
          </button>
        </div>

        {/* Length Slider */}
        <div className="mt-4">
          <label className="block text-gray-600 font-medium mb-2">
            Password Length: <span className="font-bold">{length}</span>
          </label>
          <input
            onChange={(evt) => setLength(evt.target.value)}
            type="range"
            min="4"
            max="32"
            defaultValue="12"
            className="w-full"
            value={length}
          />
        </div>

        {/* Include Options */}
        <div className="mt-4">
          <label className="inline-flex items-center space-x-2">
            <input
              onChange={() => setHasNum(!hasNum)}
              type="checkbox"
              defaultChecked={hasNum}
              className="h-5 w-5 text-purple-500 focus:ring-purple-400"
            />
            <span className="text-gray-700">Include Numbers</span>
          </label>
        </div>
        <div className="mt-2">
          <label className="inline-flex items-center space-x-2">
            <input
              onChange={() => setHasChar(!hasChar)}
              type="checkbox"
              defaultChecked={hasChar}
              className="h-5 w-5 text-purple-500 focus:ring-purple-400"
            />
            <span className="text-gray-700">Include Special Characters</span>
          </label>
        </div>

        {/* Generate Button */}
        <div className="mt-6">
          <button
            onClick={generatePassword}
            className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
