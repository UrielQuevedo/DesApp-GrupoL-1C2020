import { useGet, usePost } from "./HTTPService";
const path = '/auth';

export const useEditUserProfile = (userDataEdit) => {
  const { method: postEditUser, loading: userEditLoading } = usePost(`${path}/edit`, userDataEdit)
  return { postEditUser, userEditLoading};
}
