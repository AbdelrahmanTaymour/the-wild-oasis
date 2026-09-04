import type { CreateEditCabin } from "../types/capins";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createUpdateCabin(
  newCabin: CreateEditCabin,
  id?: number,
) {
  const hasImagePath =
    typeof newCabin.image === "string" &&
    newCabin.image?.startsWith?.(supabaseUrl);

  const imageName =
    `${Math.random()}-${typeof newCabin.image === "string" ? "image" : newCabin.image.name}`.replaceAll(
      "/",
      "",
    );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit a cabin
  let data, error;

  // A) CREATE
  if (!id) {
    ({ data, error } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single());
  }

  // B) UPDATE
  if (id) {
    ({ data, error } = await supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select()
      .single());
  }

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  if (hasImagePath) return data;

  // 2. Upload its image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if thare was an eror uploading image
  if (storageError) {
    console.log("data:", data.id);
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created",
    );
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
}
