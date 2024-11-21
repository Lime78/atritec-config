import React, { useState } from 'react';

const Cirrus = () => {
    const [checkboxes, setCheckboxes] = useState({
      
    });
  
    return (
        <>

<header>
    <h1>Cirrus</h1>
</header>
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

    Density computation default: generate kml

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

    </>
    )
}
export default Cirrus;