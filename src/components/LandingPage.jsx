import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import loggavit from '../assets/loggavit.png';
import loggaover from '../assets/loggaover.png';
import loggagreen from '../assets/loggagreen.png';
import api from '../data/api.json';
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


    // const annotationParagrams = [
    //   { name: 'Ins_freq', type: 'Float', default: 200, desc: "A7 INS Frequency" },
    //   { name: 'Path_nas', type: 'String', default: "//192.168.1.6/Moblie_mapping", desc: "Path to NAS / Mobile_mapping drive" },
    //   { name: 'epsg_process', type: 'Float', default: 5845, desc: "EPSG Code for processing pointcloud data ( pointcloud is exported in this CRS )" },
    //   { name: 'move_to_nas', type: 'bool', default: true, desc: "Move data to NAS" },
    //   { name: 'clip_input_data', type: 'list', desc: "information for clipping input data. List of [start_time, end_time].", default: [] },
    // ]
    // const webParagrams = [

    // ]
    // const cirrusParagrams = [
    //   { name: 'Ins_freq', type: 'Float', default: 200, desc: "A7 INS Frequency" },
    //   { name: 'Path_nas', type: 'String', default: "//192.168.1.6/Mobileye", desc: "Path to NAS / Mobile_mapping drive" },
    //   { name: 'move_to_nas', type: 'Bool', default: 5845, desc: "EPSG Code for processing pointcloud data ( pointcloud is exported in this CRS )" },
    //   { name: 'clip_input_data', type: 'list', desc:"information for clipping input data. List of [start_time, end_time]." ,default: []},
    //   { name: ' generate', desc: "Riegl project Generation options"},
    //   { name: 'colorize_scan', type: 'Bool', default: false, desc: "Colorize scan data" },
    //   { name: 'export_fast_annotation', type: 'bool', default: false, desc: "Colorize scan data" },
    //   { name: 'basic', desc: "Basic operations for all projects"},
    //   { name: 'merge_scanners', type: 'bool', default: false, desc: "Merge left and right scanner" },
    //   { name: 'slow_speed_filter', desc: "Slow speed filter" },
    //   { name: 'slow_vsz', type: 'float', default: 0.01, desc: "Voxel Downsample value in meters for slow speed filter" },
    //   { name: 'slow_thres_speed', type: 'float', default: 5.0, package: 'slow_speed_filter', desc: "A7 INS Frequency" },
    //   { name: 'point_density', desc: "Density Requirements"},
    //   { name: 'step_len_gen_polygons', type: 'float', default: 2.0, desc: "Length of polygons in meters. Used in computing density."},
    //   { name: 'step_len_gen_frames', type: 'float', default: 0.1, desc: "Length of frames in meters. Used in computing density."},
    //   { name: 'min_density', type: 'Float', default: 3000, desc: "Minimum value of density within a polygon"},
    //   { name: 'max_density', type: 'Float', default: 5000, desc: "Maximum value of density within a polygon"},
    //   { name: 'min_density', type: 'float', default: 3000, desc: "Minimum Valid Density within a polygon."},
    //   { name: 'max_density', type: 'float', default: 5000, desc: "Maximum Valid Density within a polygon."},
    //   { name: 'downsample_vsz',type: 'float',default: 0.01,desc: "The voxel size in meters for downsampling high density polygons."},
    //   { name: 'compute_density_post',type: 'bool', default: false, desc: "Compute the density after downsampling."},
    //   { name: 'delivery',desc: "Setup Delivery Folders"},
    //   { name: 'grid_size',type: 'int',default: 1000,desc: "Output grid size in meters. 1000 Results in 1km x 1km. 10_000 results in 100m x 100m."},
    //   { name: 'group',type: 'int',default: 0,desc: "Group number for delivery folders."},
    //   { name: 'lop',type: 'int',default: 1,desc: "Leverans number for delivery folders."},
    //   { name: 'op_time_format',type: 'string',default: "stdtime_adjust",choices: 'stdtime_adjust stdtime weeksecs',desc: "Output Time format."},
    //   { name: 'epsg_output',type: 'float',default: 5845,desc: "EPSG Code for delivering pointcloud data."},
    //   { name: 'quality_control'},
    //   { name: 'sample_laz_grid_step',type: 'int',default: 10000,desc: "Sample length in meters for selecting pointclouds for NH-Data height control. 10_000 meters means every 10km."},
    //   { name: 'nhdata_height_threshold',type: 'float',default: 0.1,desc: "Maximum allowed threshold for a NH-Data height control."},
    // ]


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

  const addInput = (section) => {
    if (section === 'annotation') {
      setAnnotationInputs([...annotationInputs, { value: '', placeholder: '' }]);
    } 
    else if (section === 'web') {
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
      <div className="template-container">
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

      <div className="bottom-container">
    <div className="box">
      <h2>Activity:</h2>

    {annotationInfo && (
      <div className="annotation-info">
        <h2>{annotationInfo}</h2>
        <div className="Bdl-split">
          {annotationInputs.map((input, index) => (
            <input  key={index}  type="text"  value={input.value}  placeholder={input.placeholder}  onChange={(e) => {
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
            <button className="save-button" onClick={saveToAnnotation}>Save</button>
          <NavLink to="/advance" className="Advance-button">Advance</NavLink>
        </div>
      </div>
    )}

    {webInfo && (
      <div className="web-info">
        <h2>{webInfo}</h2>
        <div className="Bdl-split">
          {webInputs.map((input, index) => (
            <input  key={index}  type="text"  value={input.value}  placeholder={input.placeholder}  onChange={(e) => {
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
          <button className="save-button" onClick={saveToWeb}>Save</button>
          <NavLink to="/advanceWeb" className="AdvanceWeb-button">Advance</NavLink>
        </div>
      </div>
     )}

    {cirrusInfo && (
      <div className="cirrus-info">
        <h2>{cirrusInfo}</h2>
        <div className="Bdl-split">
          {cirrusInputs.map((input, index) => (
            <input  key={index}  type="text"  value={input.value}  placeholder={input.placeholder}  onChange={(e) => {
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
          <button className="save-button" onClick={saveToCirrus}>Save</button>
          <NavLink to="/advanceCirrus" className="AdvanceCirrus-button">Advance</NavLink>
          </div>
        </div>
      )}
    </div>

    <div className="sidebar-session">
      <div className="session-class">
        <h1> Session</h1>        
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
