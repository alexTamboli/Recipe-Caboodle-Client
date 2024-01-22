import React, { useEffect, useState } from "react";
import RecipeForm from "./recipe_form/RecipeForm";

import { useParams } from "react-router-dom";
import Loading from "../layouts/Loading";
import axiosInstance from "../../utils/axios";
import { useDispatch } from "react-redux";
import { setError } from "../../redux/features/error/errorSlice";

export default function RecipeEdit() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [recipe, setRecipe] = useState(null);
    const dispatch = useDispatch();

    const getRecipeToEdit = async (id) => {
        try {
            setLoading(true);
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("token")).access}`;
            const res = await axiosInstance.get(`/recipe/${id}/`);
            setRecipe(res.data);
        } catch (err) {
            dispatch(setError(err.message));
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getRecipeToEdit(id)
    }, [])


    const handleFormSubmit = async (formData) => {
        try {
            setLoading(true);
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("token")).access}`;
            axiosInstance.defaults.headers['Content-Type'] = 'multipart/form-data';
            await axiosInstance.post("/recipe/create/", formData);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
            window.location.href = `/recipe/${id}/`;
        }

    };

    return (
        <>
            {loading ? <Loading /> :
                <div>
                    <RecipeForm
                        buttonLabel="Update"
                        handleFormSubmit={handleFormSubmit}
                        editMode={true}
                        recipe={recipe}
                    />
                </div>
            }
        </>
    );
}
