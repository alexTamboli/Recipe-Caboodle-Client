import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import Landing from "./components/layouts/Landing";
import './App.css'
import Login from './components/accounts/Login';
import Register from './components/accounts/Register';
import Dashboard from './components/layouts/Dashboard';
import { useSelector } from 'react-redux';
import Loading from './components/layouts/Loading';
import PrivateRoute from './utils/PrivateRoute';
import Profile from './components/accounts/Profile';
import Explore from './components/recipe/Explore';
import RecipeCreate from './components/recipe/RecipeCreate';
import RecipeDetailed from './components/recipe/RecipeDetailed';
import RecipeEdit from './components/recipe/RecipeEdit';
import MyRecipes from './components/recipe/MyRecipes';
import SavedRecipes from './components/recipe/SavedRecipes';

function App() {

  const authLoading = useSelector(state => state.auth.loading);
  return (
    <>
      <Router>
        <Header />
        {authLoading ? <Loading /> :
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/recipe" element={<Explore />} />
            <Route
              exact
              path="/recipe/:id"
              element={
                <PrivateRoute>
                  <RecipeDetailed />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/recipe/create"
              element={
                <PrivateRoute>
                  <RecipeCreate />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/recipe/:id/edit"
              element={
                <PrivateRoute>
                  <RecipeEdit />
                </PrivateRoute>
              }
            />
            <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} >
              <Route path="profile" element={<Profile />} />
              <Route path="myrecipes" element={<MyRecipes />} />
              <Route path="savedrecipes" element={<SavedRecipes />} />
            </Route>
          </Routes>
        }
      </Router>
    </>
  )
}

export default App
