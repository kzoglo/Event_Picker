import { expect } from 'chai';
import sinon from 'sinon';

import * as predicates from '../../tools/predicates';

describe('Predicates', () => {
  const spy = sinon.spy(predicates, 'isEqual');

  before(() => {
    spy.resetHistory();
  });

  afterEach(() => {
    spy.resetHistory();
  });

  it('isEqual', () => {
    const items = [1, '1', '', undefined];
    items.forEach((elem) => {
      const result = predicates.isEqual(elem, elem);
      expect(result).to.be.eq(true);
    });
    expect(spy.callCount).to.be.eq(items.length);
  });
});
