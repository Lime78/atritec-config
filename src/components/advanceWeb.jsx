import React, { useState }from 'react';

const Web = () => {
    const [checkboxes, setCheckboxes] = useState({
      
    });
  
  
    return (
      <div className="web">
      
      <header>
        <h1>Web360</h1> 
  </header>
  
  <div className="Second-section">
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
  </div>
   </div>
  
    
  );
  } 
  
  export default Web;
  