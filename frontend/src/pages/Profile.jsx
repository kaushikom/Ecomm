import React, { useState } from 'react';

const Profile = () => {
  const [isProvider, setIsProvider] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    skills: '',
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically update the user's profile
    console.log('Profile updated:', profileData);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={isProvider}
            onChange={() => setIsProvider(!isProvider)}
            className="form-checkbox"
          />
          <span className="ml-2">I want to offer services</span>
        </label>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="bio" className="block mb-1">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>
        {isProvider && (
          <div>
            <label htmlFor="skills" className="block mb-1">Skills (comma-separated)</label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={profileData.skills}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;