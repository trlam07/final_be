import mongoose from "mongoose";
import Movie from '../models/MovieModel.js';
import { handleResponseSuccess, handleResponseError } from "../utils/response.js";

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find()
        handleResponseSuccess(res, 200, 'Get movies successfully', {movies})
    } catch (error) {
        handleResponseError(res, 500, 'Internal Server Error')
    }
};

const getMovieById = async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, 'Invalid movie id')
        return;
    }
    const checkMovieInDb = await Movie.findById(id)
    if(!checkMovieInDb) {
        handleResponseError(res, 404, 'Movie not found')
        return;
    }
    handleResponseSuccess(res, 200, 'Get movie successfully', {...checkMovieInDb._doc})
}

const createNewMovie = async (req, res) => {
    const {title, year, poster} = req.body;
    if(!title || !year || !poster) {
        handleResponseError(res, 400, 'Bad request. All fields are required.')
        return;
    }
    try {
        const newMovie = await Movie.create({...req.body})
        handleResponseSuccess(res, 200, 'Create new movie successflly', {newMovie})
    } catch (error) {
        console.log('error', error)
        handleResponseError(res, 500, 'Internal Server Error')
    }
};

const updateMovie = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, 'Invalid movie id')
        return;
    }
    const checkMovieInDb = await Movie.findById(id)
    if(!checkMovieInDb) {
        handleResponseError(res, 404, 'Movie not found')
        return;
    }
    const {title, year, poster} = req.body
    console.log({title, year, poster})
    console.log('req.body', req.body)
    if(!req.body) {
        handleResponseError(res, 400, 'At least one field is requied.')
        return;
    }
    try {
        await checkMovieInDb.updateOne({...req.body})
        handleResponseSuccess(res, 200, 'Update movie successfully.', {movie: {...checkMovieInDb._doc, ...req.body}})
        return;
    } catch (error) {
        console.log('error', error)
        handleResponseError(res, 500, 'Internal Server Error')
    }
};

const deleteMovie = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, 'Invalid movie id')
        return;
    }
    const checkMovieInDb = await Movie.findById(id)
    if(!checkMovieInDb) {
        handleResponseError(res, 404, 'Movie not found')
        return;
    }
    try {
        await Movie.findByIdAndDelete(id)
        handleResponseSuccess(res, 200, 'Delete movie successfully.')
    } catch (error) {
        console.log('error', error)
        handleResponseError(res, 500, 'Internal Server Error')
    }
};



export {getMovies, getMovieById, createNewMovie, updateMovie, deleteMovie}