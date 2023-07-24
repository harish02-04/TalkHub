import React, { useCallback, useState } from 'react';
import { Alert, Icon, Input, InputGroup } from 'rsuite';

const Editable = ({
  initial,
  label = null,
  placeholder = 'Write ur value',
  onSave,
  // eslint-disable-next-line no-unused-vars
  empty = 'Input is empty',
  ...inputprops
}) => {
  const [inp, setinp] = useState(initial);
  const [edit, setedit] = useState(false);
  const onInputChange = useCallback(value => {
    setinp(value);
  }, []);
  const oneditclick = useCallback(() => {
    setedit(p => !p);
    setinp(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onsaveclick = async () => {
    const trim = inp.trim();
    if (trim === '') {
      Alert.info('The field never be empty', 4000);
    }
    if (trim !== initial) {
      await onSave(trim);
    }
    setedit(false);
  };
  return (
    <div>
      {label}
      <InputGroup>
        <Input
          {...inputprops}
          disabled={!edit}
          placeholder={placeholder}
          value={inp}
          onChange={onInputChange}
        ></Input>
        <InputGroup.Button onClick={oneditclick}>
          <Icon icon={edit ? 'close' : 'edit'}></Icon>
        </InputGroup.Button>
        {edit && (
          <InputGroup.Button onClick={onsaveclick}>
            <Icon icon="check"></Icon>
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
};

export default Editable;
