import React from "react";
import ListItem from "@material-ui/core/ListItem";

export function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}
