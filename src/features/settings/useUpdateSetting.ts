import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting successfully updated");

      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { updateSetting, isUpdating };
}
