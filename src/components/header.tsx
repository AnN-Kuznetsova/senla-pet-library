import * as React from "react";
import {Button, Stack} from "@mui/material";
import {NavLink} from "react-router-dom";

import {AppRoute, ThemeMode} from "../const";


export const Header: React.FC = (): JSX.Element => {


  return (
    <header>
      <Stack spacing={2} direction="row" className="header" >
        <NavLink to={AppRoute.MAIN} >
          <Button
            variant="contained"
            color={ThemeMode.INFO}
          >
            Go back to the main page
          </Button>
        </NavLink>

        <NavLink to={AppRoute.CHART_PAGE}>
          <Button
            variant="contained"
            color={ThemeMode.INFO}
          >
            Show Chart
          </Button>
        </NavLink>
      </Stack>
    </header>
  );
};
