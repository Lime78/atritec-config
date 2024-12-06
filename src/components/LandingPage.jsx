import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { cirrusApi } from '../data/cirrusapi.js';
import { annotationApi } from '../data/annotation.js';
import { webApi } from '../data/web.js';
import { sessionInputs } from '../data/2024-05-22_07-35-24.js';
import { session as sessionData } from '../data/2024-06-22_07-35-24.js';
import { session2024 } from '../data/2024-07-22_07-35-24.js';
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
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedSession, setIsCheckedSession] = useState(false);
  const [isCheckedSession2024, setIsCheckedSession2024] = useState(false);

  const [annotationInfo, setAnnotationInfo] = useState('');
  const [webInfo, setWebInfo] = useState('');
  const [cirrusInfo, setCirrusInfo] = useState('');

  useEffect(() => {
    if (!trackData) {
      const annotationParamsData = Object.entries(annotationApi[0].params).map(([key, value]) => ({
        name: `params.${key}`,
        text: key,
        type: typeof value === "object" && value.type ? value.type : typeof value,
        value: value,
      }));
  
      const splitInformationData = Object.entries(annotationApi[0].split_information).map(([key, value]) => ({
        name: `split_information.${key}`,
        text: key,
        type: typeof value,
        value: value,
      }));

      const pointcloudsData = Object.entries(annotationApi[0].pointclouds).flatMap(([category, values]) =>
        Object.entries(values).map(([key, value]) => ({
          name: `pointclouds.${category}.${key}`,
          text: `${category} - ${key}`,
          type: typeof value,
          value: value,
        }))
      );
  
      const image360ParamsData = Object.entries(annotationApi[0].image_360.params).map(([key, value]) => ({
        name: `image_360.params.${key}`,
        text: key,
        type: typeof value,
        value: value,
      }));

      const imageProjectionData = Object.entries(annotationApi[0].image_360.packages.image_projection.choices).map(([key, value]) => ({
        name: `image_360.packages.image_projection.${key}`,
        text: key,
        type: value.type,
        value: value.default,
      }));
  
      const annotationData = [...annotationParamsData, ...splitInformationData,...image360ParamsData,...imageProjectionData, ...pointcloudsData  ];
      setAnnotationInputs(annotationData);
    }
  }, [trackData]);
  
  useEffect(() => {
  if (!trackData) {
    const webParamsData = Object.entries(webApi[0].params).map(([key, value]) => ({
      name: `params.${key}`,
      text: key,
      type: typeof value === "object" && value.type ? value.type : typeof value,
      value: value,
    }));

    const splitInformationData = Object.entries(webApi[0].split_information).map(([key, value]) => ({
      name: `split_information.${key}`,
      text: key,
      type: typeof value,
      value: value,
    }));

    const pointcloudPackagesData = Object.entries(webApi[0].pointclouds).flatMap(([category, value]) =>
      Object.entries(value).map(([key, value]) => ({
        name: `pointclouds.${category}.${key}`,
        text: `${category} - ${key}`,
        type: typeof value,
        value: value,
      }))
    );

    const image360ParamsData = Object.entries(webApi[0].image_360.params).map(([key, value]) => ({
      name: `image_360.params.${key}`,
      text: key,
      type: typeof value,
      value: value,
    }));

    const imageProjectionData = Object.entries(webApi[0].image_360.packages.image_projection.choices).map(([key, value]) => ({
      name: `image_360.packages.image_projection.${key}`,
      text: key,
      type: value.type,
      value: value.default,
    }));

    const webData = [...webParamsData, ...pointcloudPackagesData, ...imageProjectionData, ...splitInformationData, ...image360ParamsData ];
    setWebInputs(webData);
  }
}, [trackData]);

  useEffect(() => {
    if (!trackData) {
      const paramsData = Object.entries(cirrusApi[0].params).map(([key, value]) => ({
        name: `params.${key}`,
        text: key,
        type: typeof value === 'object' && value !== null && value.type ? value.type : typeof value,
        value: value,
      }));
  
      const splitInformationData = Object.entries(cirrusApi[0].split_information).map(([key, value]) => ({
        name: `split_information.${key}`,
        text: key,
        type: typeof value,
        value: value,
      }));
  
      const pointcloudsData = Object.entries(cirrusApi[0].pointclouds).flatMap(([category, values]) =>
        Object.entries(values).map(([key, value]) => ({
          name: `pointclouds.${category}.${key}`,
          text: `${category} - ${key}`,
          type: typeof value,
          value: value,
        }))
      );
        const imageProjectionData = Object.entries(cirrusApi[0].image_360.packages.image_projection.choices).map(([key, value]) => ({
        name: `image_360.packages.image_projection.${key}`,
        text: key,
        type: value.type,
        value: value.default,
      }));

      const image360ParamsData = Object.entries(cirrusApi[0].image_360.params).map(([key, value]) => ({
        name: `image_360.params.${key}`,
        text: key,
        type: typeof value,
        value: value,
      }));

      const cirrusData = [ ...paramsData, ...splitInformationData, ...pointcloudsData, ...image360ParamsData, ...imageProjectionData ];
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
      const path = input.name.split('.');
      let current = acc;
  
      path.forEach((key, index) => {
        if (index === path.length - 1) {
          current[key] = input.value;
        } else {
          if (!current[key]) {
            current[key] = {};
          }
          current = current[key];
        }
      });
  
      return acc;
    }, {});
  
    if (isChecked) {
      annotationData.session = sessionInputs;
    }
    if (isCheckedSession) {
      annotationData.session = sessionData;
    }
    if (isCheckedSession2024) {
      annotationData.session = session2024;
    }

      const annotationInfo = {
      project_name: annotationApi[0].project_name,
      vehicle: annotationApi[0].vehicle,
      session_name: annotationApi[0].session_name,
      path_nas: annotationApi[0].path_nas,
      comment: annotationApi[0].comment,
      template: annotationApi[0].template,
    };
  
    const data = { annotation: { ...annotationInfo, ...annotationData } };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'AnnotationForm.json');
  };

  const saveToWeb = () => {
    const webData = webInputs.reduce((acc, input) => {
      const path = input.name.split('.');
      let current = acc;
  
      path.forEach((key, index) => {
        if (index === path.length - 1) {
          current[key] = input.value;
        } else {
          if (!current[key]) {
            current[key] = {};
          }
          current = current[key];
        }
      });
  
      return acc;
    }, {});
  
    if (isChecked) {
      webData.session = sessionInputs;
    }
    if (isCheckedSession) {
      webData.session = sessionData;
    }
    if (isCheckedSession2024) {
      webData.session = session2024;
    }
  
    const web360Info = {
      project_name: webApi[0].project_name,
      vehicle: webApi[0].vehicle,
      session_name: webApi[0].session_name,
      path_nas: webApi[0].path_nas,
      comment: webApi[0].comment,
      template: webApi[0].template,
    };
    
    const data = { web: { ...web360Info, ...webData } };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'WebForm.json');
  };

  const saveToCirrus = () => {
    const cirrusData = cirrusInputs.reduce((acc, input) => {
      const path = input.name.split('.');
      let current = acc;
    
      path.forEach((key, index) => {
        if (index === path.length - 1) {
          current[key] = input.value;
        } else {
          if (!current[key]) {
            current[key] = {};
          }
          current = current[key];
        }
      });
    
      return acc;
    }, {});
  
    if (isChecked) {
      cirrusData.session = sessionInputs;
    }
    if (isCheckedSession) {
      cirrusData.session = sessionData;
    }
    if (isCheckedSession2024) {
      cirrusData.session = session2024;
    }
  
    const cirrusInfo = {
      project_name: cirrusApi[0].project_name,
      vehicle: cirrusApi[0].vehicle,
      session_name: cirrusApi[0].session_name,
      path_nas: cirrusApi[0].path_nas,
      comment: cirrusApi[0].comment,
      template: cirrusApi[0].template,
    };
  
    const data = { cirrus: { ...cirrusInfo, ...cirrusData } };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'CirrusForm.json');
  };
  
  const toggleSectionsSession = () => {
    setShowSessionDetails(!showSessionDetails);
    if (!showSessionDetails) {
      const sessionInfo = sessionInputs[0].session;
      console.log(sessionInfo);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    console.log(sessionInputs);
  };

  const handleSessionCheckboxChange = () => {
    setIsCheckedSession(!isCheckedSession);
    console.log(sessionData);
  };

  const handleSession2024CheckboxChange = () => {
    setIsCheckedSession2024(!isCheckedSession2024);
    console.log(session2024);
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
                  <button className="save-button" onClick={saveToWeb}>Save</button>
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
                  <h3 onClick={() => console.log(sessionInputs)}>2024-05-22_07-35-24</h3>
                  <input
                    type="checkbox"
                    className="styled-checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <h3 onClick={() => console.log(sessionData)}>2024-06-22_07-35-24</h3>
                  <input
                    type="checkbox"
                    className="styled-checkbox"
                    checked={isCheckedSession}
                    onChange={handleSessionCheckboxChange}
                  />
                  <h3 onClick={() => console.log(session2024)}>2024-07-22_07-35-24</h3>
                  <input
                    type="checkbox"
                    className="styled-checkbox"
                    checked={isCheckedSession2024}
                    onChange={handleSession2024CheckboxChange}
                  />
                  <div className="session-data">
                    {sessionInputs.map((input, index) => (
                      <div key={index} className="input-container">
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