import { useState } from 'react';
import loggavit from '../assets/loggavit.png';
import loggagreen from '../assets/loggagreen.png';
import pattern from '../assets/pattern.png';
import dashboard from '../assets/dashboard.png';
import menu from '../assets/menu.png';
import loggaover from '../assets/loggaover.png';
import './Landing.css';
import { saveAs } from 'file-saver';

function Landing() {

  const [isVisible, setIsVisible] = useState(false);
  const [isSynlig, setIsSynlig] = useState(false);
  const [isVissa, setIsVissa] = useState(false);

  const [annotationInfo, setAnnotationInfo] = useState('');
  const [cirrusInfo, setCirrusInfo] = useState('');
  const [webInfo, setWebInfo] = useState('');

  const [annotationInputs, setAnnotationInputs] = useState([
    { value: '', placeholder: 'Track (401)' },
    { value: '', placeholder: 'Place_from' },
    { value: '', placeholder: 'Place_to' },
    { value: '', placeholder: 'Time_ranges_from:' },
    { value: '', placeholder: 'Time_ranges_to:' }

  ]);
  const [cirrusInputs, setCirrusInputs] = useState([
    { value: '', placeholder: 'Track (401)' },
    { value: '', placeholder: 'Place_from' },
    { value: '', placeholder: 'Place_to' },
    { value: '', placeholder: 'Time_ranges_from:' },
    { value: '', placeholder: 'Time_ranges_to:' }

  ]);
  const [webInputs, setWebInputs] = useState([
    { value: '', placeholder: 'Track (401)' },
    { value: '', placeholder: 'Place_from' },
    { value: '', placeholder: 'Place_to' },
    { value: '', placeholder: 'Time_ranges_from:' },
    { value: '', placeholder: 'Time_ranges_to:' }

  ]);

  const toggleSectionsVisibility = () => {
    setIsVisible(!isVisible);
    if (!isVisible) {
      setAnnotationInfo('Annotation Form');
    } else {
      setAnnotationInfo('');
    }
  };

  const toggleSectionsSynlig = () => {
    setIsSynlig(!isSynlig);
    if (!isSynlig) {
      setCirrusInfo('Cirrus Form');
    } else {
      setCirrusInfo('');
    }
  };

  const toggleSectionsVissa = () => {
    setIsVissa(!isVissa);
    if (!isVissa) {
      setWebInfo('Web360 Form');
    } else {
      setWebInfo('');
    }
  };

  const addInput = (section) => {
    if (section === 'annotation') {
      setAnnotationInputs([...annotationInputs, { value: '', placeholder: '' }]);
    } else if (section === 'cirrus') {
      setCirrusInputs([...cirrusInputs, { value: '', placeholder: '' }]);
    } else if (section === 'web') {
      setWebInputs([...webInputs, { value: '', placeholder: '' }]);
    }
  };

  const removeInput = (section) => {
    if (section === 'annotation' && annotationInputs.length > 1) {
      setAnnotationInputs(annotationInputs.slice(0, annotationInputs.length - 1));
    } else if (section === 'cirrus' && cirrusInputs.length > 1) {
      setCirrusInputs(cirrusInputs.slice(0, cirrusInputs.length - 1));
    } else if (section === 'web' && webInputs.length > 1) {
      setWebInputs(webInputs.slice(0, webInputs.length - 1));
    }
  };

  const saveToJson = () => {
    const data = {
      annotationInputs,
      cirrusInputs,
      webInputs
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });

    saveAs(blob, 'data.json');
  };

  return (
    <>
    {/* <img src={pattern} alt="Pattern" className="pattern" /> */}
      <div className="template-container">
      <div className="Annotation">
          <h1 onClick={toggleSectionsVisibility}>
            {isVisible ? 'Annotation' : 'Annotation'}
          </h1>
        </div>
        <div className="Cirrus">
          <h1 onClick={toggleSectionsSynlig}>
            {isSynlig ? 'Cirrus' : 'Cirrus'}
          </h1>
        </div>
        <div className="Web360">
          <h1 onClick={toggleSectionsVissa}>
            {isVissa ? 'Web360' : 'Web360'}
          </h1>
        </div>
      </div>

      <div className="bottom-container">
        <div className="box">
          <h2>Activity:</h2>

          {annotationInfo && (
            <div className="annotation-info">
              <h2>{annotationInfo}</h2>
              <div className="Bdl-split">
                {annotationInputs.map((input, index) => (
                  <input
                    key={index}
                    type="text"
                    value={input.value}
                    placeholder={input.placeholder}
                    onChange={(e) => {
                      const newInputs = [...annotationInputs];
                      newInputs[index].value = e.target.value;
                      setAnnotationInputs(newInputs);
                    }}
                  />
                ))}
                <div className="button-group">
                  <button className="button-add" onClick={() => addInput('annotation')}>+</button>
                  <button className="button-remove" onClick={() => removeInput('annotation')}>-</button>
                </div>
                <button className="save-button" onClick={saveToJson}> Save </button>
              </div>
            </div>
          )}

          {cirrusInfo && (
            <div className="cirrus-info">
              <h2>{cirrusInfo}</h2>
              <div className="Bdl-split">
                {cirrusInputs.map((input, index) => (
                  <input
                    key={index}
                    type="text"
                    value={input.value}
                    placeholder={input.placeholder}
                    onChange={(e) => {
                      const newInputs = [...cirrusInputs];
                      newInputs[index].value = e.target.value;
                      setCirrusInputs(newInputs);
                    }}
                  />
                ))}
                <div className="button-group">
                  <button className="button-add" onClick={() => addInput('cirrus')}>+</button>
                  <button className="button-remove" onClick={() => removeInput('cirrus')}>-</button>
                </div>
                <button className="save-button" onClick={saveToJson}> Save </button>
              </div>
            </div>
          )}

          {webInfo && (
            <div className="web-info">
              <h2>{webInfo}</h2>
              <div className="Bdl-split">
                {webInputs.map((input, index) => (
                  <input
                    key={index}
                    type="text"
                    value={input.value}
                    placeholder={input.placeholder}
                    onChange={(e) => {
                      const newInputs = [...webInputs];
                      newInputs[index].value = e.target.value;
                      setWebInputs(newInputs);
                    }}
                  />
                ))}
                <div className="button-group">
                  <button className="button-add" onClick={() => addInput('web')}>+</button>
                  <button className="button-remove" onClick={() => removeInput('web')}>-</button>
                </div>
                <button className="save-button" onClick={saveToJson}> Save </button>
              </div>
            </div>
          )}

          {/* hur ska jag koppla dessa? */}
          <div className="sidebar-session">
            
            <h1>Session</h1>
            <h3>Session 1</h3>
            <h3>Session 2</h3>
            <h3>Session 3</h3>
            <h3>Session 4</h3>
            <button className="advance">Advance Info</button>
          </div>
        </div>

        <img src={loggaover} alt="Logo" className="logo" />
      </div>
    </>
  );
}

export default Landing;

