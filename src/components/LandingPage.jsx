import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { cirrusApi } from '../data/cirrusapi.js';
import { annotationApi } from '../data/annotation.js';
import { webApi } from '../data/web.js';
import { sessionInputs } from '../data/2024-05-22_07-35-24.js';
import { session as sessionData } from '../data/2024-06-22_07-35-24.js';
import { session2024 } from '../data/2024-07-22_07-35-24.js';
import loggagreen from '../assets/loggagreen.png';
import folder from '../assets/folder.svg';
import deployed from '../assets/deployed.svg';
import train from '../assets/train.svg';
import './Landing.css';
import { saveAs } from 'file-saver';

const Landing = ({ trackData }) => {
  const [annotationInputs, setAnnotationInputs] = useState([]);
  const [webInputs, setWebInputs] = useState([]);
  const [cirrusInputs, setCirrusInputs] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isSynlig, setIsSynlig] = useState(false);
  const [isVissa, setIsVissa] = useState(false);
  const [showFolder, setShowFolder] = useState(true);

  const [showSessionDetails, setShowSessionDetails] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedSession, setIsCheckedSession] = useState(false);
  const [isCheckedSession2024, setIsCheckedSession2024] = useState(false);

  const [annotationInfo, setAnnotationInfo] = useState('');
  const [webInfo, setWebInfo] = useState('');
  const [cirrusInfo, setCirrusInfo] = useState('');

  const initializeAnnotationInputs = () => {
    const annotationInfo = Object.entries(annotationApi[0].annotationInfo).map(([key, value]) => ({
      name: `annotationInfo.${key}`,
      text: key,
      type: typeof value,
      value: value,
    }));
  
    const annotationParamsData = Object.entries(annotationApi[0].params).map(([key, value]) => ({
      name: `params.${key}`,
      text: key,
      type: typeof value === 'object' && value.type ? value.type : typeof value,
      value: typeof value === 'object' && value.default !== undefined ? value.default : value,
    }));
  
    const splitInformationData = Object.entries(annotationApi[0].split_information).map(([key, value]) => ({
      name: `split_information.${key}`,
      text: key,
      type: typeof value === 'object' && value.type ? value.type : typeof value,
      value: typeof value === 'object' && value.default !== undefined ? value.default : value,
    }));
  
    const pointcloudsData = Object.entries(annotationApi[0].pointclouds).flatMap(([category, values]) =>
      Object.entries(values).map(([key, value]) => ({
        name: `pointclouds.${category}.${key}`,
        text: key,
        type: typeof value === 'object' && value.type ? value.type : typeof value,
        value: typeof value === 'object' && value.default !== undefined ? value.default : value,
      }))
    );
  
    const image360ParamsData = Object.entries(annotationApi[0].image_360.params).map(([key, value]) => ({
      name: `image_360.params.${key}`,
      text: key,
      type: typeof value === 'object' && value.type ? value.type : typeof value,
      value: typeof value === 'object' && value.default !== undefined ? value.default : value,
    }));
  
    const imageProjectionData = Object.entries(annotationApi[0].image_360.packages.image_projection.choices).map(([key, value]) => ({
      name: `image_360.packages.image_projection.${key}`,
      text: key,
      type: typeof value === 'object' && value.type ? value.type : typeof value,
      value: typeof value === 'object' && value.default !== undefined ? value.default : value,
    }));
  
    const annotationData = [
      ...annotationInfo,
      ...annotationParamsData,
      ...splitInformationData,
      ...pointcloudsData,
      ...image360ParamsData,
      ...imageProjectionData,
    ];
  
    const annotationInputsWithCheckboxes = annotationData.map((input) => {
      if (input.type === 'bool' || input.type === 'boolean') {
        return {
          ...input,
          inputElement: (
            <input
              type="checkbox"
              checked={input.value === true}
              onChange={(e) => handleCheckboxAnnoChange(e, input.name)}
            />
          ),
        };
      }
      return input;
    });
  
    setAnnotationInputs(annotationInputsWithCheckboxes);
  };
  
  useEffect(() => {
    if (!trackData) {
      initializeAnnotationInputs();
    }
  }, [trackData]);
  
  const handleCheckboxAnnoChange = (e, name) => {
    const updatedInputs = annotationInputs.map((input) => {
      if (input.name === name) {
        return { ...input, value: e.target.checked };
      }
      return input;
    });
    setAnnotationInputs(updatedInputs);
  };

  const initializeWebInputs = () => {
    const webInfo = Object.entries(webApi[0].webInfo).map(([key, value]) => ({
      name: `webInfo.${key}`,
      text: key,
      type: typeof value,
      value: value,
    }));
  
    const webParamsData = Object.entries(webApi[0].params).map(([key, value]) => ({
      name: `params.${key}`,
      text: key,
      type: typeof value === "object" && value.type ? value.type : typeof value,
      value: typeof value === "object" && value.default !== undefined ? value.default : value,
    }));
  
    const splitInformationData = Object.entries(webApi[0].split_information).map(([key, value]) => ({
      name: `split_information.${key}`,
      text: key,
      type: typeof value === "object" && value.type ? value.type : typeof value,
      value: typeof value === "object" && value.default !== undefined ? value.default : value,
    }));
  
    const pointcloudPackagesData = Object.entries(webApi[0].pointclouds).flatMap(([category, value]) =>
      Object.entries(value).map(([key, value]) => ({
        name: `pointclouds.${category}.${key}`,
        text: `${category} - ${key}`,
        type: typeof value === "object" && value.type ? value.type : typeof value,
        value: typeof value === "object" && value.default !== undefined ? value.default : value,
      }))
    );
  
    const image360ParamsData = Object.entries(webApi[0].image_360.params).map(([key, value]) => ({
      name: `image_360.params.${key}`,
      text: key,
      type: typeof value === "object" && value.type ? value.type : typeof value,
      value: typeof value === "object" && value.default !== undefined ? value.default : value,
    }));
  
    const imageProjectionData = Object.entries(webApi[0].image_360.packages.image_projection.choices).map(([key, value]) => ({
      name: `image_360.packages.image_projection.${key}`,
      text: key,
      type: typeof value === "object" && value.type ? value.type : typeof value,
      value: typeof value === "object" && value.default !== undefined ? value.default : value,
    }));
  
    const webData = [
      ...webInfo,
      ...webParamsData,
      ...splitInformationData,
      ...pointcloudPackagesData,
      ...image360ParamsData,
      ...imageProjectionData,
    ];
  
    const webInputsWithCheckboxes = webData.map((input) => {
      if (input.type === 'bool' || input.type === 'boolean') {
        return {
          ...input,
          inputElement: (
            <input
              type="checkbox"
              checked={input.value === true}
              onChange={(e) => handleCheckboxWebChange(e, input.name)}
            />
          ),
        };
      }
      return input;
    });
  
    setWebInputs(webInputsWithCheckboxes);
  };
  
  useEffect(() => {
    if (!trackData) {
      initializeWebInputs();
    }
  }, [trackData]);
  
  const handleCheckboxWebChange = (e, name) => {
    const updatedInputs = webInputs.map((input) => {
      if (input.name === name) {
        return { ...input, value: e.target.checked };
      }
      return input;
    });
    setWebInputs(updatedInputs);
  };

  const initializeCirrusInputs = () => {
    const cirrusInfo = Object.entries(cirrusApi[0].cirrusInfo).map(([key, value]) => ({
      name: `cirrusInfo.${key}`,
      text: key,
      type: typeof value,
      value: value,
    }));
  
    const paramsData = Object.entries(cirrusApi[0].params).map(([key, value]) => ({
      name: `params.${key}`,
      text: key,
      type: typeof value === 'object' && value !== null && value.type ? value.type : typeof value,
      value: typeof value === 'object' && value.default !== undefined ? value.default : value,
    }));
  
    const splitInformationData = Object.entries(cirrusApi[0].split_information).map(([key, value]) => ({
      name: `split_information.${key}`,
      text: key,
      type: typeof value === 'object' && value.type ? value.type : typeof value,
      value: typeof value === 'object' && value.default !== undefined ? value.default : value,
    }));
  
    const pointcloudsData = Object.entries(cirrusApi[0].pointclouds).flatMap(([category, values]) =>
      Object.entries(values).map(([key, value]) => ({
        name: `pointclouds.${category}.${key}`,
        text: `${category} - ${key}`,
        type: typeof value === 'object' && value.type ? value.type : typeof value,
        value: typeof value === 'object' && value.default !== undefined ? value.default : value,
      }))
    );
  
    const image360ParamsData = Object.entries(cirrusApi[0].image_360.params).map(([key, value]) => ({
      name: `image_360.params.${key}`,
      text: key,
      type: typeof value === 'object' && value.type ? value.type : typeof value,
      value: typeof value === 'object' && value.default !== undefined ? value.default : value,
    }));
  
    const imageProjectionData = Object.entries(cirrusApi[0].image_360.packages.image_projection.choices).map(([key, value]) => ({
      name: `image_360.packages.image_projection.${key}`,
      text: key,
      type: typeof value === 'object' && value.type ? value.type : typeof value,
      value: typeof value === 'object' && value.default !== undefined ? value.default : value,
    }));
  
    const cirrusData = [
      ...cirrusInfo,
      ...paramsData,
      ...splitInformationData,
      ...pointcloudsData,
      ...image360ParamsData,
      ...imageProjectionData,
    ];
  
    const cirrusInputsWithCheckboxes = cirrusData.map((input) => {
      if (input.type === 'bool' || input.type === 'boolean') {
        return {
          ...input,
          inputElement: (
            <input
              type="checkbox"
              checked={input.value === true}
              onChange={(e) => handleCheckboxCirrusChange(e, input.name)}
            />
          ),
        };
      }
      return input;
    });
  
    setCirrusInputs(cirrusInputsWithCheckboxes);
  };
  
  useEffect(() => {
    if (!trackData) {
      initializeCirrusInputs();
    }
  }, [trackData]);
  
  const handleCheckboxCirrusChange = (e, name) => {
    const updatedInputs = cirrusInputs.map((input) => {
      if (input.name === name) {
        return { ...input, value: e.target.checked };
      }
      return input;
    });
    setCirrusInputs(updatedInputs);
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
    setShowFolder(false);
    if (!isVisible) {
      setAnnotationInfo('Annotation Form');
    } else {
      setAnnotationInfo('');
    } 
    if (isVisible) {
      setShowFolder(true);
    }
  };

  const toggleSectionsVissa = () => {
    setIsVissa(!isVissa);  
    setShowFolder(false);
    if (!isVissa) {
      setWebInfo('Web360 Form');
    } else {
      setWebInfo('');
    }
    if (isVissa) {
      setShowFolder(true);
    }
  };

  const toggleSectionsSynlig = () => {
    setIsSynlig(!isSynlig);
    setShowFolder(false);
    if (!isSynlig) {
      setCirrusInfo('Cirrus Form');
    } else {
      setCirrusInfo('');
    }
    if (isSynlig) {
      setShowFolder(true);
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
  
    // Reinitialize the annotation inputs
    initializeAnnotationInputs();
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
  
    initializeWebInputs();
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
  
    // Reinitialize the cirrus inputs
    initializeCirrusInputs();
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
    if (!isChecked) {
      setIsCheckedSession(false);
      setIsCheckedSession2024(false);
    }
    console.log(sessionInputs);
  };
  
  const handleSessionCheckboxChange = () => {
    setIsCheckedSession(!isCheckedSession);
    if (!isCheckedSession) {
      setIsChecked(false);
      setIsCheckedSession2024(false);
    }
    console.log(sessionData);
  };
  
  const handleSession2024CheckboxChange = () => {
    setIsCheckedSession2024(!isCheckedSession2024);
    if (!isCheckedSession2024) {
      setIsChecked(false);
      setIsCheckedSession(false);
    }
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
      <h3>Activity</h3>
      {showFolder && (
        <img src={train} alt="folder" className="folder" />
      )}

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
            <button className="button-add" onClick={() => addInput('annotation')}> + </button>
            <button className="button-remove" onClick={() => removeInput('annotation')}> - </button>
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
                  <input type="checkbox" className="styled-checkbox" checked={isChecked} onChange={handleCheckboxChange}
                  />
                  <h3 onClick={() => console.log(sessionData)}>2024-06-22_07-35-25</h3>
                  <input type="checkbox" className="styled-checkbox" checked={isCheckedSession} onChange={handleSessionCheckboxChange}
                  />
                  <h3 onClick={() => console.log(session2024)}>2024-07-22_07-35-26</h3>
                  <input type="checkbox" className="styled-checkbox" checked={isCheckedSession2024} onChange={handleSession2024CheckboxChange}
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
        </>
      );
    };

export default Landing;