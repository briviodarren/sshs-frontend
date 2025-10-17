import axios from 'axios';

// The API_URL must point to the specific endpoint for announcements
const API_URL = 'https://sshs-backend.vercel.app/api/announcements/';

const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.token : null;
};

// Teacher & Admin: Post a new announcement
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

// Teacher: Get all announcements
const getTeacherAnnouncements = async () => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // This correctly calls .../api/announcements/teacher
  const response = await axios.get(API_URL + 'teacher', config);
  return response.data;
};

// Student: Get all announcements
const getStudentAnnouncements = async () => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // This correctly calls .../api/announcements/student
  const response = await axios.get(API_URL + 'student', config);
  return response.data;
};

// Student: Mark an announcement as viewed
const markAnnouncementAsViewed = async (announcementId) => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // This correctly calls .../api/announcements/{id}/view
  const response = await axios.post(API_URL + `${announcementId}/view`, {}, config);
  return response.data;
};

// Admin: Get all announcements
const getAllAnnouncementsAdmin = async () => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // This correctly calls .../api/announcements/admin
  const response = await axios.get(API_URL + 'admin', config);
  return response.data;
};

// Teacher & Admin: Delete an announcement
const deleteAnnouncement = async (announcementId) => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // This correctly calls .../api/announcements/{id}
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