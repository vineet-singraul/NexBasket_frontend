import type { Dispatch, SetStateAction } from 'react'

export interface User {
  _id: string;
  fullName: string;
  email: string;
  mobile: string;
  role: "user" | "admin";
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface Pagination {
  totalUsers: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GetAllUsersResponse {
  success: boolean;
  message: string;
  users: User[];
  pagination: Pagination;
}

export type UserlistPageProps = {
  users: User[]
  page: number
  pagination: Pagination | null
  setPage: Dispatch<SetStateAction<number>>
}