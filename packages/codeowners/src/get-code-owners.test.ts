/* eslint-disable @typescript-eslint/naming-convention */
import mock from 'mock-fs';
import { getCodeOwners } from './get-code-owners.js';

describe('getCodeOwners', () => {
	describe('when the file is at the root of the repo', () => {
		beforeEach(() => {
			mock({
				CODEOWNERS:
					'@global-team-one @global-team-two\n@global-team-three\n\n#This is a comment\npackages/ @team-one @team-two \n docs/*  docs@example.com',
			});
		});

		afterEach(mock.restore);

		it('returns an object containing the correct owners for each glob', async () => {
			const ownership = getCodeOwners({ rootDirectory: './' });

			expect(ownership).toEqual({
				'packages/': [
					'@team-one',
					'@team-two',
					'@global-team-one',
					'@global-team-two',
					'@global-team-three',
				],
				'docs/*': [
					'docs@example.com',
					'@global-team-one',
					'@global-team-two',
					'@global-team-three',
				],
			});
		});
	});

	describe('when there is no CODEOWNERS file', () => {
		it('returns an empty object', () => {
			const ownership = getCodeOwners({ rootDirectory: './' });

			expect(ownership).toEqual({});
		});
	});
});
