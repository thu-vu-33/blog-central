import { shallow } from 'enzyme';
import React from 'react';
import Trending from '.';

describe('<Trending />', () => {
  it('renders  <Trending /> components', () => {
    const snap = shallow(<Trending
      article={{ preview: 'Article', image: '', title: 'title', updated_at: '2020-03-11T10:18:46.995214Z', likes_count: '65',
      author:{ username: 'profx'} }}
    />);
    expect(snap).toMatchSnapshot();
  });
});