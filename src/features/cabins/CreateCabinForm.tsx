import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import type { CabinData, CabinFormData } from "../../types/capins";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useUpdateCabin";

function CreateCabinForm({
  cabinToEdit,
  onCloseModal,
}: {
  cabinToEdit?: CabinData;
  onCloseModal?: CallableFunction;
}) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useEditCabin();
  const isWorking = isCreating || isUpdating;
  const isEditSession = Boolean(cabinToEdit);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<CabinFormData>({
    defaultValues: cabinToEdit
      ? {
          name: cabinToEdit.name,
          description: cabinToEdit.description,
          maxCapacity: cabinToEdit.maxCapacity,
          regularPrice: cabinToEdit.regularPrice,
          discount: cabinToEdit.discount,
        }
      : {
          discount: 0,
          description: "",
        },
  });

  const onSubmit: SubmitHandler<CabinFormData> = (data) => {
    const image = data.image?.[0];

    // CREATE
    if (!isEditSession) {
      if (!image) {
        toast.error("Please select an image");
        return;
      }

      createCabin(
        {
          cabin: { ...data, image },
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );

      return;
    }

    // EDIT
    if (!cabinToEdit) return;

    updateCabin(
      {
        cabin: { ...data, image: image ?? cabinToEdit.image },
        id: cabinToEdit.id,
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      },
    );
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required",
            valueAsNumber: true,
            validate: (value) =>
              value <= getValues("regularPrice") ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors.description?.message}>
        <Textarea
          id="description"
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button
            $variation="secondary"
            type="reset"
            disabled={isWorking}
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>

          <Button disabled={isWorking}>
            {isWorking
              ? isEditSession
                ? "Updating..."
                : "Creating..."
              : isEditSession
                ? "Edit cabin"
                : "Create new cabin"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
