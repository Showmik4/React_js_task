import React, { useState,useEffect } from 'react';
import Papa from 'papaparse';
import PdfDocument from './PdfDocument';
import CsvUpload from './CsvUpload';


const Prototype = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      projectName: '',
      projectDescription: '',
      projectClient: '',
      projectContractor: '',
      maxX: '',
      minX: '',
      maxY: '',
      minY: '',
      maxZ: '',
      minZ: '',
    });  

    
 
    const [csvData, setCsvData] = useState(null);
    const [inputHistory, setInputHistory] = useState([]);  

    useEffect(() => {
        const storedInputHistory = localStorage.getItem('inputHistory');
        if (storedInputHistory) {
          setInputHistory(JSON.parse(storedInputHistory));
        }
      }, []);
      
   
    const handleInputChange = (field, value) => {
      setFormData((prevData) => ({ ...prevData, [field]: value }));       
    
    };   

    const handleCsvUpload = (file) => {
        Papa.parse(file, {
          complete: (result) => {
            const extractedData = processCsvData(result.data);
            setCsvData(extractedData);
            
          
            setFormData((prevData) => ({
              ...prevData,
              maxX: extractedData.maxX,
              minX: extractedData.minX,
              maxY: extractedData.maxY,
              minY: extractedData.minY,
              maxZ: extractedData.maxZ,
              minZ: extractedData.minZ,
            }));
          },
        });
      }; 
 
            
    const processCsvData = (data) => {
    const headerRow = data[0];
    const xIndex = headerRow.indexOf('X');
    const yIndex = headerRow.indexOf('Y');
    const zIndex = headerRow.indexOf('Z');

    let maxX = Number.MIN_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;
    let maxZ = Number.MIN_SAFE_INTEGER;
    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let minZ = Number.MAX_SAFE_INTEGER;

    for (let i = 1; i < data.length; i++) 
    {
      const row = data[i];
      const xValue = parseFloat(row[xIndex]);
      const yValue = parseFloat(row[yIndex]);
      const zValue = parseFloat(row[zIndex]);

      if (!isNaN(xValue)) {
        maxX = Math.max(maxX, xValue);
        minX = Math.min(minX, xValue);
      }

      if (!isNaN(yValue)) {
        maxY = Math.max(maxY, yValue);
        minY = Math.min(minY, yValue);
      }

      if (!isNaN(zValue)) {
        maxZ = Math.max(maxZ, zValue);
        minZ = Math.min(minZ, zValue);
      }
    }

    return { maxX, maxY, maxZ, minX, minY, minZ };
  };
  const canProceedToNextStep = () => {
    const { projectName, projectDescription, projectClient, projectContractor, maxX, minX, maxY, minY, maxZ, minZ } = formData;
    return projectName && projectDescription && projectClient && projectContractor && maxX && minX && maxY && minY && maxZ && minZ;
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    if (step === 1 && canProceedToNextStep()) 
    {
      const newEntry = {
        projectName: formData.projectName,
        projectDescription: formData.projectDescription,
        projectClient: formData.projectClient,
        projectContractor: formData.projectContractor,
        maxX: formData.maxX,
        minX: formData.minX,
        maxY: formData.maxY,
        minY: formData.minY,
        maxZ: formData.maxZ,
        minZ: formData.minZ,
        csvData: { ...csvData },
      };
  
      setInputHistory((prevHistory) => [...prevHistory, newEntry]);
      localStorage.setItem('inputHistory', JSON.stringify([...inputHistory, newEntry]));
      setStep(step + 1);
    }
  };
  



  const handleBack = () => {
    setStep(1); // Just change the step, don't reset inputHistory
  };


  return (
    <div className='p-5'>
      {step === 1 ? (
        <form className='bg-success'>
        <div className='row'>
          <h2 className='text-center m-4 '>XYZ Company</h2>
          
          <div className='col-md-6 mb-2 px-5'>
          <input className='form-control'
            type="text"
            placeholder="Project Name"
            value={formData.projectName}
            onChange={(e) => handleInputChange('projectName', e.target.value)}
          />
          </div>
            <div className='col-md-6 mb-2 px-5'>
          <input className='form-control'
            type="text"
            placeholder="Project Description"
            value={formData.projectDescription}
            onChange={(e) => handleInputChange('projectDescription', e.target.value)}
          />
          </div>
          <div className='col-md-6 mb-2 px-5'>
          <input className='form-control'
            type="text"
            placeholder="Client"
            value={formData.projectClient}
            onChange={(e) => handleInputChange('projectClient', e.target.value)}
          />
          </div>
          <div className='col-md-6 mb-2 px-5'>
          <input className='form-control'
            type="text"
            placeholder="Contractor"
            value={formData.projectContractor}
            onChange={(e) => handleInputChange('projectContractor', e.target.value)}
          />
          </div>
          <div className='col-md-6 mb-2 px-5'>
          <input className='form-control'
          type="number"
          placeholder="Max X"
          value={formData.maxX}
          onChange={(e) => handleInputChange('maxX', e.target.value)}
            /> 
            </div>

        <div className='col-md-6 mb-2 px-5'>
        <input className='form-control' 
        type="number"
        placeholder="Min X"
        value={formData.minX}
        onChange={(e) => handleInputChange('minX', e.target.value)}
        /> 
        </div>

        <div className='col-md-6 mb-2 px-5'>
        <input className='form-control'
        type="number"
        placeholder="Max Y"
        value={formData.maxY}
        onChange={(e) => handleInputChange('maxY', e.target.value)}
        /> 
        </div>

        <div className='col-md-6 mb-2 px-5'>
        <input className='form-control'
        type="number"
        placeholder="Min Y"
        value={formData.minY}
        onChange={(e) => handleInputChange('minY', e.target.value)}
        /> 
        </div>

        <div className='col-md-6 mb-2 px-5'>
        <input className='form-control'
        type="number"
        placeholder="Max Z"
        value={formData.maxZ}
        onChange={(e) => handleInputChange('maxZ', e.target.value)}
        /> 
        </div>

        <div className='col-md-6 mb-2 px-5'>
        <input className='form-control'
        type="number"
        placeholder="Min Z"
        value={formData.minZ}
        onChange={(e) => handleInputChange('minZ', e.target.value)}
        /> 
        </div>
          <CsvUpload handleCsvUpload={handleCsvUpload} />
          <div className='col-12 px-5 text-center'>
          <button className='btn btn-primary mb-5 mx-3' onClick={handleSubmit } disabled={!canProceedToNextStep}>Submit</button>
          <button className='btn btn-danger mb-5' onClick={() => setStep(2)}>Next</button>
        </div>      
    </div>
    </form>
      ) : (
        <div className='p-5 bg-primary'>
          <h2  className='text-center'>Table Details</h2>
          <table className='table'>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Project Description</th>
                <th>Project Client</th>
                <th>Project Contractor</th>
                <th>Max X</th>
                <th>Min X</th>
                <th>Max Y</th>
                <th>Min Y</th>
                <th>Max Z</th>
                <th>Min Z</th>
              </tr>
            </thead>
            <tbody>
              {inputHistory.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.projectName}</td>
                  <td>{entry.projectDescription}</td>
                  <td>{entry.projectClient}</td>
                  <td>{entry.projectContractor}</td>
                  <td>{entry.maxX}</td>
                  <td>{entry.minX}</td>
                  <td>{entry.maxY}</td>
                  <td>{entry.minY}</td>
                  <td>{entry.maxZ}</td>
                  <td>{entry.minZ}</td>
                </tr>
              ))}
            </tbody>
         
          </table>
          <PdfDocument inputHistory={inputHistory} />         
          
          <button className='btn btn-success mt-2' onClick={handleBack}>Back</button>       
         
        </div>
      )}
    </div>
  );
};

export default Prototype;
