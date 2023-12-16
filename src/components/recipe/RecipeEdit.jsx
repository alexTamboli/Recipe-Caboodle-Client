import React from "react";
import RecipeForm from "./recipe_form/RecipeForm";

import { useParams } from "react-router-dom";
import axios from "axios";

export default function RecipeEdit() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    let recipe = null;

    const getRecipeToEdit = async (id) => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(`/recipe/${id}/`);
            return res.data;
        } catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }



    useEffect(() => {
        recipe = getRecipeToEdit(id)
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
        <div>
            <RecipeForm
                buttonLabel="Update"
                handleFormSubmit={handleFormSubmit}
                editMode={true}
                recipe={recipe}
            />
        </div>
    );
}
