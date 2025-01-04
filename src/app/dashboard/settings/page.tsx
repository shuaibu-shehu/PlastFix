'use client'

import React, { useState } from 'react';
import { Camera, Save, Upload } from 'lucide-react';

interface UserProfile {
    name: string;
    email: string;
    profilePicture: string;
}

export default function SettingsPage() {
    const [profile, setProfile] = useState<UserProfile>({
        name: 'John Doe',
        email: 'john.doe@example.com',
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // In a real app, you would upload the file to a server
            const imageUrl = URL.createObjectURL(file);
            setProfile(prev => ({ ...prev, profilePicture: imageUrl }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        alert('Profile updated successfully!');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-6 py-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-8">Profile Settings</h1>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Profile Picture Section */}
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                                <div className="flex items-center space-x-6">
                                    <div className="relative">
                                        <img
                                            src={profile.profilePicture}
                                            alt="Profile"
                                            className="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
                                        />
                                        <label
                                            htmlFor="photo-upload"
                                            className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                        >
                                            <Camera className="h-4 w-4 text-gray-600" />
                                            <input
                                                type="file"
                                                id="photo-upload"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="photo-upload-btn"
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                                        >
                                            <Upload className="h-4 w-4 mr-2" />
                                            Change Photo
                                            <input
                                                type="file"
                                                id="photo-upload-btn"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Name Field */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={profile.name}
                                    onChange={e => setProfile(prev => ({ ...prev, name: e.target.value }))}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={profile.email}
                                    onChange={e => setProfile(prev => ({ ...prev, email: e.target.value }))}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>

                            {/* Save Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}