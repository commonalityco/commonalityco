import { getCodeOwners } from './get-code-owners';
import { getOwnersForPath } from './get-owners-for-path';

jest.mock('./getCodeOwners');

const mockedGetCodeOwners = jest.mocked(getCodeOwners);

describe('getCodeOwners', () => {
	describe('when the file is at the root of the repo', () => {
		beforeEach(() => {
			mockedGetCodeOwners.mockReturnValue({ 'packages/**': ['@team-one'] });
		});

		it('returns an object containing the correct owners for each glob', () => {
			const owners = getOwnersForPath({
				path: 'packages/foo',
				rootDirectory: './',
			});

			expect(owners).toEqual(['@team-one']);
		});
	});
});