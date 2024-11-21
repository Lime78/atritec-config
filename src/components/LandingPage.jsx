import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
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
      return; 
    }

    const generateInputs = (trackData) => {
      const inputs = [];

      Object.keys(trackData).forEach((track) => {
        Object.keys(trackData[track]).forEach((segment) => {
          const segmentData = trackData[track][segment];
          const timeRanges = segmentData.time_ranges;

          timeRanges.forEach(([from, to], index) => {
            inputs.push(
              { value: '', placeholder: `Track (${track})` },
              { value: '', placeholder: 'Place_from' },
              { value: '', placeholder: 'Place_to' },
              { value: '', placeholder: `Time_ranges_from: ${from}` },
              { value: '', placeholder: `Time_ranges_to: ${to}` }
            );
          });
        });
      });

      return inputs;
    };

    setAnnotationInputs(generateInputs(trackData));
    setWebInputs(generateInputs(trackData));
    setCirrusInputs(generateInputs(trackData));
  }, [trackData]);

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

  const saveToAnnotation = () => {
    const data = {
      annotationInputs,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });

    saveAs(blob, 'data.json');
  };

  const saveToCirrus = () => {
    const data = {
      cirrusInputs
      
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });

    saveAs(blob, 'data.json');
  };

  const saveToWeb = () => {
    const data = {
      webInputs
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });

    saveAs(blob, 'data.json');
  };

  return (
    <>
      <div className="template-container"></div>

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
          <button className="save-button" onClick={saveToAnnotation}> Save </button>
          <NavLink to="/advance" className="Advance-button"> Advance </NavLink>
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
          <button className="save-button" onClick={saveToWeb}> Save </button>
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
          <button className="save-button" onClick={saveToCirrus}> Save </button>
          <NavLink to="/advanceCirrus" className="AdvanceCirrus-button"> Advance </NavLink>
        </div>
      </div>
    )}
  </div>
   
    <div className="sidebar-session">
      <div className="session-class">
        <h1>Session</h1>
        <div className="Annotation">
          <h2 onClick={toggleSectionsVisibility}>
            {isVisible ? 'Annotation' : 'Annotation'}
          </h2>
        </div>
        <div className="Web360">
          <h2 onClick={toggleSectionsVissa}>
            {isVissa ? 'Web360' : 'Web360'}
          </h2>
        </div>
        <div className="Cirrus">
          <h2 onClick={toggleSectionsSynlig}>
            {isSynlig ? 'Cirrus' : 'Cirrus'}
          </h2>
        </div>
      </div>
    </div>
    
    
    <img src={loggagreen} alt="logga" className="logga" />
    {/* <img src={loggaover} alt="logga" className="logo" /> */}
  {/* <img src={loggavit} alt="vitlogga" className="vitlogga" /> */}
</div>

    </>
  );
};

export default Landing;
