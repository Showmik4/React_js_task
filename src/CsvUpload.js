import React from 'react';

const CsvUpload = ({ handleCsvUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleCsvUpload(file);
    }
  };

  return (
    <div className='col-md-6 px-5 mb-2'>
      <input className='form-control' type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
};

export default CsvUpload;
