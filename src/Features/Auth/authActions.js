import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../Axios/Axios'

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ firstName,lastName, username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      await axios.post(
        `/users/signup`,
        { firstName,lastName, username, password },
        config
      )
    } catch (error) {
    // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue("This Email is already exists")
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const {data}  = await axios.post(
          
          `/users/login`,
          { username, password },
          config
        )
        // store user's token in local storage

        localStorage.setItem('userToken',data.token);
        return data
      } catch (error) {
        // return custom error message from API if any
        console.log(error);
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue("Invalid Email Or Password")
        }
      }
    }
  )