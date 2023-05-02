import React, { useState } from 'react';
import { Picker } from 'antd-mobile';

interface PickerBasedSelectProps {
  options: Array<{ value: string; label: string }>;
  onChange?: (value: string) => void;
  value?: string;
}

export const PickerBasedSelect = ({
  options,
  onChange,
  value,
}: PickerBasedSelectProps) => {
  const [opened, toggleOpened] = useState(false);

  return (
    <>
      <button type="button" onClick={() => toggleOpened(true)}>
        {value || 'Wybierz'}
      </button>

      <Picker
        cancelText="Anuluj"
        confirmText="Zatwierdź"
        columns={[options]}
        visible={opened}
        onClose={() => toggleOpened(false)}
        value={value === undefined ? undefined : [value]}
        onConfirm={([selectedValue]) => {
          onChange && onChange(selectedValue as string);
          toggleOpened(false);
        }}
      />
    </>
  );
};
