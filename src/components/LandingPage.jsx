import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Api } from '../data/api.js';
import { annotationApi } from '../data/annotation.js';
import { webApi } from '../data/web.js';
// import { sessionInputs } from '../data/session.js';
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


  const [session, setSession] = useState([false]);
  const [sessionData, setSessionData] = useState(null);
  const [showSessionDetails, setShowSessionDetails] = useState(false);


  const [annotationInfo, setAnnotationInfo] = useState('');
  const [webInfo, setWebInfo] = useState('');
  const [cirrusInfo, setCirrusInfo] = useState('');


  useEffect(() => {
    if (!trackData) {
      const annotationData = Object.entries(annotationApi[0].annotation.params).map(([key, params]) => ({
        name: key,
        text: params.desc,
        type: params.type,
        value: params.default || "",
      }));
      setAnnotationInputs(annotationData);
    }
  }, [trackData]);

  useEffect(() => {
    if (!trackData) {
      const webData = Object.entries(webApi[0].web360.info).map(([key, info]) => ({
        name: key,
        text: info.desc,
        type: info.type,
        value: info.default || "",
      }));
      setWebInputs(webData);
    }
  }, [trackData]);

  useEffect(() => {
    if (!trackData) {
      const cirrusData = Object.entries(Api[0].cirrus.packages).map(([key, packages]) => ({
        name: key,
        text: packages.desc,
        type: packages.type,
        value: packages.default || "",  
      }));
      setCirrusInputs(cirrusData);
    }
  }, [trackData]);

  // useEffect(() => {
  //   const fetchSessionData = () => {
  //     const sessionInputs = {
  //       "2024-06-22_07-35-24": {
  //         sessionName: "2024-06-22_07-35-24",
  //         session: {
  //           operator: "Johnny",
  //           session_version: 1,
  //           softwareVersion: "2.2.0",
  //           vehicle: {
  //             name: "Y1",
  //             vehicle_model: "Y1",
  //             vehicle_type: "Rail",
  //             date_str: "2024-04-23",
  //             odometerPulsesPerMeter: 2643.9171832249967,
  //           },
  //           lidarNames: [
  //             "Riegl VUX 1HA Left",
  //             "Riegl VUX 1HA Right",
  //             "Profiler 9012 Left",
  //           ],
  //           positioningName: "Atlans A7",
  //           cameraNames: [],
  //         },
  //         session_start: 1719033784.0149665,
  //         session_stop: 1719046873.7969127,
  //         duration: 13089.781946182251,
  //       },
  //     };

  //     setSessionData(sessionInputs["2024-06-22_07-35-24"]);
  //   };

  //   fetchSessionData();
  // }, []); 

  const toggleSectionsSession = () => {
    setShowSessionDetails(!showSessionDetails);
  };

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

  // const toggelSectionsSession = () => {
  //   setSession(!session);
  //   if (!session) {
  //     setSession('Session');
  //   } else {
  //     setSession('');
  //   }
  // };

  const saveToAnnotation = () => {
    const data = { annotationInputs };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'AnnotationForm.json');
  };

  const saveToWeb = () => {
    const data = { webInputs };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'WebForm.json');
  };

  const saveToCirrus = () => {
    const data = { cirrusInputs };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'CirrusForm.json');    
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
                  <div key={index} className="input-container">
                    {input.text && <div className="input-description">{input.text}</div>}
                    <input
                       type={input.type === 'bool' ? 'checkbox' : 'text'}
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
                  <div key={index} className="input-container">
                    {input.text && <div className="input-description">{input.text}</div>}
                    <input
                       type={input.type === 'bool' ? 'checkbox' : 'text'}
                       value={input.type === 'bool' ? undefined : input.value || ""}
                       checked={input.type === 'bool' ? Boolean(input.value) : undefined}
                      onChange={(e) => {
                        const newInputs = [...webInputs];
                        if (input.type === 'bool') {
                          newInputs[index].value = e.target.checked;
                        } else {
                          newInputs[index].value = e.target.value;
                        }
                        setWebInputs(newInputs);
                      }}
                    />
                  </div>
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
        <h1 onClick={toggleSectionsSession}>
          {showSessionDetails ? "Session" : "Session1"}
        </h1>
       </div>
      {/* <div className="session-info">
        {showSessionDetails ? (
          <>
            <h3>Session Name: {sessionData.sessionName}</h3>
            <p>Operator: {sessionData.session.operator}</p>
            <p>Software Version: {sessionData.session.softwareVersion}</p>
            <p>Vehicle: {sessionData.session.vehicle.name}</p>
            <p>Vehicle Model: {sessionData.session.vehicle.vehicle_model}</p>
            <p>Vehicle Type: {sessionData.session.vehicle.vehicle_type}</p>
            <p>Session Duration: {Math.round(sessionData.duration)} seconds</p>
            <p>Lidar Sensors:</p>
            <ul>
              {sessionData.session.lidarNames.map((lidar, index) => (
                <li key={index}>{lidar}</li>
              ))}
            </ul>
            <p>Positioning System: {sessionData.session.positioningName}</p>
            <p>Start Time: {new Date(sessionData.session_start * 1000).toLocaleString()}</p>
            <p>End Time: {new Date(sessionData.session_stop * 1000).toLocaleString()}</p>
          </>
        ) : (
          <p>Click above to show session details</p>
        )}
      </div> */}
    </div>

      <img src={loggagreen} alt="logga" className="logga" />
      {/* <img src={loggaover} alt="logga" className="logga" /> */}
      {/* <img src={loggavit} alt="logga" className="logga" /> */}
  </>
  );
  };

export default Landing;