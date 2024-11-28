import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Api } from '../data/api.js';
// import { annotationInfo } from '../data/annotation.js';
import loggavit from '../assets/loggavit.png';
import loggaover from '../assets/loggaover.png';
import loggagreen from '../assets/loggagreen.png';
import './Landing.css';
import { saveAs } from 'file-saver';

const Landing = ({ trackData }) => {
  const [annotationInputs, setAnnotationInputs] = useState([]);
  const [webInputs, setWebInputs] = useState([]);
  const [cirrusInputs, setCirrusInputs] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isSynlig, setIsSynlig] = useState(false);
  const [isVissa, setIsVissa] = useState(false);

  const [annotationInfo, setAnnotationInfo] = useState('');
  const [webInfo, setWebInfo] = useState('');
  const [cirrusInfo, setCirrusInfo] = useState('');

  useEffect(() => {
    if (!trackData) {
      const cirrusData = Object.entries(Api[0].cirrus.packages).map(([key, packages]) => ({
        name: key,
        type: packages.type,
        value: packages.default,
        placeholder: packages.desc,
      }));
      setCirrusInputs(cirrusData);
    }
  }, [trackData]);

  //Annotation Api
  // useEffect(() => {
  //   if (!trackData) {
  //     const annotationData = Object.entries(annotationInfo[0].annotation.packages).map(([key, packages]) => ({
  //       name: key,
  //       type: packages.type,
  //       value: packages.default,
  //       placeholder: packages.desc,
  //     }));
  //     setAnnotationInputs(annotationData);
  //   }
  // }, [trackData]);
   
  const addInput = (section) => {
    if (section === 'annotation') {
      setAnnotationInputs([...annotationInputs, { value: '', placeholder: '' }]);
    } else if (section === 'web') {
      setWebInputs([...webInputs, { value: '', placeholder: '' }]);
    } else if (section === 'cirrus') {
      setCirrusInputs([...cirrusInputs, { value: '', placeholder: '' }]);
    }
  };

  const removeInput = (section) => {
    if (section === 'annotation' && annotationInputs.length > 1) {
      setAnnotationInputs(annotationInputs.slice(0, annotationInputs.length - 1));
    } else if (section === 'web' && webInputs.length > 1) {
      setWebInputs(webInputs.slice(0, webInputs.length - 1));
    } else if (section === 'cirrus' && cirrusInputs.length > 1) {
      setCirrusInputs(cirrusInputs.slice(0, cirrusInputs.length - 1));
    }
  };

  const toggleSectionsVisibility = () => {
    setIsVisible(!isVisible);
    if (!isVisible) {
      setAnnotationInfo('Annotation Form');
    } else {
      setAnnotationInfo('');
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

  const toggleSectionsSynlig = () => {
    setIsSynlig(!isSynlig);
    if (!isSynlig) {
      setCirrusInfo('Cirrus Form');
    } else {
      setCirrusInfo('');
    }
  };

  const saveToAnnotation = () => {
    const data = { annotationInputs };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'data.json');
  };

  const saveToCirrus = () => {
    const data = { cirrusInputs };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'data.json');    
  };

  const saveToWeb = () => {
    const data = { webInputs };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'data.json');
  };

  return (
    <>
      <div className="template-container">
        <div className="Annotation">
          <h2 onClick={toggleSectionsVisibility}>{isVisible ? 'Annotation' : 'Annotation'}</h2>
        </div>
        <div className="Web360">
          <h2 onClick={toggleSectionsVissa}>{isVissa ? 'Web360' : 'Web360'}</h2>
        </div>
        <div className="Cirrus">
          <h2 onClick={toggleSectionsSynlig}>{isSynlig ? 'Cirrus' : 'Cirrus'}</h2>
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
                <button className="save-button" onClick={saveToAnnotation}>Save Annotation</button>
                <NavLink to="/advance" className="Advance-button">Advance</NavLink>
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
                <button className="save-button" onClick={saveToWeb}>Save Web</button>
                <NavLink to="/advanceWeb" className="AdvanceWeb-button">Advance</NavLink>
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
                    type={input.type === 'bool' ? 'checkbox' : 'text'}
                    value={input.type === 'bool' ? undefined : input.value} placeholder={input.placeholder}
                    checked={input.type === 'bool' ? input.value : undefined}
                    onChange={(e) => {
                      const newInputs = [...cirrusInputs];
                      if (input.type === 'bool') {
                        newInputs[index].value = e.target.checked;
                      } else {
                        newInputs[index].value = e.target.value;
                      }
                      setCirrusInputs(newInputs);
                    }}
                  />
                ))}
                <div className="button-group">
                  <button className="button-add" onClick={() => addInput('cirrus')}>+</button>
                  <button className="button-remove" onClick={() => removeInput('cirrus')}>-</button>
                </div>
                <button className="save-button" onClick={saveToCirrus}>Save Cirrus</button>
                <NavLink to="/advanceCirrus" className="AdvanceCirrus-button">Advance</NavLink>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="sidebar-session">
        <div className="session-class">
          <h1>Session</h1>
        </div>
      </div>

      {/* <img src={loggagreen} alt="logga" className="logga" /> */}
      {/* <img src={loggaover} alt="logga" className="logga" /> */}
      <img src={loggavit} alt="logga" className="logga" />
  </>
);
};

export default Landing;