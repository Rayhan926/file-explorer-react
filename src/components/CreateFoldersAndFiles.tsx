import React from "react";
import { VscNewFile, VscNewFolder } from "react-icons/vsc";

type CreateFoldersAndFilesProps = {
  onClick: (isFolder: boolean) => void;
};
const CreateFoldersAndFiles = ({ onClick }: CreateFoldersAndFilesProps) => {
  return (
    <div className="ml-auto flex gap-1 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto absolute right-1 bg-gray-50">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick(false);
        }}
        className="p-1 hover:bg-white"
      >
        <VscNewFile size={16} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick(true);
        }}
        className="p-1 hover:bg-white"
      >
        <VscNewFolder size={16} />
      </button>
    </div>
  );
};

export default CreateFoldersAndFiles;
