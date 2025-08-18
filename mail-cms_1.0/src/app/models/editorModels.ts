type Page = {
  name: string;
  component: string;
};

type Project = {
  pages: Page[];
};

type Editor = any; // Replace with a more specific type if available

export type StorageType = {
  type: 'self';
  autosaveChanges: number;
  onSave: ({ project, editor }: { project: Project; editor: Editor }) => Promise<void>;
  onLoad: () => Promise<{ project: Project }>;
};