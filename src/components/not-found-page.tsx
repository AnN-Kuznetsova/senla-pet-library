import * as React from "react";
import {Typography} from "@mui/material";

import {THEME} from "../const";


export const NotFoundPage: React.FC = (): JSX.Element => {
  return (
    <div className="not-found-page-wrapper">
      <Typography
        variant="h2"
        color={THEME.palette.info.dark}
      >
        Sory, Page Not Found :(
      </Typography>
    </div>
  );
};
