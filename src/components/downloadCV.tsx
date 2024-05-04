"use client";

import { useState } from "react";

import { IoDownload } from "react-icons/io5";
import { ImSpinner6 } from "react-icons/im";

import { useSplitPathname } from "@/utils/hooks/useSplitPathname";

import { IconLink } from "./iconLink";

import { iconSize } from "@/constants";

export const DownloadCVLink = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentLang } = useSplitPathname();

  const downloadFile = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch(`/api/cv/work/${currentLang}`);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `napatchol's cv (${currentLang}).pdf`; // Specify the filename
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
    setIsLoading(false); // End loading
  };

  return (
    <IconLink
      key="CV"
      href=""
      label="CV"
      onClick={downloadFile}
      disabled={isLoading}
    >
      {isLoading ? (
        <ImSpinner6 size={iconSize} />
      ) : (
        <IoDownload size={iconSize} />
      )}
    </IconLink>
  );
};
