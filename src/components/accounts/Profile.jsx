import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PencilIcon } from "@heroicons/react/solid";
import { changeAvatar, changePassword, editUser } from "../../redux/features/user/userSlice";

export default function Profile() {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);

    const [picture, setPicture] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [old_password, setOpassword] = useState(null);
    const [new_password, setNpassword] = useState(null);

    const handleAvatarChange = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("avatar", picture, picture.name);
        dispatch(changeAvatar(formData));
    };

    return (
        <>
            <div className="max-w-6xl mt-6 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col space-y-8">
                    <div className="flex items-center">
                        <label htmlFor="picture" className="relative cursor-pointer">
                            <div className="w-16 h-16 overflow-hidden rounded-full">
                                <img
                                    className="object-cover w-full h-full"
                                    src={selectedFile ? URL.createObjectURL(selectedFile) : (user && user.avatar ? user.avatar : "https://res.cloudinary.com/dmtc1wlgq/image/upload/v1641911896/media/avatar/default_zrdbiq.png")}
                                    alt=""
                                />
                            </div>
                            <input
                                id="picture"
                                name="picture"
                                type="file"
                                className="sr-only"
                                onChange={(e) => {
                                    setPicture(e.target.files[0]);
                                    setSelectedFile(e.target.files[0]); // Update selectedFile state
                                }}
                            />
                        </label>
                        <div className="ml-1 border-r border-solid border-black">
                            <label htmlFor="picture" className={`cursor-pointer font-bold text-gray-700 px-3 py-1 text-sm rounded-md ${selectedFile ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                {selectedFile ? 'File Selected' : 'Change Avatar'}
                            </label>
                        </div>
                        <div className="ml-4">
                            <button
                                type="button"
                                className="bg-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md hover:bg-teal-600 transition duration-300 ease-in-out"
                                onClick={handleAvatarChange}
                                disabled={selectedFile ? false : true}
                            >
                                Save
                            </button>
                        </div>
                    </div>





                    <div>
                        <h2 className="text-lg leading-6 font-medium text-gray-900">
                            Update Profile
                        </h2>
                        <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Username */}
                            <div className="mt-2">
                                <label htmlFor="username" className="sr-only">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                    placeholder="Username"
                                    defaultValue={user.username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            {/* Email */}
                            <div className="mt-2">
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    defaultValue={user.email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {/* Picture */}
                            <div className="mt-4 md:mt-0">
                                {/* ... */}
                            </div>
                        </div>
                        <button
                            type="button"
                            className="inline-block mt-4 px-4 py-2 text-sm font-medium text-white bg-teal-500 border border-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            onClick={() => dispatch(editUser({ username, email }))}
                        >
                            Update
                        </button>
                    </div>
                    <div>
                        <h2 className="text-lg leading-6 font-medium text-gray-900">
                            Change Password
                        </h2>
                        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Old Password */}
                            <div className="mt-2">
                                <label htmlFor="opassword" className="sr-only">
                                    Old Password
                                </label>
                                <input
                                    id="opassword"
                                    name="opassword"
                                    type="password"
                                    autoComplete="old-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                    placeholder="Old Password"
                                    onChange={(e) => setOpassword(e.target.value)}
                                />
                            </div>
                            {/* New Password */}
                            <div className="mt-2">
                                <label htmlFor="password" className="sr-only">
                                    New Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                    placeholder="New Password"
                                    onChange={(e) => setNpassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            className="inline-block mt-4 px-4 py-2 text-sm font-medium text-white bg-teal-500 border border-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            onClick={() => dispatch(changePassword({ old_password, new_password }))}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
