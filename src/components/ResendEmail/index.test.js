import { shallow } from 'enzyme';
import React from 'react';
import ResendEmail from '.';

describe('<ResendEmail />', () => {
  it('renders three <ResendEmail /> components', () => {
    const wrapper = shallow(<ResendEmail />);
    expect(wrapper.contains(<p className="centre-align">A password reset email has been sent to you.</p>));
  });
});