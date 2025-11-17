import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as reportService from '../../services/reportService';
import Footer from '../Footer/Footer';
import areasFile from '../../data/bh.json';
import '../CreateReport/CreateReport.css';

const EditReport = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const areas = areasFile.map(a => a.city);

  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    area: areas[0],
    status: 'pending',
  });

  useEffect(() => {
    const loadReport = async () => {
      try {
        const data = await reportService.show(id);
        setFormData({
          title: data.title,
          type: data.type,
          description: data.description,
          area: data.area,
          status: data.status, 
          });
      } catch (error) {
        console.log(error);
      }
    };

    loadReport();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Reset status to pending if it was edited again
      const updatedForm = { ...formData };
      if (formData.status === 'approved' || formData.status === 'rejected') {
        updatedForm.status = 'pending';
      }

      await reportService.update(id, updatedForm);
      navigate('/my-reports');

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <main className='main'>
    <main className="create-report-container">
      <header>
        <h1>Edit Report</h1>
        <p>Update the details of your report below.</p>
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
            required />
        </div>

        <div>
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required >
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
            required />
        </div>

        <div>
          <label htmlFor="area">Area:</label>
          <select
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required >
            {areas.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Update</button>
      </form>
    </main>
    </main>
        <Footer />
    </>
  );
};

export default EditReport;
