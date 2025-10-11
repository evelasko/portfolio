import { generatePathnames } from "../lib/structure";
import structure from "../lib/structure";

// Generate pathnames from the single source of truth structure
export const pathnames = generatePathnames(structure);
