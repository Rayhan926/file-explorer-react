import React, { FormEvent, useEffect, useRef, useState } from "react";
import { FcFile, FcFolder, FcOpenedFolder } from "react-icons/fc";
import { ExplorerType } from "../types";
import { BsChevronRight } from "react-icons/bs";
import clsx from "clsx";
import CreateFoldersAndFiles from "./CreateFoldersAndFiles";
import { useExplorer } from "../Providers/ExplorerProvider";

type CreateType = {
  isFolder: boolean;
  visible: boolean;
};

type FolderProps = {
  explorer: ExplorerType;
} & React.ComponentProps<"div">;
const Folder = ({ explorer, ...props }: FolderProps) => {
  const { id, isFolder, items, name } = explorer;

  const { insertItem } = useExplorer();

  const inputRef = useRef<HTMLInputElement>(null!);
  const [create, setCreate] = useState<CreateType>({
    isFolder: true,
    visible: false,
  });

  const [expanded, setExpanded] = useState(false);

  const addFileOrFolderHandler = (isFolder: boolean) => {
    setCreate({
      isFolder,
      visible: true,
    });
    // inputRef.current.focus();
    setExpanded(true);
  };

  const closeAddOrFileHandler = () => {
    setCreate({
      ...create,
      visible: false,
    });
    if (inputRef.current.value.trim()) onCreateHandler();
  };

  const onCreateHandler = (e?: FormEvent) => {
    e?.preventDefault();
    const inputValue = inputRef.current.value.trim();
    if (!inputValue) return;
    insertItem &&
      insertItem({
        folderId: id,
        isFolder: create.isFolder,
        name: inputValue,
        tree: explorer,
      });
    setCreate({
      ...create,
      visible: false,
    });
  };

  useEffect(() => {
    if (create.visible) {
      inputRef.current.focus();
    }
  }, [create.visible]);

  // useClickAway(inputRef, () => {
  //   closeAddOrFileHandler()
  // });

  return (
    <div className={clsx("text-[14px]")} {...props}>
      <div
        className={clsx(
          "flex items-center gap-1.5 cursor-pointer px-3 py-1 hover:bg-gray-50 group relative",
          props.className,
        )}
        onClick={() => isFolder && setExpanded((prev) => !prev)}
      >
        <BsChevronRight
          size={12}
          className={clsx(
            expanded && "rotate-90",
            !isFolder && "opacity-0 pointer-events-none",
            "shrink-0",
          )}
        />
        <div className="shrink-0">
          {isFolder ? (
            expanded ? (
              <FcOpenedFolder size={17} />
            ) : (
              <FcFolder size={17} />
            )
          ) : (
            <FcFile size={17} />
          )}
        </div>
        <p className="line-clamp-1">{name}</p>
        {isFolder && <CreateFoldersAndFiles onClick={addFileOrFolderHandler} />}
      </div>
      <div className={clsx(!expanded && "hidden")}>
        {create.visible && (
          <div className="ml-[32px] py-[3px] pl-0 pr-3 flex gap-1.5 items-center">
            <div className="shrink-0 flex gap-[5px] items-center">
              <BsChevronRight
                size={12}
                className={clsx(
                  !create.isFolder && "opacity-0 pointer-events-none",
                  "shrink-0",
                )}
              />
              <div className="shrink-0">
                {create.isFolder ? (
                  <FcFolder size={17} />
                ) : (
                  <FcFile size={17} />
                )}
              </div>
            </div>
            <form onSubmit={onCreateHandler} className="grow">
              <input
                type="text"
                placeholder={create.isFolder ? "Create folder" : "Create file"}
                className="w-full outline-none border border-gray-100 focus:border-blue-500 -translate-x-px"
                ref={inputRef}
                onBlur={closeAddOrFileHandler}
              />
            </form>
          </div>
        )}
        {items.length > 0 && (
          <div className={clsx("pl-5")}>
            {items
              .sort((a, b) => {
                return a.isFolder === b.isFolder ? 0 : a.isFolder ? -1 : 1;
              })
              .map((item) => (
                <Folder explorer={item} key={item.id} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Folder;
