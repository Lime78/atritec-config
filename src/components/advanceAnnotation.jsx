import React from 'react';
import './annotation.css';

const AdvanceAnnotation = () => {
  return (
    <div className="text-container">
      <header>
        <h1>Definitions</h1>
      </header>

      <section className="section">
        <h2>Session / Scan Session</h2>
        <p><strong>Raw Data</strong></p>

        <h2>Pipeline / Templates</h2>
        <p>Web360, Cirrus, Road Scan, Optio / Annotation</p>

        <h2>Delivery Folders</h2>
        <p>Whatever it means for every pipeline</p>

        <h2>Input Data Verification</h2>
        <p>TBD</p>

        <h2>Configurable Parameters for Processing</h2>

        <h3>Common</h3>
        <ul>
          <li>1 project = 1 Configuration = List Time Range of Multiple = 1 Output folder</li>
        </ul>

        <h3>Image Level</h3>
        <ul>
          <li><strong>Trigger Distance Between Images for Output:</strong> 5 or 10 meters</li>
          <li><strong>Image Resolution for Output:</strong> Width x Height</li>
          <li><strong>Blurring Objects:</strong> Yes / No</li>
          <li><strong>List of Cars, People:</strong> TBD</li>
          <li><strong>Stitching Radius:</strong> Static Radius = 2, 5, 20, 100 meters</li>
          <li><strong>Which Cameras to Stitch:</strong></li>
          <ul>
            <li>Front: Yes / No</li>
            <li>Back: Yes / No</li>
            <li>Both Cameras: Yes / No (automatically yes for front and back)</li>
          </ul>
          <li><strong>Export 360 Images/Panoramas:</strong> Yes / No</li>
        </ul>
      </section>
    </div>
  );
};

export default AdvanceAnnotation;
