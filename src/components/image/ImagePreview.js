import Image from "next/image";
import { useState, useEffect } from "react";

export default function ImagePreview({ source }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? (
        <div className="fixed top-0 left-0 h-screen w-screen z-40 bg-black flex p-1">
          <div
            className="fixed z-40 right-6 top-2 rounded-full h-[30px] w-[30px] p-1"
            onClick={() => setOpen(false)}
          >
            <span className="z-50 m-auto text-white">Close</span>
          </div>
          <div className="relative w-[90vw] h-[60vh] m-auto">
            <div>
              <Image
                src={source}
                fill
                alt={`preview modal for ${source}`}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="absolute h-full w-full z-10"
          onClick={() => setOpen(true)}
        ></div>
      )}
    </>
  );
}
