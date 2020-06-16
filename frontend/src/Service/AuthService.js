import { useGet, usePost } from "./HTTPService";
import { useState } from "react";
const path = '/auth';

export const useEditUserProfile = (userDataEdit) => {
  const { method: postEditUser, loading: userEditLoading } = usePost(`${path}/edit`, userDataEdit)
  const [ error, setError ] = useState('');
  return { postEditUser, userEditLoading, error, setError };
}
