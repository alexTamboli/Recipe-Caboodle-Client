import { useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon, BookmarkIcon } from "@heroicons/react/outline";
import { HeartIcon as SolidHeart, BookmarkIcon as SolidBookmark } from "@heroicons/react/solid";
import { likeRecipe } from "../../utils/likeFun";
import { bookmarkRecipe } from "../../utils/bookmarkFun";
import { setError } from "../../redux/features/error/errorSlice";
import { useDispatch } from "react-redux";

export default function RecipeCard({ recipe, quickview, liked_array, bookmarked_array, setOpen, setId }) {

    const dispatch = useDispatch();

    const linearSearch = (arr, target) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === target) {
                return true;
            }
        }
        return false;
    };

    const handleLike = async (id) => {
        try {
            await likeRecipe(id, like, setLike);
        } catch (error) {
            dispatch(setError(error.message));
        }
    }

    const handleBookmark = async (id) => {
        try {
            await bookmarkRecipe(id, bookmark, setBookmark);
        } catch (error) {
            dispatch(setError(error.message));
        }
    }

    const [like, setLike] = useState(linearSearch(liked_array, recipe.id));
    const [bookmark, setBookmark] = useState(linearSearch(bookmarked_array, recipe.id));

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
                                    onClick={() => handleLike(recipe.id)}
                                /> :
                                <HeartIcon
                                    className="h-6 w-6 text-gray-400 hover:text-red-500 transition duration-500 ease-in-out "
                                    aria-hidden="true"
                                    onClick={() => handleLike(recipe.id)}
                                />
                            }
                        </button>

                        <div className="w-px h-6 bg-gray-400" />
                        <button type="button">
                            {bookmark ?
                                <SolidBookmark
                                    className="h-6 w-6 text-green-500"
                                    aria-hidden="true"
                                    onClick={() => {
                                        handleBookmark(recipe.id);
                                    }}
                                /> :
                                <BookmarkIcon
                                    className="h-6 w-6 text-gray-400"
                                    aria-hidden="true"
                                    onClick={() => {
                                        handleBookmark(recipe.id);
                                    }}
                                />
                            }
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
