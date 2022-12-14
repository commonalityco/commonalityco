import path from 'node:path';
import fs from 'fs-extra';
import { Lockfile } from '../constants/lockfile.js';
import { PackageManager } from '../constants/package-manager.js';

export const getPackageManager = async (
	rootDirectory: string
): Promise<PackageManager> => {
	const getFileExistsAtRoot = async (fileName: string) =>
		fs.pathExists(path.join(rootDirectory, fileName));

	if (await getFileExistsAtRoot(Lockfile.NPM_LOCKFILE)) {
		return PackageManager.NPM;
	}

	if (await getFileExistsAtRoot(Lockfile.YARN_LOCKFILE)) {
		return PackageManager.YARN;
	}

	if (await getFileExistsAtRoot(Lockfile.PNPM_LOCKFILE)) {
		return PackageManager.PNPM;
	}

	throw new Error('Could not detect package manager');
};
