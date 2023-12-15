import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon, BookmarkIcon } from "@heroicons/react/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/solid";

import QuickView from "./QuickView";
import axiosInstance from "../../utils/axios";

export default function RecipeCard({ recipe, quickview }) {
    const [open, setOpen] = useState(false);
    // const [id, setId] = useState(null);
    const [like, setLike] = useState(false);


    const likeRecipe = async (id) => {
        try {
            setLike(!like);
            const token = JSON.parse(localStorage.getItem("token")).access;
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
            if (like) {
                await axiosInstance.delete(`/recipe/${id}/like/`, null);
            } else {
                await axiosInstance.post(`/recipe/${id}/like/`, null);
            }
            console.log("Like request sent successfully!");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {

    }, [])


    return (
        <>
            <div
                key={recipe.title}
                className="bg-white overflow-hidden shadow rounded-lg"
            >
                <div className="p-5">
                    <div className="flex items-center">
                        <div className="w-0 flex-1">
                            <dl>
                                <dt>
                                    <div>
                                        <img
                                            src={recipe.picture}
                                            className="object-cover w-full h-48"
                                            alt=""
                                        />
                                    </div>
                                </dt>
                                <div className="mt-4 flex justify-between md:mt-2">
                                    <dt className="text-lg font-medium text-gray-500 truncate">
                                        {recipe.title}
                                    </dt>
                                    <dt className="text-xs font-light border border-gray-200 p-1 rounded-lg text-gray-500 truncate">
                                        by {recipe.username}
                                    </dt>
                                </div>
                                <dd>
                                    <div className="text-sm text-gray-900">{recipe.desc}</div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                        {quickview ? (
                            <button
                                className="font-medium text-teal-700 hover:text-teal-900"
                                onClick={() => {
                                    setOpen(true);
                                    setId(recipe.id);
                                }}
                            >
                                Quick View
                            </button>
                        ) : (
                            <Link
                                to={`/recipe/${recipe.id}`}
                                className="font-medium text-teal-700 hover:text-teal-900"
                            >
                                View detail
                            </Link>
                        )}
                    </div>

                    <div className="flex space-x-2">
                        <button type="button">
                            {like ?
                                <SolidHeart
                                    className="h-6 w-6 text-red-500 "
                                    aria-hidden="true"
                                    onClick={() => {
                                        likeRecipe(recipe.id);
                                    }}
                                /> :
                                <HeartIcon
                                    className="h-6 w-6 text-gray-400 hover:text-red-500 transition duration-500 ease-in-out "
                                    aria-hidden="true"
                                    onClick={() => {
                                        likeRecipe(recipe.id);
                                    }}
                                />
                            }
                        </button>

                        <div className="w-px h-6 bg-gray-400" />
                        <button type="button">
                            <BookmarkIcon
                                className="h-6 w-6 text-gray-400"
                                aria-hidden="true"
                                onClick={() => {
                                    dispatch(saveRecipe(recipe.author, id));
                                }}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
