import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Settings as SettingsIcon, User, Palette, Upload } from "lucide-react";
import ToggleButton from "../Components/UI/ToggleButton";
import PageHeader from "../Components/PageHeader";


export default function Settings() {
  const { profile, updateProfile, theme, toggleTheme } = useOutletContext();
  
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    title: profile.title || "",
    avatar: profile.avatar
  });

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAvatar = e.target.result;
        // Validate that it's actually an image data URL
        if (typeof newAvatar === 'string' && newAvatar.startsWith('data:image/')) {
          setFormData(prev => ({ ...prev, avatar: newAvatar }));
          updateProfile({ avatar: newAvatar });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-sky-50 to-white min-h-screen">
      <PageHeader 
        title="Settings" 
        icon={SettingsIcon}
        subtitle="Manage your profile and preferences"
      />

      <div className="max-w-4xl space-y-8">
        {/* Profile Settings */}
        <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-sky-100">
          <h3 className="text-xl font-semibold text-sky-800 mb-6 flex items-center gap-2">
            <User size={20} />
            {('Profile Settings')}
          </h3>
          
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex items-center gap-6">
              <img
                src={formData.avatar}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-sky-200 shadow-md object-cover"
              />
              <div>
                <label className="block text-sky-700 font-medium mb-2">{('Profile Picture')}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 cursor-pointer transition-colors"
                  >
                    <Upload size={16} />
                    {('Upload Photo')}
                  </label>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sky-700 font-medium mb-2">{('Full Name')}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sky-700 font-medium mb-2">{('Email')}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 bg-white"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sky-700 font-medium mb-2">{('Job Title')}</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Project Manager, Developer"
                  className="w-full px-4 py-2 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-colors"
            >
              {('Update Profile')}
            </button>
          </form>
        </div>

        {/* Theme Settings */}
        <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-sky-100">
          <h3 className="text-xl font-semibold text-sky-800 mb-6 flex items-center gap-2">
            <Palette size={20} />
            {('Appearance')}
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sky-700">{('Theme')}</h4>
                <p className="text-sm text-sky-600">{('Choose your preferred theme')}</p>
              </div>
              <ToggleButton theme={theme} onToggle={toggleTheme} />
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-sky-100">
          <h3 className="text-xl font-semibold text-sky-800 mb-4">{('About')}</h3>
          <div className="text-sky-600 space-y-2">
            <p><strong>{('Version:')}:</strong> 1.0.0</p>
            <p><strong>{('Last Updated:')}:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>{('Developer:')}:</strong> {('Project Manager Team')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
