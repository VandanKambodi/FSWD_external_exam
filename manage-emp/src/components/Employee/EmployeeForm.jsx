import React, { useState, useEffect } from 'react';
import API from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeForm() {
  const [form, setForm] = useState({ name: '', type: '', email: '', phone: '' });
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  
  useEffect(() => {
    if (id) {
      API.get(`/employees/${id}`).then(res => setForm(res.data));
    }
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = e => setProfilePic(e.target.files[0]);

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (profilePic) data.append('profilePic', profilePic);

    if (id) {
      await API.put(`/employees/${id}`, data);
    } else {
      await API.post('/employees', data);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? 'Edit' : 'Add'} Employee</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="type" placeholder="Type" value={form.type} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <input type="file" onChange={handleFile} />
      <button type="submit">{id ? 'Update' : 'Add'}</button>
    </form>
  );
}

export default EmployeeForm;