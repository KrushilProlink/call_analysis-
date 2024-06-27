import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { User, UsersQueryResponse } from "./_models";

const API_URL = import.meta.env.VITE_APP_THEME_API_URL;
const USER_URL = `${API_URL}/user`;
const GET_USERS_URL = `${API_URL}/users/query`;

const getUsers = (query: string): any => {
  return null
};

const getUserById = (id: ID): any => {
  return null
}

const createUser = (user: User): any => {
  return null
}

const updateUser = (user: User): any => {
  return null
}

const deleteUser = (userId: ID): any => {
  return null
}

const deleteSelectedUsers = (userIds: Array<ID>): any => {
  return null
}

export {
  getUsers,
  deleteUser,
  deleteSelectedUsers,
  getUserById,
  createUser,
  updateUser,
};
