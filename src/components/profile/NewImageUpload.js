import { useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function NewImageUpload({
  profile,
  bucket,
  onSet,
  imageName,
  profile_parameter,
}) {
  const supabase = useSupabaseClient();
  const [file, setFile] = useState(null);
  const user = useUser();

  console.log("profile is in newimagemodal ", profile);
  console.log("while user is ", user);

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
          `${profile.username}_${imageName}.${file.name.substring(
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

    onSet();
  };

  return (
    <div className="fixed top-0 left-0 z-50 h-screen w-screen flex bg-black/30">
      <div className="m-auto rounded-xl p-3 flex flex-col gap-2 bg-white">
        <input type="file" onChange={handleFileChange} />
        <button
          type="button"
          className="rounded-xl p-1 border"
          onClick={() => handleFileUpload()}
        >
          Set new picture
        </button>
        <button
          type="button"
          className="rounded-xl p-1 border"
          onClick={() => onSet()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
