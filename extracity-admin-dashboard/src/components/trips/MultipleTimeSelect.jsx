import React from "react";
import MultiSelect from "react-multi-select-component";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 80,
  },
}));

export default function MultipleTimeSelect(props) {
  const classes = useStyles()
  const options = [];

  for (let x = 0; x < 2400; x = x + 100) {
    for (let y = 0; y < 60; y = y + 15) {
      var str = "";
      if (x === 0) {
        str = "00";
      }
      else if (x < 1000) {
        str = "0"
      }

      str = str + (x + y);
      if (str.length < 4) str = `0${str}`;
      options.push({ label: str, value: str });
    }
  }
  console.log(options);

  return (
    <div className={classes.root}>
      <MultiSelect
        options={options}
        value={props.times}
        onChange={e => props.setTimes(e)}
        labelledBy="Select"
      />
    </div>
  );
};
