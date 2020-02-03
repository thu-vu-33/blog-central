import { shallow } from 'enzyme';
import React from 'react';
import NotFound from '.';

describe('<ResendEmail />', () => {
  it('renders three <ResendEmail /> components', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.contains(<span className="card-title center-align text-primary brand m-b--30 m-t--15">
    OOP'S 404
  </span>));
  });
});