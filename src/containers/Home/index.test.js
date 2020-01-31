import { shallow } from 'enzyme';
import React from 'react';
import Home from '.';

describe('<Home />', () => {
  it('renders three <Home /> components', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.contains(<h3>Welcome to Blog Central</h3>));
  });
});