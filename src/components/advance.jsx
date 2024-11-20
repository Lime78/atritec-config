import React, { useState } from 'react';
import pattern from '../assets/pattern.png';
import './advance.css';

const App = () => {
  const [checkboxes, setCheckboxes] = useState({
    distance: null, 
    blurring: null, 
    stitchingRadius: null,
    cameraStitching: null, 
    export360: null,
    exportCameraImages: null,
    colorize: null, 
  });

    const [inputs, setInputs] = useState(['']);

    const addInput = () => {
      setInputs([...inputs, '']);
    };

    const removeInput = () => {
      setInputs(inputs.slice(0, inputs.length - 1));
    };

    const [isSynlig, setIssynlig] = useState(false);

    const toggleCirrusVisibility = () => {
      setIssynlig(!isSynlig);    
    };

    const [isVisa, setIsVisa] = useState(false);

    const toggleWebVisibility = () => {
      setIsVisa(!isVisa);    
    };

    const [isVisible, setIsVisible] = useState(false);

    const toggleSectionsVisibility = () => {
      setIsVisible(!isVisible);
    };

    const handleRadioChange = (section, value) => {
      setCheckboxes(prevState => ({
        ...prevState,
        [section]: value,
      }));
    };

  return (
    <div className="App">
      {/* <div className="section-search">
        <input type="text" placeholder="Search" />
      </div> */}
     {/* <img src={loggagreen} alt="Logo" className="logo" /> */}
      {/* <img src={pattern} alt="Pattern" className="pattern" /> 

      <div className='sidebar'> 

      <div className="section-annalering">
        <h2 onClick={toggleSectionsVisibility}>
        {isVisible ? 'Annotation' : 'Annotation'}</h2>
      </div>

        {isVisible && (
          <div className='annalering-info'>
            <div className="radio-group">
              <label>
                Session / Scan Session: raw data 
              </label>
              <input type="text" placeholder="Session / Scan Session: raw data" />

              <label>
                Pipeline/ Templates: Web360, Cirrus, Road scan, Optio/ Annotation
              </label>
              <input type="text" placeholder="Pipeline/ Templates" />

              <label>
                Delivery Folders: whatever it means for every pipeline 
              </label>
              <input type="text" placeholder="Delivery Folders" />
            </div>

            <div className="radio-group">
              <label>
                Input Data Verification
              </label>
              <input type="text" placeholder="TBD" />
            </div>

            <div className="radio-group">
              <label>
                Configurable parameters for processing
              </label>
              <p>Common: 1 project = 1 Configuration = List Time Range of Multiple = 1 Output folder </p>
              <input type="text" placeholder="Configurable parameters for processing" />
            </div>

            <div className="radio-group">
              <h3>Blurring Objects</h3>
              <label>
                Yes
                <input
                  type="radio"
                  name="blurring"
                  checked={checkboxes.blurring === 'Yes'}
                  onChange={() => handleRadioChange('blurring', 'Yes')}
                />
              </label>
              <label>
                No
                <input
                  type="radio"
                  name="blurring"
                  checked={checkboxes.blurring === 'No'}
                  onChange={() => handleRadioChange('blurring', 'No')}
                />
              </label>
              <input type="text" placeholder="Car, People" />
              <input type="text" placeholder="TBD" />
          
            </div>

            <div className="radio-group">
              <h3>Stitching radius</h3>
              <label> 2
                <input
                  type="radio"
                  name="stitchingRadius"
                  checked={checkboxes.stitchingRadius === 2}
                  onChange={() => handleRadioChange('stitchingRadius', 2)}
                />
              </label>
              <label>
                5
                <input
                  type="radio"
                  name="stitchingRadius"
                  checked={checkboxes.stitchingRadius === 5}
                  onChange={() => handleRadioChange('stitchingRadius', 5)}
                />
              </label>
              <label>
                20
                <input
                  type="radio"
                  name="stitchingRadius"
                  checked={checkboxes.stitchingRadius === 20}
                  onChange={() => handleRadioChange('stitchingRadius', 20)}
                />
              </label>
              <label>
                100
                <input
                  type="radio"
                  name="stitchingRadius"
                  checked={checkboxes.stitchingRadius === 100}
                  onChange={() => handleRadioChange('stitchingRadius', 100)}
                />
              </label>
            </div>

            <div className="radio-group">
              <h3>Merging of left and right scanners</h3>
              <label>
                Default Yes
                <input
                  type="radio"
                  name="merging"
                  checked={checkboxes.Filtering === 'Yes'}
                  onChange={() => handleRadioChange('merging', 'Yes')}
                />
              </label>
            </div>
            <div className="radio-group">
            <h3>Export camera-level images for formula annotation</h3>
            <label>
              Camera ID (0-5)
              <input
                type="radio"
                name="exportCameraImages"
                checked={checkboxes.exportCameraImages === 'Camera ID'}
                onChange={() => handleRadioChange('exportCameraImages', 'Camera ID')}
              />
            </label>
            <label>
              Rotation for the image of the camera
              <input
                type="radio"
                name="exportCameraImages"
                checked={checkboxes.exportCameraImages === 'Rotation'}
                onChange={() => handleRadioChange('exportCameraImages', 'Rotation')}
              />
            </label>
            <label>
              Which camera: back/front/both
              <input
                type="radio"
                name="exportCameraImages"
                checked={checkboxes.exportCameraImages === 'Which camera'}
                onChange={() => handleRadioChange('exportCameraImages', 'Which camera')}
              />
            </label>
          </div>
          <div className="radio-group">
            <h3>Image resolution for output</h3>
            <label>Width x Height</label>
            <input type="text" placeholder="Width x Height" />
          </div>
          </div>
        )}
      {/* </div> */}

      {/* <div className="section-cirrus">
      <h2 onClick={toggleCirrusVisibility}>
      {isSynlig ? 'Cirrus' : 'Cirrus'} </h2>

      {isSynlig && (
        <div className='cirrus-info'>
          <div className="radio-group">
            <h3>Trigger distance between images for output</h3>
            <label>
              5 meter
              <input
                type="radio"
                name="distance"
                checked={checkboxes.distance === 5}
                onChange={() => handleRadioChange('distance', 5)}
              />
            </label>
            <label>
              10 meter
              <input
                type="radio"
                name="distance"
                checked={checkboxes.distance === 10}
                onChange={() => handleRadioChange('distance', 10)}
              />
            </label>
          </div>

          <div className="radio-group">
            <h3>Which cameras to stitch</h3>
            <label>
              Front
              <input
                type="radio"
                name="cameraStitching"
                checked={checkboxes.cameraStitching === 'Front'}
                onChange={() => handleRadioChange('cameraStitching', 'Front')}
              />
            </label>
            <label>
              Back
              <input
                type="radio"
                name="cameraStitching"
                checked={checkboxes.cameraStitching === 'Back'}
                onChange={() => handleRadioChange('cameraStitching', 'Back')}
              />
            </label>
            <label>
              Both Cameras
              <input
                type="radio"
                name="cameraStitching"
                checked={checkboxes.cameraStitching === 'Both'}
                onChange={() => handleRadioChange('cameraStitching', 'Both')}
              />
            </label>
          </div>

          <div className="radio-group">
            <h3>Export 360 images/panoramas</h3>
            <label>
              Yes
              <input
                type="radio"
                name="export360"
                checked={checkboxes.export360 === 'Yes'}
                onChange={() => handleRadioChange('export360', 'Yes')}
              />
            </label>
            <label>
              No
              <input
                type="radio"
                name="export360"
                checked={checkboxes.export360 === 'No'}
                onChange={() => handleRadioChange('export360', 'No')}
              />
            </label>
          </div>

          <div className="radio-group">
            <h3>Output Directory</h3>
            <label>Project- output directory mapping
              <input
                type="radio"
                name="outputDirectory"
                checked={checkboxes.outputDirectory === 'Project- output directory mapping'}
                onChange={() => handleRadioChange('outputDirectory', 'Project- output directory mapping')}
              />
            </label>
            <label>
              Move to NAS
              <input
                type="radio"
                name="outputDirectory"
                checked={checkboxes.outputDirectory === 'Move to NAS'}
                onChange={() => handleRadioChange('outputDirectory', 'Move to NAS')}
              />
            </label>
          </div>

          <div className="radio-group">
            <h3>CRS Output image list</h3>
            <label>
              Format of Image List
            </label>
            <input type="text" placeholder="Format of image list" />
          </div>

          <div className="radio-group">
            <h3>Export forward-facing camera</h3>
            <label>
              Image frequency
            </label>
            <input type="text" placeholder="Image frequency" />

            <label>
              Image dimensions
            </label>
            <input type="text" placeholder="Image dimensions" />

            <label>Rotation for the images</label>
            <label>
              Image List
              <input
                type="radio"
                name="crsOutputImageList"
                checked={checkboxes.crsOutputImageList === 'Image list'}
                onChange={() => handleRadioChange('crsOutputImageList', 'Image list')}
              />
            </label>

            <label>
              Output folder
              <input
                type="radio"
                name="crsOutputImageList"
                checked={checkboxes.crsOutputImageList === 'Output folder'}
                onChange={() => handleRadioChange('crsOutputImageList', 'Output folder')}
              />
            </label>

            <label>
              Naming
              <input
                type="radio"
                name="crsOutputImageList"
                checked={checkboxes.crsOutputImageList === 'Naming'}
                onChange={() => handleRadioChange('crsOutputImageList', 'Naming')}
              />
            </label>
          </div>

          <div className="radio-group">
            <h3>Image Projection</h3>
            <label>
              Equirectangular / 360 Panorama / 3d Camera
              <input
                type="radio"
                name="imageProjection"
                checked={checkboxes.imageProjection === 'Rectilinear / flat / 2d camera'}
                onChange={() => handleRadioChange('imageProjection', 'Rectilinear / flat / 2d camera')}
              />
            </label>

            <label>
              Rectilinear / Flat / 2d Camera
              <input
                type="radio"
                name="imageProjection"
                checked={checkboxes.imageProjection === 'Rectilinear / flat / 2d camera'}
                onChange={() => handleRadioChange('imageProjection', 'Rectilinear / flat / 2d camera')}
              />
            </label>

            <label>
              Cube maps / 360 Panorama / 3d Camera
              <input
                type="radio"
                name="imageProjection"
                checked={checkboxes.imageProjection === 'cube maps / 360 panorama / 3d camera'}
                onChange={() => handleRadioChange('imageProjection', 'cube maps / 360 panorama / 3d camera')}
              />
            </label>
          </div>
        </div>
      )}
    </div>


     <div className="section-web360">
        <h2 onClick={toggleWebVisibility}>
        {isVisa ? 'Web360' : 'Web360'} </h2>

      {isVisa && (
        <div className='web-info'>
        <div className="radio-group">
          <h3>Colorize</h3>
          <label>
            Yes
            <input
              type="radio"
              name="colorize"
              checked={checkboxes.colorize === 'Yes'}
              onChange={() => handleRadioChange('colorize', 'Yes')}
            />
          </label>
          <label>
            No
            <input
              type="radio"
              name="colorize"
              checked={checkboxes.colorize === 'No'}
              onChange={() => handleRadioChange('colorize', 'No')}
            />
          </label>
        </div>

        <div className="radio-group">
          <h3>CRS Output</h3>
          <input type="text" placeholder="List of outputs" />
        </div>

        <div className="radio-group">
          <h3>Output attributes </h3>
          <input type="text" placeholder="Intensity" />
        </div>
      
      <div className="radio-group">
        <h3>Speed filtering</h3>
        <label>
          Default Yes
        <input 
          type="radio"
          name="Filtering"
          checked={checkboxes.Filtering === 'Yes'}
          onChange={() => handleRadioChange('Filtering', 'Yes')}
        />
        </label>
      </div>

      <div className="radio-group">
        <h3>Classification</h3>
        <label>
          Yes
        <input 
        type="radio"
        name="Yes"
        checked={checkboxes.Yes === 'Yes'}
        onChange={() => handleRadioChange('Yes', 'Yes')}
        />
        </label>
        <label>
          No
        <input 
        type="radio"
        name="Yes"
        checked={checkboxes.Yes === 'No'}
        onChange={() => handleRadioChange('Yes', 'No')}
        />
        </label>
      </div>

      <div className="radio-group">
        <h3>Downsampling</h3>
        <input type="text" placeholder="Downsampling" />
      </div>

      <div className="radio-group">
        <h3>Splitting Configuration</h3>
        <label>
          Use Km Grid</label>
        <input type="text" placeholder="KM" />

      <label>
      Timestamps file from user </label>
        <input type="text" placeholder="Timestamps" />
      
      <label>
      Clip to certain distance from track</label>
        <input type="text" placeholder="Clip" />
     
      </div>
      <div className="radio-group">
        <h3>Potree Converter </h3>
        <input type="text" placeholder="Potree Converter " />
      </div> */} 
      <h1>Definitions</h1> 

Session / Scan Session: raw data 

Pipeline / templates: Web360, cirrus, road scan, optio / annotation 

Delivery Folders: what ever it means for every pipeline 

Input Data Verification 

TBD 
Configurable parameters for processing 

Common: 

1 project = 1 Configuration = List Time Range of Multiple = 1 Output folder 

Image level: 

Trigger distance between images for output 

5 or 10 meter 

Image resolution for output  

Width x Height 

Blurring Objects 

Yes / No 

List Car, People  

TBD 

Stitching radius 

Static Radius = 2,5,20,100 meters 

Which cameras to stitch 

Front: Yes/No 

Back: Yes/No 

Both cameras: Yes/No (automatically yes for front and back) 

Export 360 images/panoramas 

Yes / no 

Export camera-level images for fomul-annotation 

Camera ID: 0..5 

Rotation for the image of the camera 

Which camera: back / front / both cameras 

Output Directory 

Project- output directory mapping  

Move to NAS 

CRS Output image list  

Format of image list 

Export forward-facing camera 

Image frequency 

Image dimensions 

Rotation for the images 

Image list 

Output folder 

Naming  

Image Projection 

Equirectangular / 360 panorama / 3d camera 

Rectilinear / flat / 2d camera 

cube maps / 360 panorama / 3d camera 

Pointclouds 

Colorize 

Yes / no 

CRS output 

List of outputs 

Output attributes 

Intensity 

Speed filtering 

Default yes 

Classification 

Yes /no 

Merging of left and right scanners 

Default yes 

Density computation (default: generate kml) 

Downsampling 

Splitting Configuration 

Use Km grid 

Timestamps file from user 

Clip to certain distance from track 

Potree Converter 

Leadger generation 

If the split is based on km grid 

Polygon of the real lidar data 

Distance to cut PC from track center 
 

Example 

Gothenburg to Stockholm  

Web360: 

0 to 50% - 1 Delivery folder 

Cirrus: 

51 to 60% + 63 to 70% - Delivery Folder Bandel 551 + E Track 

72 to 80% + 85 to 87% - Delivery Folder Bandel 551 + N Track 
Annotation: 

51% to 90%: Potree annotation 

Annotation folder 

We have 3 templates: Web360, Cirrus, Annotation 

But we have 4 projects: every delivery folder is project 

 

Superset: 0 to 90% 

 

1 Month later: 

Req: Export 1 track, 50 meters could be 5 mins of 8 hours of data. 

Re-Process the scan session for just those 5 mins. 
 

Input-Data configuration 

User has to be provide as timestamps 

Common-processing parameters / base processing 

After you diverge for every template / pipeline 

Project-level processing parameters 

List of templates then with an optimized version 
 

Write a Workflow for every template and dependency graph for  

Write out a common workflow IF possible. 

    </div>
  
);
} 

export default App;
