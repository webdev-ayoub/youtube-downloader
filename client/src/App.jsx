import { useEffect, useState } from 'react';
import YtLink from './components/ytLink';
import axios from 'axios';

function App() {
  const [welcome, setHello] = useState('');

  useEffect(() => {
    const getResp = async () => {
      const response = await axios.get("http://127.0.0.1:5000");
      setHello(response.data)
    }
    getResp();
  }, []);

  return (
    <>
      <div className='min-vh-100 d-flex justify-content-center'>
        <div className="w-100 mt-5">
          <h1 className='text-center mb-5'>{welcome}</h1>
          <YtLink />
        </div>
      </div>
    </>
  )
}

export default App;
