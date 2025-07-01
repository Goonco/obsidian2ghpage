export type Frontmatter = {
  title: string;
  descritpion: string;
  modified: string;
};

export type FileNode = {
  type: "file";
  name: string;
  frontmatter: Frontmatter;
};

export type DirectoryNode = {
  type: "directory";
  name: string;
  children: FileSystemNode[];
};

export type FileSystemNode = FileNode | DirectoryNode;
