import axios from 'axios';

const API_URL = 'http://localhost:5000/api/announcements/';

const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.token : null;
};

// Teacher functions
const postAnnouncement = async (announcementData) => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', // Crucial for file uploads
    },
  };
  const response = await axios.post(API_URL, announcementData, config);
  return response.data;
};

const getTeacherAnnouncements = async () => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + 'teacher', config);
  return response.data;
};

// Student functions
const getStudentAnnouncements = async () => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + 'student', config);
  return response.data;
};

const markAnnouncementAsViewed = async (announcementId) => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + `${announcementId}/view`, {}, config);
  return response.data;
};

// Admin functions
const getAllAnnouncementsAdmin = async () => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + 'admin', config);
  return response.data;
};

// Shared functions
const deleteAnnouncement = async (announcementId) => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + announcementId, config);
  return response.data;
};

const announcementService = {
  postAnnouncement,
  getTeacherAnnouncements,
  getStudentAnnouncements,
  markAnnouncementAsViewed,
  getAllAnnouncementsAdmin,
  deleteAnnouncement,
};

export default announcementService;