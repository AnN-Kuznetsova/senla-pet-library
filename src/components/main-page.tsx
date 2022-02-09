import * as React from "react";
import {Outlet} from "react-router-dom";
import {Stack} from "@mui/material";

import {Header} from "./header";


export const MainPage: React.FC = (): JSX.Element => {
  return (
    <>
      <Header />

      <main>
        <Stack spacing={2} direction="row" style={{width: "100%"}}>
          <Outlet />
        </Stack>
      </main>
    </>
  );
};
