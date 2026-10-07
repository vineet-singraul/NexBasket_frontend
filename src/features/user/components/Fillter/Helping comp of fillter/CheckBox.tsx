import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import type { CheckBoxProps } from "../../../types/filters.types";
import styles from "../../../../../styles/userStyle/Filters.module.css";

const CheckBox = ({ filter, value, onChange }: CheckBoxProps) => {
  return (
    <div>
      <h3 className={styles.sectionTitle}>{filter.name}</h3>

      <div className={styles.optionList}>
        {filter.options?.map((option) => (
          <div key={option._id} className={styles.option}>
            <FormControlLabel
              control={
               <Checkbox
                  size="small"
                  disableRipple
                  checked={value.includes(option.value)}
                  onChange={() => onChange(filter.key, option.value)}/>
                }
              label={
                <>
                  {option.value}
                  <span className={styles.optionCount}>({option.count})</span>
                </>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckBox;
