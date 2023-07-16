import DatePicker from "react-datepicker";
import { useState } from "react";
import { getMonth, getYear } from 'date-fns';
import range from "lodash/range";
import "react-datepicker/dist/react-datepicker.css";

const DatepickerField = ({
  
  field, 
  form, 
  ...props

}) => (
 <div>
  <DatePicker
  className='mt-3 ml-3'
  selected={field.value}
  onChange={(val) => form.setFieldValue(field.name, val)}
  dateFormat="MM-yyyy"
  showMonthYearPicker
  />
  </div>
);

export default DatepickerField;