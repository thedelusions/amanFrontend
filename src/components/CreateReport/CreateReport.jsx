import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as reportService from '../../services/reportService';
import areasFile from '../../data/bh.json';
import './CreateReport.css';

const CreateReport = () => {
  const navigate = useNavigate();
  const areas = areasFile.map(a => a.city);

  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    area: areas[0] 
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try{
    e.preventDefault();
      await reportService.create(formData);
      navigate('/my-reports'); 
    } catch(error){
        console.log(error);
    }
  };

  return (
    <main className="create-report-container">

    <header>
      <h1>Create a Report</h1>
      <p>Fill in the details to submit a new report.</p>
    </header>

      <form onSubmit={handleSubmit} className="create-report-form">

        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="suspicious">Suspicious</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

         <div>
          <label htmlFor="area">Area:</label>
          <select
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          >
            {areas.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
         </div>

        <button type="submit" >
            Create 
        </button>
  
        </form>
        </main>
  );
};

export default CreateReport;
