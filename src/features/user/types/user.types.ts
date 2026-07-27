import type { Dispatch, SetStateAction } from "react";

export interface UserDetails {
  email?: string;
  fullName?: string;
  mobile?: string
}

export interface ProfilePopUpProps {
  userDetails?: UserDetails;
  setShowProfile: Dispatch<SetStateAction<boolean>>;
}



export interface ChangePasswordForm {
    oldPassword: string
    newPassword: string
    confirmPassword: string
}

export interface ChangePasswordErrors {
    oldPassword?: string
    newPassword?: string
    confirmPassword?: string
}