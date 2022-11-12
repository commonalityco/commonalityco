import { globby } from 'globby';
import fs from 'fs-extra';
import path from 'path';

export const getPackageDirectories = async (
  rootDirectory: string,
  workspaceGlobs: string[]
): Promise<string[]> => {
  const directories = await globby(workspaceGlobs, {
    cwd: rootDirectory,
    onlyDirectories: true,
    expandDirectories: false,
    ignore: ['**/node_modules'],
  });

  const packageDirectoryPatterns = await Promise.all(
    directories.map((directory) => {
      const localPackageJsonPath = path.join(
        rootDirectory,
        directory,
        'package.json'
      );

      try {
        if (fs.pathExistsSync(localPackageJsonPath)) {
          return directory;
        }
        return null;
      } catch (error) {
        return null;
      }
    })
  );

  return packageDirectoryPatterns.filter(Boolean) as string[];
};
