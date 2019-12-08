import React, { useState } from 'react';

import { ITableOption, Table } from 'react-table-component';
import { DataType, EditingMode, SortingMode } from 'react-table-component/enums';
import { EventFunc, OptionChangedFunc } from 'react-table-component/types';

const dataArray = Array(20).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const tableOption: ITableOption = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const EventsDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChanged: OptionChangedFunc = (value) => {
    changeOptions({...option, ...value });
  };

  const [data, changeData] = useState(dataArray);
  const onDataChanged: OptionChangedFunc = (newValue) => {
    changeData(newValue);
  };

  const [events, changeEvents] = useState([] as string []);
  const onEvent: EventFunc = (event, eventData) => {
    changeEvents([`event: ${event}, data:${JSON.stringify(eventData)}`, ...events]);
  };
  return (
    <>
      <Table
        {...option}
        data={data}
        onOptionChanged={onOptionChanged}
        onDataChanged={onDataChanged}
        onEvent={onEvent}
      />
      {events.map((e, i) => (<div key={i}>{e}</div>))}
    </>
  );
};

export default EventsDemo;
