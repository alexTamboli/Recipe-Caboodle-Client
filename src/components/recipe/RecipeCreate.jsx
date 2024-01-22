import React, { useState } from "react";
import RecipeForm from "./recipe_form/RecipeForm";
import axiosInstance from "../../utils/axios";
import axios from "axios";
import Loading from "../layouts/Loading";
import { setError } from "../../redux/features/error/errorSlice";
import { useDispatch } from "react-redux";

export default function RecipeCreate() {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleFormSubmit = async (formData) => {
        try {
            setLoading(true);
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("token")).access}`;
            axiosInstance.defaults.headers['Content-Type'] = 'multipart/form-data';
            const res = await axiosInstance.post("/recipe/create/", formData);
            window.location.href = `/recipe/${res.data.id}/`;
        }
        catch (err) {
            dispatch(setError(err.message));
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? <Loading /> :
                <div>
                    <RecipeForm
                        buttonLabel="Create"
                        editMode={false}
                        handleFormSubmit={handleFormSubmit}
                    />
                </div>}
        </>
    );
}
