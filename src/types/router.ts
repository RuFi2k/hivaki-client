import React from "react";

export interface IRoute {
  path: string,
  exact?: boolean,
  component: React.FC,
}