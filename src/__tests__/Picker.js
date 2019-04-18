import {createElement, Component} from 'rax';
import renderer from 'rax-test-renderer';
import Picker from '..';

describe('Picker', () => {
  it('should render Picker', () => {
    const tree = renderer.create(
      <Picker>
        <Picker.Item value={'man'} label={'man'} />
      </Picker>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
