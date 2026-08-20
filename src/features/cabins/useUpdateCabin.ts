import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateEditCabinData } from "../../types/capinData";
import { createUpdateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

type EditCabinArgs = {
  cabin: CreateEditCabinData;
  id: number;
};

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: ({ cabin, id }: EditCabinArgs) => createUpdateCabin(cabin, id),

    onSuccess: () => {
      toast.success("Cabin successfully updated");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, updateCabin };
}
