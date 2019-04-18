import {Component, createElement} from 'rax';
import {isWeex} from 'universal-env';
import View from 'rax-view';
import Text from 'rax-text';

function Picker(props) {
  let { children, selectedValue } = props;
  let style = {
    ...styles.initial,
    ...props.style,
  };
  let textStyle = {
    color: style.color,
    fontSize: style.fontSize,
    fontStyle: style.fontStyle,
    fontWeight: style.fontWeight,
    textAlign: style.textAlign,
    textDecoration: style.textDecoration,
    textOverflow: style.textOverflow,
    lineHeight: style.lineHeight
  };

  const pickerData = getPickerData();
  const selectedLabel = getPickerLableByValue(selectedValue);

  function getPickerData() {
    let pickerItems = [],
      pickerLabelList = [],
      items = [],
      selectIndex = 0,
      selectedLabel;

    if (children.length) {
      pickerItems = children;
    } else {
      pickerItems = [children];
    }

    pickerLabelList = pickerItems.map((item, index) => {
      let {value, label, color} = item.props;
      items.push({
        value: value,
        label: label || value,
      });
      if (value == selectedValue) {
        selectIndex = index;
        selectedLabel = label;
      }
      return label;
    });

    return {
      selectIndex: selectIndex,
      selectedLabel: selectedLabel,
      pickerLabelList: pickerLabelList,
      items: items,
    };
  }

  function getPickerDataByIndex(index) {
    return {
      value: pickerData.items[index].value,
      label: pickerData.items[index].label,
    };
  }

  function getPickerLableByValue(value) {
    let label = '';
    for (let i = 0; i < pickerData.items.length; i++) {
      if (pickerData.items[i].value == value) {
        label = pickerData.items[i].label;
      }
    }
    return label;
  }

  function handleClick(webIndex) {
    const {
      onValueChange
    } = props;

    if (isWeex) {
      const picker = __weex_require__('@weex-module/picker');
      picker.pick({
        index: pickerData.selectIndex,
        items: pickerData.pickerLabelList,
      }, event => {
        if (event.result === 'success') {
          let index = event.data;
          let {value} = getPickerDataByIndex(index);
          onValueChange && onValueChange(value, index);
        }
      });
    } else {
      let {value} = getPickerDataByIndex(webIndex);
      onValueChange && onValueChange(value, webIndex);
    }
  }

  if (isWeex) {
    return (
      <View {...props} onClick={handleClick} style={style}>
        <Text style={textStyle}>
          {selectedLabel}
        </Text>
      </View>
    );
  } else {
    return (
      <select style={style} onChange={(e) => {
        handleClick(e.target.options.selectedIndex);
      }}>
        {
          pickerData.items.map((item, index) => {
            if (index == pickerData.selectIndex) {
              return <option selected="selected" value={item.value}>{item.label}</option>;
            } else {
              return <option value={item.value}>{item.label}</option>;
            }
          })
        }
      </select>
    );
  }
}

function Item(props) {
  return null;
}

Picker.Item = Item;

const styles = {
  initial: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  }
};

export default Picker;
