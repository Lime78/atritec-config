import { useState } from 'react'
import loggavit from '../assets/loggavit.png'
import loggagreen from '../assets/loggagreen.png' 
import pattern from '../assets/pattern.png' 
import dashboard from '../assets/dashboard.png'
import './Landing.css'

function Landing() {
  const [count] = useState()

  const [inputs, setInputs] = useState(['']);

  const addInput = () => {
    setInputs([...inputs, '']);
  };

  const removeInput = () => {
    setInputs(inputs.slice(0, inputs.length - 1));
  };

  return (
    <>
      <img src={loggagreen} alt="Logo" className="logo" />
      {/* <img src={pattern} alt="Pattern" className="pattern" /> */}

      <div className='template-container'>
        <div className="Annotation">
          <h1 onClick={ToggleEvent}>Annotation</h1>         
        </div>
        <div className='Cirrus'>
          <h1 onClick={ToggleEvent}>Cirrus</h1>
        </div>
        <div className='Web360'>
          <h1 onClick={ToggleEvent}>Web360</h1>
        </div>
      </div>
      <div className='bottom-container'> 
        <div className='box'>
          {/* <div className='Bdl-split'>
        {inputs.map((input, index) => (
        <input key={index} type="text" placeholder="Bdl Spår Tid" />
      ))}
      <div className="button-group">
      <button className="button-add" onClick={addInput}>+</button>
      <button className="button-remove" onClick={removeInput}>-</button>
      </div>
      </div> */}
        </div>
      </div>
      
      
      <div className='sidebar-session'>
        <h1>Session</h1>
        {/* <img src={dashboard} alt="Dashboard" className="dashboard" /> */}
      </div>
    </>
  )
}

export default Landing
