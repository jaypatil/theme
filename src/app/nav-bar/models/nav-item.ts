import { Resource } from "../../database";

export interface NavItem extends Resource {
    name: string;
    navlink: string;
}