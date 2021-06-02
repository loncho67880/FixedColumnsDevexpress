import * as fromHeader from './header.actions';
import { initialState } from './header.reducer';
describe('Header actions', () => {
  it('should return actions', () => {
    expect(fromHeader.loadHeaderInfo({header: initialState}).type).toBe('[Header] Load header information');
    expect(fromHeader.loadOptionsInfo({options: initialState.options}).type).toBe('[Header] Load options information');
    expect(fromHeader.requestLoadHeaderInfo().type).toBe('[Header] Request header information');
    expect(fromHeader.requestLoadHeaderOptionsInfo().type).toBe('[Header] Request options information');
  });
});
