import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateEditCabinData } from "../../types/capinData";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

type EditUserArgs = {
  user: CreateEditCabinData;
  id: number;
};

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,

    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      queryClient.setQueryData(["user"], user);

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, updateUser };
}
