import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App(): JSX.Element {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [userInput, setUserInput] = React.useState<string>('');
  const [generatedText, setGeneratedText] = React.useState<string>(() => {
    return localStorage.getItem('generatedText') || '';
  });

  useEffect(() => {
    localStorage.setItem('generatedText', generatedText);
  }, [generatedText]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setGeneratedText('');
    setLoading(true);

    try {
      const response = await axios.get<{ text: string }>('http://127.0.0.1:5000/generate_text', {
        params: {
          question: userInput
        }
      });
      setLoading(false);
      setGeneratedText(response.data.text);

    } catch (error) {
      console.error('Error fetching generated text:', error);
    }
  };

  return (
    <div className="container">
      <h1>RAG Based Tax Information LLM</h1>
      <form onSubmit={handleSubmit}>
        <input
          className='user-input'
          type="text"
          placeholder="What is your tax related question?"
          value={userInput}
          onChange={handleChange}
        />
        <button className="submit-button" type="submit" disabled={loading}>Submit</button>
      </form>
      {generatedText ?
        <div className="output">
          <div className="pre-container">
            {generatedText ? <pre>{generatedText}</pre> : null}
          </div>
        </div> : loading ?
          <div className='load'>
            <div className="spinner">
            </div>
          </div> : null}
    </div>
  );
}

export default App;
