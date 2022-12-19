export type FolderType = {
  id: string;
  name: string;
  isFolder: boolean;
};
export type ExplorerType = {
  items: ExplorerType[];
} & FolderType;
