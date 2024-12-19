// import React, { useState } from 'react';
// import { cirrusApi } from '../data/cirrusapi';
// import Landing from './LandingPage.jsx';
// import './Landing.css';

//   const Cirrus = ({ trackData }) => {
//     const [cirrusInputs, setCirrusInputs] = useState([]);
//     const [isSynlig, setIsSynlig] = useState(false);
//     const [cirrusInfo, setCirrusInfo] = useState('');

//   const [cirrusParamsInputs, setCirrusParamsInputs] = useState([]);
//   const [cirrusSplitInformationInputs, setCirrusSplitInformationInputs] = useState([]);
//   const [cirrusPointcloudsInputs, setCirrusPointcloudsInputs] = useState([]);
//   const [cirrusImage360Inputs, setCirrusImage360Inputs] = useState([]);
//   const [cirrusAccordionOpen, setCirrusAccordionOpen] = useState({
//     cirrusInfo: false,
//     params: false,
//     splitInformation: false,
//     pointclouds: false,
//     image360: false,
//   });

//   const toggleCirrusAccordion = (section) => {
//     setCirrusAccordionOpen((prev) => {
//       const newAccordionState = {
//         cirrusInfo: false,
//         params: false,
//         splitInformation: false,
//         pointclouds: false,
//         image360: false,
//     };
//     newAccordionState[section] = !prev[section];
//     return newAccordionState;
//     });
//   };

//       const initializeCirrusInputs = () => {
//         const cirrusInfo = Object.entries(cirrusApi[0].cirrusInfo).map(([key, value]) => ({
//           name: `cirrusInfo.${key}`,
//           text: key,
//           type: typeof value,
//           value: value,
//         }));
      
//         const paramsData = Object.entries(cirrusApi[0].params).map(([key, value]) => ({
//           name: `params.${key}`,
//           text: key,
//           type: typeof value === 'object' && value !== null && value.type ? value.type : typeof value,
//           value: typeof value === 'object' && value.default !== undefined ? value.default : value,
//         }));
      
//         const splitInformationData = Object.entries(cirrusApi[0].split_information).map(([key, value]) => ({
//           name: `split_information.${key}`,
//           text: key,
//           type: typeof value === 'object' && value.type ? value.type : typeof value,
//           value: typeof value === 'object' && value.default !== undefined ? value.default : value,
//         }));
      
//         const pointcloudsData = Object.entries(cirrusApi[0].pointclouds).flatMap(([category, values]) =>
//           Object.entries(values).map(([key, value]) => ({
//             name: `pointclouds.${category}.${key}`,
//             text: `${category} - ${key}`,
//             type: typeof value === 'object' && value.type ? value.type : typeof value,
//             value: typeof value === 'object' && value.default !== undefined ? value.default : value,
//           }))
//         );
      
//         const image360ParamsData = Object.entries(cirrusApi[0].image_360.params).map(([key, value]) => ({
//           name: `image_360.params.${key}`,
//           text: key,
//           type: typeof value === 'object' && value.type ? value.type : typeof value,
//           value: typeof value === 'object' && value.default !== undefined ? value.default : value,
//         }));
      
//         const imageProjectionData = Object.entries(cirrusApi[0].image_360.packages.image_projection.choices).map(([key, value]) => ({
//           name: `image_360.packages.image_projection.${key}`,
//           text: key,
//           type: typeof value === 'object' && value.type ? value.type : typeof value,
//           value: typeof value === 'object' && value.default !== undefined ? value.default : value,
//         }));
      
//         setCirrusInputs(cirrusInfo);
//         setCirrusParamsInputs(paramsData);
//         setCirrusSplitInformationInputs(splitInformationData);
//         setCirrusPointcloudsInputs(pointcloudsData);
//         setCirrusImage360Inputs(image360ParamsData.concat(imageProjectionData));
//       };
      
//       useEffect(() => {
//         if (!trackData) {
//           initializeCirrusInputs();
//         }
//       }, [trackData]);

//       const toggleSectionsSynlig = () => {
//         setIsSynlig(!isSynlig);
//         setShowFolder(false);
//         if (!isSynlig) {
//           setCirrusInfo('Cirrus Form');
//         } else {
//           setCirrusInfo('');
//         }
//         if (isSynlig) {
//           setShowFolder(true);
//         }
//       };

//       const saveToCirrus = () => {
//           const reduceInputs = (inputs) => {
//             return inputs.reduce((acc, input) => {
//               const path = input.name.split('.');
//               let current = acc;
      
//               path.forEach((key, index) => {
//                 if (index === path.length - 1) {
//                   current[key] = input.value;
//                 } else {
//                   if (!current[key]) {
//                     current[key] = {};
//                   }
//                   current = current[key];
//                 }
//               });
      
//               return acc;
//             }, {});
//           };
      
//           const cirrusData = {
//             ...reduceInputs(cirrusInputs),
//             params: reduceInputs(cirrusParamsInputs),
//             split_information: reduceInputs(cirrusSplitInformationInputs),
//             pointclouds: reduceInputs(cirrusPointcloudsInputs),
//             image_360: reduceInputs(cirrusImage360Inputs),
//           };
      
//           if (isChecked) {
//             cirrusData.session = sessionInputs;
//           }
//           if (isCheckedSession) {
//             cirrusData.session = sessionData;
//           }
//           if (isCheckedSession2024) {
//             cirrusData.session = session2024;
//           }
      
//           const cirrusInfo = {
//             project_name: cirrusApi[0].project_name,
//             vehicle: cirrusApi[0].vehicle,
//             session_name: cirrusApi[0].session_name,
//             path_nas: cirrusApi[0].path_nas,
//             comment: cirrusApi[0].comment,
//             template: cirrusApi[0].template,
//           };
      
//           const data = { cirrus: { ...cirrusInfo, ...cirrusData } };
//           const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
//           saveAs(blob, 'CirrusForm.json');
      
//           initializeCirrusInputs();
//         };

//     return (
//         <>
//         <div className="template-container">
//         <div className="Cirrus">
//         <h2 onClick={toggleSectionsSynlig}>{isSynlig ? 'Cirrus' : 'Cirrus'}</h2>
//       </div>
//       </div>
        
//       <div className="bottom-container">
//     <div className="box">
//       {!(isVisible || isVissa || isSynlig) && (
//         <img src={folder} alt="folder" className="folder" />
//         // <img src={Atritec_logga} alt="folder" className="folder" />
//       )}
//      <div className='accordion-container'>
//      {cirrusInfo && (
//           <div className="Bdl-split">
//           <div className="accordion">
//             <div className="cirrusaccordion-section">
//               <h3 onClick={() => toggleCirrusAccordion('cirrusInfo')}>Cirrus Info</h3>
//               {cirrusAccordionOpen.cirrusInfo && (
//                 <div className="accordion-content">
//                   {cirrusInputs.map((input, index) => (
//                     <div key={index} className="input-container">
//                       {input.text && <div className="input-description">{input.text}</div>}
//                       <input
//                         type={input.type === 'bool' ? 'checkbox' : 'text'}
//                         value={input.type === 'bool' ? undefined : input.value || ""}
//                         checked={input.type === 'bool' ? Boolean(input.value) : undefined}
//                         onChange={(e) => {
//                           const newInputs = [...cirrusInputs];
//                           if (input.type === 'bool') {
//                             newInputs[index].value = e.target.checked;
//                           } else {
//                             newInputs[index].value = e.target.value;
//                           }
//                           setCirrusInputs(newInputs);
//                         }}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="cirrusaccordion-section">
//               <h3 onClick={() => toggleCirrusAccordion('params')}>Params</h3>
//               {cirrusAccordionOpen.params && (
//                 <div className="accordion-content">
//                   {cirrusParamsInputs.map((input, index) => (
//                     <div key={index} className="input-container">
//                       {input.text && <div className="input-description">{input.text}</div>}
//                       <input
//                         type={input.type === 'bool' ? 'checkbox' : 'text'}
//                         value={input.type === 'bool' ? undefined : input.value || ""}
//                         checked={input.type === 'bool' ? Boolean(input.value) : undefined}
//                         onChange={(e) => {
//                           const newInputs = [...cirrusParamsInputs];
//                           if (input.type === 'bool') {
//                             newInputs[index].value = e.target.checked;
//                           } else {
//                             newInputs[index].value = e.target.value;
//                           }
//                           setCirrusParamsInputs(newInputs);
//                         }}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="cirrusaccordion-section">
//               <h3 onClick={() => toggleCirrusAccordion('splitInformation')}>Split Information</h3>
//               {cirrusAccordionOpen.splitInformation && (
//                 <div className="accordion-content">
//                   {cirrusSplitInformationInputs.map((input, index) => (
//                     <div key={index} className="input-container">
//                       {input.text && <div className="input-description">{input.text}</div>}
//                       <input
//                         type={input.type === 'bool' ? 'checkbox' : 'text'}
//                         value={input.type === 'bool' ? undefined : input.value || ""}
//                         checked={input.type === 'bool' ? Boolean(input.value) : undefined}
//                         onChange={(e) => {
//                           const newInputs = [...cirrusSplitInformationInputs];
//                           if (input.type === 'bool') {
//                             newInputs[index].value = e.target.checked;
//                           } else {
//                             newInputs[index].value = e.target.value;
//                           }
//                           setCirrusSplitInformationInputs(newInputs);
//                         }}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="cirrusaccordion-section">
//               <h3 onClick={() => toggleCirrusAccordion('pointclouds')}>Pointclouds</h3>
//               {cirrusAccordionOpen.pointclouds && (
//                 <div className="accordion-content">
//                   {cirrusPointcloudsInputs.map((input, index) => (
//                     <div key={index} className="input-container">
//                       {input.text && <div className="input-description">{input.text}</div>}
//                       <input
//                         type={input.type === 'bool' ? 'checkbox' : 'text'}
//                         value={input.type === 'bool' ? undefined : input.value || ""}
//                         checked={input.type === 'bool' ? Boolean(input.value) : undefined}
//                         onChange={(e) => {
//                           const newInputs = [...cirrusPointcloudsInputs];
//                           if (input.type === 'bool') {
//                             newInputs[index].value = e.target.checked;
//                           } else {
//                             newInputs[index].value = e.target.value;
//                           }
//                           setCirrusPointcloudsInputs(newInputs);
//                         }}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="cirrusaccordion-section">
//               <h3 onClick={() => toggleCirrusAccordion('image360')}>Image 360</h3>
//               {cirrusAccordionOpen.image360 && (
//                 <div className="accordion-content">
//                   {cirrusImage360Inputs.map((input, index) => (
//                     <div key={index} className="input-container">
//                       {input.text && <div className="input-description">{input.text}</div>}
//                       <input
//                         type={input.type === 'bool' ? 'checkbox' : 'text'}
//                         value={input.type === 'bool' ? undefined : input.value || ""}
//                         checked={input.type === 'bool' ? Boolean(input.value) : undefined}
//                         onChange={(e) => {
//                           const newInputs = [...cirrusImage360Inputs];
//                           if (input.type === 'bool') {
//                             newInputs[index].value = e.target.checked;
//                           } else {
//                             newInputs[index].value = e.target.value;
//                           }
//                           setCirrusImage360Inputs(newInputs);
//                         }}
//                       />
//                     </div>
//                   ))};
//                 <div className="button-group">
//               <button className="button-add" onClick={() => addInput('cirrus')}>+</button>
//               <button className="button-remove" onClick={() => removeInput('cirrus')}>-</button>
//               <button className="save-button" onClick={saveToCirrus}>Save</button>
//             </div>
//           </div>
//                 )}
//               </div>
//             </div>
//             </div>
//           )}
//         </div>
//        </div>
//       </div>

//         </>
// )};

// export default Cirrus;