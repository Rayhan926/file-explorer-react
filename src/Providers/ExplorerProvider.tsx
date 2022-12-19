import React, { createContext, ReactNode, useContext, useState } from "react";
import { explorerData } from "../data/explorerData";
import { ExplorerType } from "../types";
import { v4 as uuid } from "uuid";

type ExplorerCotext = {
  explorer: ExplorerType;
  insertItem?: (opt: InsertItem) => ExplorerType;
};
type InsertItem = {
  folderId: string;
  name: string;
  isFolder: boolean;
  tree: ExplorerType;
};
const explorerCotext = createContext<ExplorerCotext>({
  explorer: explorerData,
});

const ExplorerProvider = ({ children }: { children: ReactNode }) => {
  const [explorer] = useState(explorerData);

  const insertItem = ({
    folderId,
    isFolder,
    name,
    tree,
  }: InsertItem): ExplorerType => {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: uuid(),
        isFolder,
        name,
        items: [],
      });
    }

    const latestNode = tree.items.map((item) =>
      insertItem({
        folderId,
        isFolder,
        name,
        tree: item,
      }),
    );

    return { ...tree, items: latestNode };
  };
  return (
    <explorerCotext.Provider
      value={{
        explorer,
        insertItem,
      }}
    >
      {children}
    </explorerCotext.Provider>
  );
};

export default ExplorerProvider;

export const useExplorer = () => useContext(explorerCotext);
