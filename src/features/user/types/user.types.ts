import type { Dispatch, SetStateAction } from "react";
import type { Owner } from "../../owner/types/common.types"
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


// ++++++++++++++ Primary Navbar ++++++++++++++++++=
export type UserProfileDetailsProps = {
  user?: Owner
}
