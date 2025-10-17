import axios from 'axios';

const API_URL = 'https://sshsbackend-wscb0c1s.b4a.run/api/users/';

const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.token : null;
};

const getTeacherClasses = async () => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + 'teacher', config);
  return response.data;
};

const getStudentClasses = async () => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + 'student', config);
  return response.data;
};

const getAllClassesAdmin = async () => {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + 'all', config);
    return response.data;
};


const classService = {
  getTeacherClasses,
  getStudentClasses,
  getAllClassesAdmin,
};

export default classService;