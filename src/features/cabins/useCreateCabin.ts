import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateEditCabin } from "../../types/capins";
import { createUpdateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

type CreateCabinArgs = {
  cabin: CreateEditCabin;
};

export function useCreateCabin() {
  const queryClient = useQueryClient();

  // CREATE
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: ({ cabin }: CreateCabinArgs) => createUpdateCabin(cabin),

    onSuccess: () => {
      toast.success("Cabin successfully created");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { isCreating, createCabin };
}
