import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { cirrusApi } from '../data/cirrusapi.js';
import { annotationApi } from '../data/annotation.js';
import { webApi } from '../data/web.js';
import { sessionInputs } from '../data/2024-05-22_07-35-24.js';
import { session as sessionData } from '../data/2024-06-22_07-35-24.js';
import { session2024 } from '../data/2024-07-22_07-35-24.js';
import loggagreen from '../assets/loggagreen.png';
import atriteclogo from '../assets/atriteclogo.png';
import Atritec_logga from '../assets/Atritec_logga.png';
import folder from '../assets/folder.svg';
import deployed from '../assets/deployed.svg';
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
  const [activeSession, setActiveSession] = useState(null);

  const [annotationInfo, setAnnotationInfo] = useState('')
  const [webInfo, setWebInfo] = useState('');
  const [cirrusInfo, setCirrusInfo] = useState('');

  const [showAnnotationInfo, setShowAnnotationInfo] = useState(false);
  const [showParams, setShowParams] = useState(false);
  const [showSplitInformation, setShowSplitInformation] = useState(false);
  const [showPointclouds, setShowPointclouds] = useState(false);
  const [showImage360, setShowImage360] = useState(false);

  const [showWebInfo, setShowWebInfo] = useState(false);
  const [showWebParams, setShowWebParams] = useState(false);
  const [showWebSplitInformation, setShowWebSplitInformation] = useState(false);
  const [showWebPointclouds, setShowWebPointclouds] = useState(false);
  const [showWebImage360, setShowWebImage360] = useState(false);

  const [showCirrusInfo, setShowCirrusInfo] = useState(false);
  const [showCirrusParams, setShowCirrusParams] = useState(false);
  const [showCirrusSplitInformation, setShowCirrusSplitInformation] = useState(false);
  const [showCirrusPointclouds, setShowCirrusPointclouds] = useState(false);
  const [showCirrusImage360, setShowCirrusImage360] = useState(false);
  
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
  
    initializeCirrusInputs();
  };
  
  const toggleSectionsSession = () => {
    setShowSessionDetails(!showSessionDetails);
    if (!showSessionDetails) {
      const sessionInfo = sessionInputs[0].session;
    }
  };
  
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setActiveSession('session1');
    if (!isChecked) {
      setIsCheckedSession(false);
      setIsCheckedSession2024(false);
    }
  };
  
  const handleSessionCheckboxChange = () => {
    setIsCheckedSession(!isCheckedSession);
    setActiveSession('session2');
    if (!isCheckedSession) {
      setIsChecked(false);
      setIsCheckedSession2024(false);
    }
  };
  
  const handleSession2024CheckboxChange = () => {
    setIsCheckedSession2024(!isCheckedSession2024);
    setActiveSession('session3');
    if (!isCheckedSession2024) {
      setIsChecked(false);
      setIsCheckedSession(false);
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
    
    <div className="box">
      {!(isVisible || isVissa || isSynlig) && (
        <img src={folder} alt="folder" className="folder" />
        // <img src={Atritec_logga} alt="folder" className="folder" />
      )}
      <div className="bottom-container">

    {/* jag tror att problemet är annotationInputs den gör så att det blandas i inputsen */}
      
      {annotationInfo && (
     <div className="annotation-info">
      <h2>{annotationInfo}</h2> 
       <div className="Bdl-split"> 
        <div className="accordion"> 
         <h3 onClick={() => setShowAnnotationInfo(!showAnnotationInfo)}>Annotation Info</h3>
          {showAnnotationInfo && (
            <div className="accordion-content">
              {annotationInputs.filter(input => input.name.startsWith('annotationInfo.')).map((input, index) => (
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
            </div>
          )}
        </div>
        
        <div className="accordion">
        <h3 onClick={() => setShowParams(!showParams)}>Params</h3>
        {showParams && (
          <div className="accordion-content">
            {annotationInputs.filter(input => input.name.startsWith('params.')).map((input, index) => (
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
            </div>
          )}
          </div>
  
        <div className="accordion">
          <h3 onClick={() => setShowSplitInformation(!showSplitInformation)}>Split Information</h3>
          {showSplitInformation && (
            <div className="accordion-content">
              {annotationInputs.filter(input => input.name.startsWith('split_information.')).map((input, index) => (
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
            </div>
          )}
        </div>

        <div className="accordion">
          <h3 onClick={() => setShowPointclouds(!showPointclouds)}>Pointclouds</h3>
          {showPointclouds && (
            <div className="accordion-content">
              {annotationInputs.filter(input => input.name.startsWith('pointclouds.')).map((input, index) => (
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
            </div>
          )}
        </div>

        <div className="accordion">
          <h3 onClick={() => setShowImage360(!showImage360)}>Image 360</h3>
          {showImage360 && (
            <div className="accordion-content">
              {annotationInputs.filter(input => input.name.startsWith('image_360.')).map((input, index) => (
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
            </div>
          )}
            </div>
            <div className="button-group">
              <button className="button-add" onClick={() => addInput('annotation')}> + </button>
              <button className="button-remove" onClick={() => removeInput('annotation')}> - </button>
              <button className="save-button" onClick={saveToAnnotation}> Save </button>
            </div>
          </div>
        </div>
    )}

      {webInfo && (
          <div className="web-info">
          <h2>{webInfo}</h2>
          <div className="Bdl-split">
            <div className="accordion">
              <h3 onClick={() => setShowWebInfo(!showWebInfo)}>Web360 Info</h3>
              {showWebInfo && (
                <div className="accordion-content">
                  {webInputs.filter(input => input.name.startsWith('webInfo.')).map((input, index) => (
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
                          setShowWebInfo(newInputs);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

              <div className="accordion">
                <h3 onClick={() => setShowWebParams(!showWebParams)}>Params</h3>
                {showWebParams && (
                  <div className="accordion-content">
                    {webInputs.filter(input => input.name.startsWith('params.')).map((input, index) => (
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
                  </div>
                )}
              </div>

              <div className="accordion">
                <h3 onClick={() => setShowWebSplitInformation(!showWebSplitInformation)}>Split Information</h3>
                {showWebSplitInformation && (
                  <div className="accordion-content">
                    {webInputs.filter(input => input.name.startsWith('split_information.')).map((input, index) => (
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
                  </div>
                )}
              </div>

              <div className="accordion">
                <h3 onClick={() => setShowWebPointclouds(!showWebPointclouds)}>Pointclouds</h3>
                {showWebPointclouds && (
                  <div className="accordion-content">
                    {webInputs.filter(input => input.name.startsWith('pointclouds.')).map((input, index) => (
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
                  </div>
                )}
              </div>

              <div className="accordion">
                <h3 onClick={() => setShowWebImage360(!showWebImage360)}>Image 360</h3>
                {showWebImage360 && (
                  <div className="accordion-content">
                    {webInputs.filter(input => input.name.startsWith('image_360.')).map((input, index) => (
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
                  </div>
                )}
              </div>

              <div className="button-group">
                <button className="button-add" onClick={() => addInput('web')}>+</button>
                <button className="button-remove" onClick={() => removeInput('web')}>-</button>
                <button className="save-button" onClick={saveToWeb}>Save</button>
              </div>
            </div>
          </div>
    )}

      {cirrusInfo && (
          <div className="cirrus-info">
          <h2>{cirrusInfo}</h2>
          <div className="Bdl-split">
            <div className="accordion">
              <h3 onClick={() => setShowCirrusInfo(!showCirrusInfo)}>Cirrus Info</h3>
              {showCirrusInfo && (
                <div className="accordion-content">
                  {cirrusInputs.filter(input => input.name.startsWith('cirrusInfo.')).map((input, index) => (
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
                          setShowCirrusInfo(newInputs);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

              <div className="accordion">
                <h3 onClick={() => setShowCirrusParams(!showCirrusParams)}>Params</h3>
                {showCirrusParams && (
                  <div className="accordion-content">
                    {webInputs.filter(input => input.name.startsWith('params.')).map((input, index) => (
                      <div key={index} className="input-container">
                        {input.text && <div className="input-description">{input.text}</div>}
                        <input
                          type={input.type === 'bool' ? 'checkbox' : 'text'}
                          value={input.type === 'bool' ? undefined : input.value || ""}
                          checked={input.type === 'bool' ? Boolean(input.value) : undefined}
                          onChange={(e) => {
                            const updatedInputs = [...cirrusInputs];
                            if (input.type === 'bool') {
                              updatedInputs[index].value = e.target.checked;
                            } else {
                              updatedInputs[index].value = e.target.value;
                            }
                            setCirrusInputs(updatedInputs);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="accordion">
                <h3 onClick={() => setShowCirrusSplitInformation(!showCirrusSplitInformation)}>Split Information</h3>
                {showCirrusSplitInformation && (
                  <div className="accordion-content">
                    {cirrusInputs.filter(input => input.name.startsWith('split_information.')).map((input, index) => (
                      <div key={index} className="input-container">
                        {input.text && <div className="input-description">{input.text}</div>}
                        <input
                          type={input.type === 'bool' ? 'checkbox' : 'text'}
                          value={input.type === 'bool' ? undefined : input.value || ""}
                          checked={input.type === 'bool' ? Boolean(input.value) : undefined}
                          onChange={(e) => {
                            const updatedInputs = [...cirrusInputs];
                            if (input.type === 'bool') {
                              updatedInputs[index].value = e.target.checked;
                            } else {
                              updatedInputs[index].value = e.target.value;
                            }
                            setCirrusInputs(updatedInputs);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="accordion">
                <h3 onClick={() => setShowCirrusPointclouds(!showCirrusPointclouds)}>Pointclouds</h3>
                {showCirrusPointclouds && (
                  <div className="accordion-content">
                    {cirrusInputs.filter(input => input.name.startsWith('pointclouds.')).map((input, index) => (
                      <div key={index} className="input-container">
                        {input.text && <div className="input-description">{input.text}</div>}
                        <input
                          type={input.type === 'bool' ? 'checkbox' : 'text'}
                          value={input.type === 'bool' ? undefined : input.value || ""}
                          checked={input.type === 'bool' ? Boolean(input.value) : undefined}
                          onChange={(e) => {
                            const updatedInputs = [...cirrusInputs];
                            if (input.type === 'bool') {
                              updatedInputs[index].value = e.target.checked;
                            } else {
                              updatedInputs[index].value = e.target.value;
                            }
                            setCirrusInputs(updatedInputs);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="accordion">
                <h3 onClick={() => setShowCirrusImage360(!showCirrusImage360)}>Image 360</h3>
                {showCirrusImage360 && (
                  <div className="accordion-content">
                    {cirrusInputs.filter(input => input.name.startsWith('image_360.')).map((input, index) => (
                      <div key={index} className="input-container">
                        {input.text && <div className="input-description">{input.text}</div>}
                        <input
                          type={input.type === 'bool' ? 'checkbox' : 'text'}
                          value={input.type === 'bool' ? undefined : input.value || ""}
                          checked={input.type === 'bool' ? Boolean(input.value) : undefined}
                          onChange={(e) => {
                            const updatedInputs = [...cirrusInputs];
                            if (input.type === 'bool') {
                              updatedInputs[index].value = e.target.checked;
                            } else {
                              updatedInputs[index].value = e.target.value;
                            }
                            setCirrusInputs(updatedInputs);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="button-group">
                <button className="button-add" onClick={() => addInput('cirrus')}>+</button>
                <button className="button-remove" onClick={() => removeInput('cirrus')}>-</button>
                <button className="save-button" onClick={saveToCirrus}>Save</button>
              </div>
            </div>
          </div>
    )} 
      </div>
    </div> 

        <div className="sidebar-session">
          <div className="session-class">
            <h1 onClick={toggleSectionsSession}>
              {showSessionDetails ? "Session" : "Session"} </h1>
              {showSessionDetails && (
                <div className="session-details">
                  <div className="session-info">
                    <h3 onClick={handleCheckboxChange}
                      className={activeSession === 'session1' ? 'active' : ''}> 2024-05-22_07-35-24</h3>

                    <h3 onClick={handleSessionCheckboxChange}
                      className={activeSession === 'session2' ? 'active' : ''}> 2024-06-22_07-35-25</h3>

                    <h3 onClick={handleSession2024CheckboxChange}
                      className={activeSession === 'session3' ? 'active' : ''}> 2024-07-22_07-35-26</h3>

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
              
           
          <img src={atriteclogo} alt="logga" className="vitlogga" />
          {/* <img src={loggagreen} alt="logga" className="logga"/> */}
        </>
      );
    };

export default Landing;