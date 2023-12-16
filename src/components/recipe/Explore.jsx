import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import RecipeCard from "./RecipeCard";
import axiosInstance from "../../utils/axios";
import Loading from "../layouts/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserExtraDetails } from "../../redux/features/user/userSlice";

export default function Explore() {
    const [recipes, setRecipes] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const cardLoad = useSelector(state => state.user.loading);
    const liked_array = useSelector(state => state.user.liked_recipes);
    const dispatch = useDispatch();

    const getRecipes = async () => {
        try {
            setIsLoading(true);
            const res = await axiosInstance.get("/recipe");
            setRecipes(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        getRecipes();
        dispatch(fetchUserExtraDetails());
    }, []);

    if (recipes && recipes.length === 0)
        return (
            <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-15">
                <p className="text-3xl text-center text-gray-700">
                    Can not find any recipes, sorry 🥲
                </p>
            </div>
        );

    return (
        <>
            {isLoading ? <Loading /> :
                <div className="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-14">
                    <div className="flex flex-col w-full mb-6 lg:justify-between lg:flex-row md:mb-8">
                        <div className="flex items-center mb-5 md:mb-6 group lg:max-w-xl">
                            <a href="/" aria-label="Item" className="mr-3">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-50">
                                    <svg
                                        className="w-12 h-12 text-teal-600"
                                        stroke="currentColor"
                                        viewBox="0 0 52 52"
                                    >
                                        <polygon
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            fill="none"
                                            points="29 13 14 29 25 29 23 39 38 23 27 23"
                                        />
                                    </svg>
                                </div>
                            </a>
                            <h2 className="font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl">
                                <span className="inline-block mb-2">Recipes</span>
                                <div className="h-1 ml-auto duration-300 origin-left transform bg-teal-600 scale-x-30 group-hover:scale-x-100" />
                            </h2>
                        </div>
                        <p className="w-full text-gray-700 lg:text-sm lg:max-w-md">
                            "Cooking is not difficult. Everyone has a taste, even if they don’t
                            realize it. Even if you’re not a great chef, there’s nothing to stop
                            you from understanding the difference between what tastes good and
                            what doesn’t."
                        </p>
                    </div>
                    {cardLoad ? <Loading /> :
                        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {recipes.map((recipe, id) => (
                                <RecipeCard key={id} recipe={recipe} liked_array={liked_array} quickview={true} />
                            ))}
                        </div>
                    }

                </div>
            }
        </>
    );
}
