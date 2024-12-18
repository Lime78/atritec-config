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

  const [annotationInfo, setAnnotationInfo] = useState('');
  const [webInfo, setWebInfo] = useState('');
  const [cirrusInfo, setCirrusInfo] = useState('');

  const [showSessionDetails, setShowSessionDetails] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedSession, setIsCheckedSession] = useState(false);
  const [isCheckedSession2024, setIsCheckedSession2024] = useState(false);
  const [activeSession, setActiveSession] = useState(null);

  const [paramsInputs, setParamsInputs] = useState([]);
  const [splitInformationInputs, setSplitInformationInputs] = useState([]);
  const [pointcloudsInputs, setPointcloudsInputs] = useState([]);
  const [image360Inputs, setImage360Inputs] = useState([]);
  const [accordionOpen, setAccordionOpen] = useState({
    annotationInfo: false,
    params: false,
    splitInformation: false,
    pointclouds: false,
    image360: false,
  });

  const toggleAccordion = (section) => {
    setAccordionOpen((prev) => {
      const newAccordionState = {
        annotationInfo: false,
        params: false,
        splitInformation: false,
        pointclouds: false,
        image360: false,
      };
      newAccordionState[section] = !prev[section];
      return newAccordionState;
    });
  };

  const [webParamsInputs, setWebParamsInputs] = useState([]);
  const [webSplitInformationInputs, setWebSplitInformationInputs] = useState([]);
  const [webPointcloudsInputs, setWebPointcloudsInputs] = useState([]);
  const [webImage360Inputs, setWebImage360Inputs] = useState([]);
  const [webAccordionOpen, setWebAccordionOpen] = useState({
    webInfo: false,
    params: false,
    splitInformation: false,
    pointclouds: false,
    image360: false,
  });

  const toggleWebAccordion = (section) => {
    setWebAccordionOpen((prev) => {
      const newAccordionState = {
        webInfo: false,
        params: false,
        splitInformation: false,
        pointclouds: false,
        image360: false,
      };
      newAccordionState[section] = !prev[section];
      return newAccordionState;
    });
  };

  const [cirrusParamsInputs, setCirrusParamsInputs] = useState([]);
  const [cirrusSplitInformationInputs, setCirrusSplitInformationInputs] = useState([]);
  const [cirrusPointcloudsInputs, setCirrusPointcloudsInputs] = useState([]);
  const [cirrusImage360Inputs, setCirrusImage360Inputs] = useState([]);
  const [cirrusAccordionOpen, setCirrusAccordionOpen] = useState({
    cirrusInfo: false,
    params: false,
    splitInformation: false,
    pointclouds: false,
    image360: false,
  });

  const toggleCirrusAccordion = (section) => {
    setCirrusAccordionOpen((prev) => {
      const newAccordionState = {
        cirrusInfo: false,
        params: false,
        splitInformation: false,
        pointclouds: false,
        image360: false,
    };
    newAccordionState[section] = !prev[section];
    return newAccordionState;
    });
  };

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

    setAnnotationInputs(annotationInfo);
    setParamsInputs(annotationParamsData);
    setSplitInformationInputs(splitInformationData);
    setPointcloudsInputs(pointcloudsData);
    setImage360Inputs(image360ParamsData.concat(imageProjectionData));
  };

  useEffect(() => {
    if (!trackData) {
      initializeAnnotationInputs();
    }
  }, [trackData]);
  
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

    setWebInputs(webInfo);
    setWebParamsInputs(webParamsData);
    setWebSplitInformationInputs(splitInformationData);
    setWebPointcloudsInputs(pointcloudPackagesData);
    setWebImage360Inputs(image360ParamsData.concat(imageProjectionData));
  };

  useEffect(() => {
    if (!trackData) {
      initializeWebInputs();
    }
  }, [trackData]);


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
  
    setCirrusInputs(cirrusInfo);
    setCirrusParamsInputs(paramsData);
    setCirrusSplitInformationInputs(splitInformationData);
    setCirrusPointcloudsInputs(pointcloudsData);
    setCirrusImage360Inputs(image360ParamsData.concat(imageProjectionData));
  };
  
  useEffect(() => {
    if (!trackData) {
      initializeCirrusInputs();
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
    const reduceInputs = (inputs) => {
      return inputs.reduce((acc, input) => {
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
    };
  
    const annotationData = {
      ...reduceInputs(annotationInputs),
      params: reduceInputs(paramsInputs),
      split_information: reduceInputs(splitInformationInputs),
      pointclouds: reduceInputs(pointcloudsInputs),
      image_360: reduceInputs(image360Inputs),
    };
  
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
    const reduceInputs = (inputs) => {
      return inputs.reduce((acc, input) => {
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
    };

    const webData = {
      ...reduceInputs(webInputs),
      params: reduceInputs(webParamsInputs),
      split_information: reduceInputs(webSplitInformationInputs),
      pointclouds: reduceInputs(webPointcloudsInputs),
      image_360: reduceInputs(webImage360Inputs),
    };

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
    const reduceInputs = (inputs) => {
      return inputs.reduce((acc, input) => {
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
    };

    const cirrusData = {
      ...reduceInputs(cirrusInputs),
      params: reduceInputs(cirrusParamsInputs),
      split_information: reduceInputs(cirrusSplitInformationInputs),
      pointclouds: reduceInputs(cirrusPointcloudsInputs),
      image_360: reduceInputs(cirrusImage360Inputs),
    };

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
    if (activeSession === 'session1') {
      setIsChecked(false);
      setActiveSession('');
    } else {
      setIsChecked(true);
      setActiveSession('session1');
      setIsCheckedSession(false);
      setIsCheckedSession2024(false);
    }
  };
  
  const handleSessionCheckboxChange = () => {
    if (activeSession === 'session2') {
      setIsCheckedSession(false);
      setActiveSession('');
    } else {
      setIsCheckedSession(true);
      setActiveSession('session2');
      setIsChecked(false);
      setIsCheckedSession2024(false);
    }
  };
  
  const handleSession2024CheckboxChange = () => {
    if (activeSession === 'session3') {
      setIsCheckedSession2024(false);
      setActiveSession('');
    } else {
      setIsCheckedSession2024(true);
      setActiveSession('session3');
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
      
    <div className="bottom-container">
    <div className="box">
      {!(isVisible || isVissa || isSynlig) && (
        <img src={folder} alt="folder" className="folder" />
        // <img src={Atritec_logga} alt="folder" className="folder" />
      )}
     <div className='accordion-container'>

        {annotationInfo && (
          <div className="Bdl-split">
          <div className="accordion">
            <div className="accordion-section">
              <h3 onClick={() => toggleAccordion('annotationInfo')}>Annotation Info</h3>
              {accordionOpen.annotationInfo && (
                <div className="accordion-content">
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
                </div>
              )}
            </div>
            
            <div className="accordion-section">
              <h3 onClick={() => toggleAccordion('params')}>Params</h3>
              {accordionOpen.params && (
                <div className="accordion-content">
                  {paramsInputs.map((input, index) => (
                    <div key={index} className="input-container">
                      {input.text && <div className="input-description">{input.text}</div>}
                      <input
                        type={input.type === 'bool' ? 'checkbox' : 'text'}
                        value={input.type === 'bool' ? undefined : input.value || ""}
                        checked={input.type === 'bool' ? Boolean(input.value) : undefined}
                        onChange={(e) => {
                          const newInputs = [...paramsInputs];
                          if (input.type === 'bool') {
                            newInputs[index].value = e.target.checked;
                          } else {
                            newInputs[index].value = e.target.value;
                          }
                          setParamsInputs(newInputs);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="accordion-section">
              <h3 onClick={() => toggleAccordion('splitInformation')}>Split Information</h3>
              {accordionOpen.splitInformation && (
                <div className="accordion-content">
                  {splitInformationInputs.map((input, index) => (
                    <div key={index} className="input-container">
                      {input.text && <div className="input-description">{input.text}</div>}
                      <input
                        type={input.type === 'bool' ? 'checkbox' : 'text'}
                        value={input.type === 'bool' ? undefined : input.value || ""}
                        checked={input.type === 'bool' ? Boolean(input.value) : undefined}
                        onChange={(e) => {
                          const newInputs = [...splitInformationInputs];
                          if (input.type === 'bool') {
                            newInputs[index].value = e.target.checked;
                          } else {
                            newInputs[index].value = e.target.value;
                          }
                          setSplitInformationInputs(newInputs);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="accordion-section">
              <h3 onClick={() => toggleAccordion('pointclouds')}>Pointclouds</h3>
              {accordionOpen.pointclouds && (
                <div className="accordion-content">
                  {pointcloudsInputs.map((input, index) => (
                    <div key={index} className="input-container">
                      {input.text && <div className="input-description">{input.text}</div>}
                      <input
                        type={input.type === 'bool' ? 'checkbox' : 'text'}
                        value={input.type === 'bool' ? undefined : input.value || ""}
                        checked={input.type === 'bool' ? Boolean(input.value) : undefined}
                        onChange={(e) => {
                          const newInputs = [...pointcloudsInputs];
                          if (input.type === 'bool') {
                            newInputs[index].value = e.target.checked;
                          } else {
                            newInputs[index].value = e.target.value;
                          }
                          setPointcloudsInputs(newInputs);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="accordion-section">
              <h3 onClick={() => toggleAccordion('image360')}>Image 360</h3>
              {accordionOpen.image360 && (
                <div className="accordion-content">
                  {image360Inputs.map((input, index) => (
                    <div key={index} className="input-container">
                      {input.text && <div className="input-description">{input.text}</div>}
                      <input
                        type={input.type === 'bool' ? 'checkbox' : 'text'}
                        value={input.type === 'bool' ? undefined : input.value || ""}
                        checked={input.type === 'bool' ? Boolean(input.value) : undefined}
                        onChange={(e) => {
                          const newInputs = [...image360Inputs];
                          if (input.type === 'bool') {
                            newInputs[index].value = e.target.checked;
                          } else {
                            newInputs[index].value = e.target.value;
                          }
                          setImage360Inputs(newInputs);
                        }}
                        />
                      </div>
                    ))}
                    <div className="button-group">
              <button className="button-add" onClick={() => addInput('annotation')}>+</button>
              <button className="button-remove" onClick={() => removeInput('annotation')}>-</button>
              <button className="save-button" onClick={saveToAnnotation}>Save</button>
            </div>
          </div>
                )}
              </div>
            </div>
            </div>
          )}

        {webInfo && (
        <div className="Bdl-split">
          <div className="accordion">
            <div className="webaccordion-section">
              <h3 onClick={() => toggleWebAccordion('webInfo')}>Web Info</h3>
              {webAccordionOpen.webInfo && (
                <div className="accordion-content">
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
                </div>
              )}
            </div>
            <div className="webaccordion-section">
              <h3 onClick={() => toggleWebAccordion('params')}>Params</h3>
              {webAccordionOpen.params && (
                <div className="accordion-content">
                  {webParamsInputs.map((input, index) => (
                    <div key={index} className="input-container">
                      {input.text && <div className="input-description">{input.text}</div>}
                      <input
                        type={input.type === 'bool' ? 'checkbox' : 'text'}
                        value={input.type === 'bool' ? undefined : input.value || ""}
                        checked={input.type === 'bool' ? Boolean(input.value) : undefined}
                        onChange={(e) => {
                          const updatedInputs = [...webParamsInputs];
                          if (input.type === 'bool') {
                            updatedInputs[index].value = e.target.checked;
                          } else {
                            updatedInputs[index].value = e.target.value;
                          }
                          setWebParamsInputs(updatedInputs);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="webaccordion-section">
              <h3 onClick={() => toggleWebAccordion('splitInformation')}>Split Information</h3>
              {webAccordionOpen.splitInformation && (
                <div className="accordion-content">
                  {webSplitInformationInputs.map((input, index) => (
                    <div key={index} className="input-container">
                      {input.text && <div className="input-description">{input.text}</div>}
                      <input
                        type={input.type === 'bool' ? 'checkbox' : 'text'}
                        value={input.type === 'bool' ? undefined : input.value || ""}
                        checked={input.type === 'bool' ? Boolean(input.value) : undefined}
                        onChange={(e) => {
                          const updatedInputs = [...webSplitInformationInputs];
                          if (input.type === 'bool') {
                            updatedInputs[index].value = e.target.checked;
                          } else {
                            updatedInputs[index].value = e.target.value;
                          }
                          setWebSplitInformationInputs(updatedInputs);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="webaccordion-section">
              <h3 onClick={() => toggleWebAccordion('pointclouds')}>Pointclouds</h3>
              {webAccordionOpen.pointclouds && (
                <div className="accordion-content">
                  {webPointcloudsInputs.map((input, index) => (
                    <div key={index} className="input-container">
                      {input.text && <div className="input-description">{input.text}</div>}
                      <input
                        type={input.type === 'bool' ? 'checkbox' : 'text'}
                        value={input.type === 'bool' ? undefined : input.value || ""}
                        checked={input.type === 'bool' ? Boolean(input.value) : undefined}
                        onChange={(e) => {
                          const updatedInputs = [...webPointcloudsInputs];
                          if (input.type === 'bool') {
                            updatedInputs[index].value = e.target.checked;
                          } else {
                            updatedInputs[index].value = e.target.value;
                          }
                          setWebPointcloudsInputs(updatedInputs);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="webaccordion-section">
              <h3 onClick={() => toggleWebAccordion('image360')}>Image 360</h3>
              {webAccordionOpen.image360 && (
                <div className="accordion-content">
                  {webImage360Inputs.map((input, index) => (
                    <div key={index} className="input-container">
                      {input.text && <div className="input-description">{input.text}</div>}
                      <input
                        type={input.type === 'bool' ? 'checkbox' : 'text'}
                        value={input.type === 'bool' ? undefined : input.value || ""}
                        checked={input.type === 'bool' ? Boolean(input.value) : undefined}
                        onChange={(e) => {
                          const updatedInputs = [...webImage360Inputs];
                          if (input.type === 'bool') {
                            updatedInputs[index].value = e.target.checked;
                          } else {
                            updatedInputs[index].value = e.target.value;
                          }
                          setWebImage360Inputs(updatedInputs);
                        }}
                      />
                    </div>
                  ))}
                <div className="button-group">
              <button className="button-add" onClick={() => addInput('web360')}>+</button>
              <button className="button-remove" onClick={() => removeInput('web360')}>-</button>
              <button className="save-button" onClick={saveToWeb}>Save</button>
            </div>
          </div>
                )}
              </div>
            </div>
            </div>
          )}

        {cirrusInfo && (
          <div className="Bdl-split">
          <div className="accordion">
            <div className="cirrusaccordion-section">
              <h3 onClick={() => toggleCirrusAccordion('cirrusInfo')}>Cirrus Info</h3>
              {cirrusAccordionOpen.cirrusInfo && (
                <div className="accordion-content">
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
                </div>
              )}
            </div>
            <div className="cirrusaccordion-section">
              <h3 onClick={() => toggleCirrusAccordion('params')}>Params</h3>
              {cirrusAccordionOpen.params && (
                <div className="accordion-content">
                  {cirrusParamsInputs.map((input, index) => (
                    <div key={index} className="input-container">
                      {input.text && <div className="input-description">{input.text}</div>}
                      <input
                        type={input.type === 'bool' ? 'checkbox' : 'text'}
                        value={input.type === 'bool' ? undefined : input.value || ""}
                        checked={input.type === 'bool' ? Boolean(input.value) : undefined}
                        onChange={(e) => {
                          const newInputs = [...cirrusParamsInputs];
                          if (input.type === 'bool') {
                            newInputs[index].value = e.target.checked;
                          } else {
                            newInputs[index].value = e.target.value;
                          }
                          setCirrusParamsInputs(newInputs);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="cirrusaccordion-section">
              <h3 onClick={() => toggleCirrusAccordion('splitInformation')}>Split Information</h3>
              {cirrusAccordionOpen.splitInformation && (
                <div className="accordion-content">
                  {cirrusSplitInformationInputs.map((input, index) => (
                    <div key={index} className="input-container">
                      {input.text && <div className="input-description">{input.text}</div>}
                      <input
                        type={input.type === 'bool' ? 'checkbox' : 'text'}
                        value={input.type === 'bool' ? undefined : input.value || ""}
                        checked={input.type === 'bool' ? Boolean(input.value) : undefined}
                        onChange={(e) => {
                          const newInputs = [...cirrusSplitInformationInputs];
                          if (input.type === 'bool') {
                            newInputs[index].value = e.target.checked;
                          } else {
                            newInputs[index].value = e.target.value;
                          }
                          setCirrusSplitInformationInputs(newInputs);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="cirrusaccordion-section">
              <h3 onClick={() => toggleCirrusAccordion('pointclouds')}>Pointclouds</h3>
              {cirrusAccordionOpen.pointclouds && (
                <div className="accordion-content">
                  {cirrusPointcloudsInputs.map((input, index) => (
                    <div key={index} className="input-container">
                      {input.text && <div className="input-description">{input.text}</div>}
                      <input
                        type={input.type === 'bool' ? 'checkbox' : 'text'}
                        value={input.type === 'bool' ? undefined : input.value || ""}
                        checked={input.type === 'bool' ? Boolean(input.value) : undefined}
                        onChange={(e) => {
                          const newInputs = [...cirrusPointcloudsInputs];
                          if (input.type === 'bool') {
                            newInputs[index].value = e.target.checked;
                          } else {
                            newInputs[index].value = e.target.value;
                          }
                          setCirrusPointcloudsInputs(newInputs);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="cirrusaccordion-section">
              <h3 onClick={() => toggleCirrusAccordion('image360')}>Image 360</h3>
              {cirrusAccordionOpen.image360 && (
                <div className="accordion-content">
                  {cirrusImage360Inputs.map((input, index) => (
                    <div key={index} className="input-container">
                      {input.text && <div className="input-description">{input.text}</div>}
                      <input
                        type={input.type === 'bool' ? 'checkbox' : 'text'}
                        value={input.type === 'bool' ? undefined : input.value || ""}
                        checked={input.type === 'bool' ? Boolean(input.value) : undefined}
                        onChange={(e) => {
                          const newInputs = [...cirrusImage360Inputs];
                          if (input.type === 'bool') {
                            newInputs[index].value = e.target.checked;
                          } else {
                            newInputs[index].value = e.target.value;
                          }
                          setCirrusImage360Inputs(newInputs);
                        }}
                      />
                    </div>
                  ))};
                <div className="button-group">
              <button className="button-add" onClick={() => addInput('cirrus')}>+</button>
              <button className="button-remove" onClick={() => removeInput('cirrus')}>-</button>
              <button className="save-button" onClick={saveToCirrus}>Save</button>
            </div>
          </div>
                )}
              </div>
            </div>
            </div>
          )}
        </div>
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