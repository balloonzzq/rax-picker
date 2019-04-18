import {createElement} from 'rax';
import renderer from 'rax-test-renderer';
import Picker from '..';

jest.mock('universal-env', () => {
  return {
    isWeex: true
  };
});

describe('Picker in weex', () => {
  it('render tag Picker', () => {
    const component = renderer.create(
      <Picker>
        <Picker.Item value={'man'} label={'man'} />
      </Picker>
    );
    let tree = component.toJSON();
    expect(tree.children[0].tagName).toEqual('TEXT');
  });
});
