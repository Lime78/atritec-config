import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { cirrusApi } from '../data/cirrusapi.js';
import { annotationApi } from '../data/annotation.js';
import { webApi } from '../data/web.js';
import { sessionInputs } from '../data/2024-05-22_07-35-24.js';
import {session} from '../data/2024-06-22_07-35-24.js';
import {session2024} from '../data/2024-07-22_07-35-24.js';
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
  const [showSessionDetails, setShowSessionDetails] = useState(false);

  const [annotationInfo, setAnnotationInfo] = useState('');
  const [webInfo, setWebInfo] = useState('');
  const [cirrusInfo, setCirrusInfo] = useState('');

  useEffect(() => {
    if (!trackData) {
      const annotationParamsData = Object.entries(annotationApi[0].annotation.params).map(([key, params]) => ({
        name: key,
        text: params.desc,
        type: params.type,
        value: params.default || "",
      }));

      const annotationPackagesData = Object.entries(annotationApi[0].annotation.packages).flatMap(([packageKey, packageValue]) => 
        Object.entries(packageValue).map(([key, params]) => ({
          name: `${packageKey}.${key}`,
          text: params.desc,
          type: params.type,
          value: params.default || "",
        }))
      );

      const annotationData = [...annotationParamsData, ...annotationPackagesData];
      setAnnotationInputs(annotationData);
    }
  }, [trackData]);

  useEffect(() => { 
    if (!trackData) {
      const webParamsData = Object.entries(webApi[0].web360.params).map(([key, params]) => ({
        name: key,
        text: params.desc,
        type: params.type,
        value: params.default || "",
      }));
  
      const webPackagesData = Object.entries(webApi[0].web360.packages).flatMap(([packageKey, packageValue]) => 
        Object.entries(packageValue).map(([key, params]) => ({
          name: `${packageKey}.${key}`,
          text: params.desc,
          type: params.type,
          value: params.default || "",
        }))
      );

      const webData = [...webParamsData, ...webPackagesData];
      setWebInputs(webData);
    }
  }, [trackData]);

  useEffect(() => {
    if (!trackData) {
      const cirrusParamsData = Object.entries(cirrusApi[0].cirrus.params).map(([key,params]) => ({
        name: key,
        text: params.desc,
        type: params.type,
        value: params.default || "",
      }));

      const cirrusPackagesData = Object.entries(cirrusApi[0].cirrus.packages).flatMap(([packageKey, packageValue]) => 
      Object.entries(packageValue).map(([key, params]) => ({
        name: `${packageKey}.${key}`,
        text: params.desc,
        type: params.type,
        value: params.default || "",
      }))
    );

      const cirrusData = [...cirrusParamsData, ...cirrusPackagesData];
      setCirrusInputs(cirrusData);
    }
  }, [trackData]);

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
    const annotationData = annotationInputs.reduce((acc, input) => {
      const [category, key] = input.name.split('.');
      if (key) {
        if (!acc.packages[category]) {
          acc.packages[category] = {};
        }
        acc.packages[category][key] = input.value;
      } else {
        acc.params[input.name] = input.value;
      }
      return acc;
    }, { params: {}, packages: {} });
  
    const data = { annotation: annotationData };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'AnnotationForm.json');
  };
  
  const saveToWeb = () => {
    const webData = webInputs.reduce((acc, input) => {
      const [category, key] = input.name.split('.');
      if (key) {
        if (!acc.packages[category]) {
          acc.packages[category] = {};
        }
        acc.packages[category][key] = input.value;
      } else {
        acc.params[input.name] = input.value;
      }
      return acc;
    }, { params: {}, packages: {} });
  
    const data = { web360: webData };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'WebForm.json');
  };

  const saveToCirrus = () => {
    const cirrusData = cirrusInputs.reduce((acc, input) => {
      const [category, key] = input.name.split('.');
      if (key) {
        if (!acc.packages[category]) {
          acc.packages[category] = {};
        }
        acc.packages[category][key] = input.value;
      } else {
        acc.params[input.name] = input.value;
      }
      return acc;
    }, { params: {}, packages: {} });
  
    const data = { cirrus: cirrusData };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'CirrusForm.json');
  };


  const toggleSectionsSession = () => {
  setShowSessionDetails(!showSessionDetails);
  if (!showSessionDetails) {
    // Assuming you want the first session
    const sessionInfo = sessionInputs[0].session;
    // Log the session info, not the string 'sessionInfo'
    console.log(sessionInfo);
  }
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
          <h2>Activity</h2>
        {annotationInfo && (
          <div className="annotation-info">
            <h2>{annotationInfo}</h2>
            <div className="Bdl-split">
            {annotationInputs.map((input, index) => (
                <div key={index} className="input-container">
                  {input.text && <div className="input-description">{input.text}</div>}
                  <input type={input.type === 'bool' ? 'checkbox' : 'text'}
                      value={input.type === 'bool' ? undefined : input.value || ""}
                      checked={input.type === 'bool' ? Boolean(input.value) : undefined}
                      onChange={(e) => {
                      const newInputs = [...annotationInputs];
                      if (input.type === 'bool') {
                        newInputs[index].value = e.target.checked;
                      } else {
                        newInputs[index].value = e.target.value;
                      }
                      setAnnotationInputs(newInputs);
                    }}
                  />
                </div>
              ))}
              <div className="button-group">
                <button className="button-add" onClick={() => addInput('annotation')}> + </button>
                <button className="button-remove" onClick={() => removeInput('annotation')} > - </button>
                <button className="save-button" onClick={saveToAnnotation}> Save </button>
                <NavLink to="/advance" className="Advance-button"> Advance </NavLink>
              </div>
            </div>
          </div>
        )}

        {webInfo && (
            <div className="web-info">
              <h2>{webInfo}</h2>
              <div className="Bdl-split">
                {webInputs.map((input, index) => (
                  <div key={index} className="input-container">
                    {input.text && <div className="input-description">{input.text}</div>}
                    <input
                      type={input.type === 'bool' ? 'checkbox' : 'text'}
                      value={input.type === 'bool' ? undefined : input.value || ""}
                      checked={input.type === 'bool' ? Boolean(input.value) : undefined}
                      onChange={(e) => {
                        const updatedInputs = [...webInputs];
                        if (input.type === 'bool') {
                          updatedInputs[index].value = e.target.checked;
                        } else {
                          updatedInputs[index].value = e.target.value;
                        }
                          setWebInputs(updatedInputs);
                      }}
                    />
                  </div>
                ))}
                <div className="button-group">
                  <button className="button-add" onClick={() => addInput('web')}>+</button>
                  <button className="button-remove" onClick={() => removeInput('web')}>-</button>
                  <button className="save-button" onClick={saveToWeb}>Save</button> {/* Save button triggers saveToWeb */}
                  <NavLink to="advanceWeb" className="AdvanceWeb-button">Advance</NavLink>
                </div>
              </div>
            </div>
              )}
          
        {cirrusInfo && (
          <div className="cirrus-info">
            <h2>{cirrusInfo}</h2>
            <div className="Bdl-split">
              {cirrusInputs.map((input, index) => (
                <div key={index} className="input-container">
                  {input.text && <div className="input-description">{input.text}</div>}
                  <input
                    type={input.type === 'bool' ? 'checkbox' : 'text'}
                    value={input.type === 'bool' ? undefined : input.value || ""}
                    checked={input.type === 'bool' ? Boolean(input.value) : undefined} 
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
                </div>
              ))}
              <div className="button-group">
                <button className="button-add" onClick={() => addInput('cirrus')}>+</button>
                <button className="button-remove" onClick={() => removeInput('cirrus')}>-</button>
                <button className="save-button" onClick={saveToCirrus}>Save</button>
                <NavLink to="/advanceCirrus" className="AdvanceCirrus-button">Advance</NavLink>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>

          <div className="sidebar-session">
        <div className="session-class">
        <h1 onClick={toggleSectionsSession}>
          {showSessionDetails ? "Session" : "Session"}
        </h1>
        {showSessionDetails && (
          <div className="session-details">
            <div className="session-info">
              <h3>2024-06-22_07-35-24</h3>
              <h3>2024-07-22_07-35-24</h3>
              <h3>2024-08-22_07-35-24</h3>
              <div className="session-data">
                {sessionInputs.map((input, index) => (
                  <div key={index} className="input-container">
                    <div className="input-description">{input.text}</div>
                    <input
                      type={input.type === 'bool' ? 'checkbox' : 'text'}
                      value={input.type === 'bool' ? undefined : input.value || ""}
                      checked={input.type === 'bool' ? Boolean(input.value) : undefined}
                      onChange={(e) => {
                      const newInputs = [...sessionInputs];
                      if (input.type === 'bool') {
                        newInputs[index].value = e.target.checked;
                      } else {
                        newInputs[index].value = e.target.value;
                      }
                      sessionInputs(newInputs);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

      <img src={loggagreen} alt="logga" className="logga" />
      {/* <img src={loggaover} alt="logga" className="logo" /> */}
      {/* <img src={loggavit} alt="logga" className="logga" /> */}
  </>
  );
  };

export default Landing;