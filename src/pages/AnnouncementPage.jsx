import React, { useState, useEffect } from 'react';
import { FaEye, FaPlusCircle, FaTrashAlt, FaDownload } from 'react-icons/fa';
import announcementService from '../services/announcementService';
import classService from '../services/classService';

const AnnouncementPage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user?.role;

    const [announcements, setAnnouncements] = useState([]);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showPostForm, setShowPostForm] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState({
        title: '',
        class_id: '',
        file: null,
    });

    useEffect(() => {
        fetchData();
        // NEW: Fetch classes for admins as well as teachers
        if (role === 'teacher') {
            fetchTeacherClasses();
        } else if (role === 'admin') {
            fetchAllClassesForAdmin();
        }
    }, [role]);

    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            let data = [];
            // CORRECTED LOGIC: We need to call the specific endpoint for each role.
            if (role === 'teacher') {
                data = await announcementService.getTeacherAnnouncements();
            } else if (role === 'admin') {
                data = await announcementService.getAllAnnouncementsAdmin();
            } else if (role === 'student') {
                data = await announcementService.getStudentAnnouncements();
            }
            setAnnouncements(data);
        } catch (err) {
            const message = (err.response?.data?.message) || err.message || err.toString();
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const fetchTeacherClasses = async () => {
        try {
            const data = await classService.getTeacherClasses();
            setClasses(data);
            if (data.length > 0) {
                setNewAnnouncement(prev => ({ ...prev, class_id: data[0].id }));
            }
        } catch (err) {
            console.error("Error fetching teacher classes:", err);
        }
    };
    
    // NEW: Function to get all classes for the admin to select from
    const fetchAllClassesForAdmin = async () => {
        try {
            const data = await classService.getAllClassesAdmin();
            setClasses(data);
            if (data.length > 0) {
                setNewAnnouncement(prev => ({ ...prev, class_id: data[0].id }));
            }
        } catch (err) {
            console.error("Error fetching all classes for admin:", err);
        }
    };


    const handleNewAnnouncementChange = (e) => {
        const { name, value, files } = e.target;
        setNewAnnouncement(prev => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handlePostAnnouncement = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const formData = new FormData();
            formData.append('title', newAnnouncement.title);
            formData.append('class_id', newAnnouncement.class_id);
            formData.append('file', newAnnouncement.file);

            await announcementService.postAnnouncement(formData);
            setNewAnnouncement({ title: '', class_id: classes[0]?.id || '', file: null });
            setShowPostForm(false);
            fetchData();
        } catch (err) {
            const message = (err.response?.data?.message) || err.message || err.toString();
            setError(message);
        }
    };

    const handleMarkViewed = async (announcementId) => {
        try {
            await announcementService.markAnnouncementAsViewed(announcementId);
            fetchData();
        } catch (err) {
            const message = (err.response?.data?.message) || err.message || err.toString();
            setError(message);
        }
    };

    const handleDeleteAnnouncement = async (announcementId) => {
        if (window.confirm('Are you sure you want to delete this announcement?')) {
            try {
                await announcementService.deleteAnnouncement(announcementId);
                fetchData();
            } catch (err) {
                const message = (err.response?.data?.message) || err.message || err.toString();
                setError(message);
            }
        }
    };

    if (loading) return <div className="text-center py-8">Loading announcements...</div>;
    if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Announcements</h1>

            {/* NEW: Show post form for both teachers and admins */}
            {(role === 'teacher' || role === 'admin') && (
                <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                    <button
                        onClick={() => setShowPostForm(!showPostForm)}
                        className="flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition-colors"
                    >
                        <FaPlusCircle className="mr-2" /> {showPostForm ? 'Hide Form' : 'Post New Announcement'}
                    </button>

                    {showPostForm && (
                        <form onSubmit={handlePostAnnouncement} className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text" name="title" id="title" value={newAnnouncement.title}
                                    onChange={handleNewAnnouncementChange} required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="class_id" className="block text-sm font-medium text-gray-700">Class</label>
                                <select
                                    name="class_id" id="class_id" value={newAnnouncement.class_id}
                                    onChange={handleNewAnnouncementChange} required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    {classes.length === 0 && <option value="">No classes available</option>}
                                    {classes.map(cls => (
                                        <option key={cls.id} value={cls.id}>{cls.class_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="file" className="block text-sm font-medium text-gray-700">PDF File</label>
                                <input
                                    type="file" name="file" id="file" accept="application/pdf"
                                    onChange={handleNewAnnouncementChange} required
                                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition-colors"
                            >
                                Post Announcement
                            </button>
                        </form>
                    )}
                </div>
            )}

            {/* List of Announcements */}
            {announcements.length === 0 ? (
                <p className="text-gray-600 text-lg">No announcements available yet.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {announcements.map((announcement) => (
                        <div key={announcement.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{announcement.title}</h3>
                                <p className="text-gray-600 text-sm mb-1">
                                    Class: <span className="font-medium">{announcement.class_name}</span>
                                </p>
                                {(role === 'teacher' || role === 'admin') && (
                                    <p className="text-gray-600 text-sm mb-1">
                                        Posted by: <span className="font-medium">{announcement.teacher_name}</span>
                                    </p>
                                )}
                                <p className="text-gray-500 text-xs mb-4">
                                    Posted on: {new Date(announcement.created_at).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <a
                                    href={announcement.file_url} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
                                >
                                    <FaDownload className="mr-2" /> View/Download PDF
                                </a>
                                {role === 'student' && (
                                    <button
                                        onClick={() => handleMarkViewed(announcement.id)}
                                        disabled={announcement.is_viewed}
                                        className={`flex items-center text-sm px-4 py-2 rounded-full transition-colors ${
                                            announcement.is_viewed
                                                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                        }`}
                                    >
                                        <FaEye className="mr-2" /> {announcement.is_viewed ? 'Viewed' : 'Mark as Viewed'}
                                    </button>
                                )}
                                {(role === 'teacher' || role === 'admin') && (
                                    <button
                                        onClick={() => handleDeleteAnnouncement(announcement.id)}
                                        className="text-red-600 hover:text-red-800 transition-colors"
                                        title="Delete Announcement"
                                    >
                                        <FaTrashAlt className="text-lg" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AnnouncementPage;