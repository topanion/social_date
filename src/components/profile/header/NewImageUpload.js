import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function NewImageUpload({
  profile,
  bucket,
  imageName,
  profile_parameter,
  close,
}) {
  const supabase = useSupabaseClient();
  const [file, setFile] = useState(null);

  const publicUrl =
    "https://stilftnvhmqkbysfvptr.supabase.co/storage/v1/object/public/" +
    bucket +
    "/";

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (file) {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(
          `${profile.id}_${imageName}.${file.name.substring(
            file.name.lastIndexOf(".") + 1
          )}`,
          file,
          { upsert: true }
        );
      if (error) console.log("error during upload");
      else {
        const {
          data: update,
          error: updateError,
          statusText,
        } = await supabase
          .from("profiles")
          .update({ [profile_parameter]: `${publicUrl}${data.path}` })
          .eq("id", profile.id)
          .select("*");

        if (updateError) {
          console.log("error is ", updateError);
        } else {
        }
      }
    }

    close();
  };

  return (
    <div className="m-auto flex flex-col gap-2">
      <input type="file" onChange={handleFileChange} />
      <button
        type="button"
        className="rounded-xl p-1 border"
        onClick={() => handleFileUpload()}
      >
        Set new picture
      </button>
    </div>
  );
}
