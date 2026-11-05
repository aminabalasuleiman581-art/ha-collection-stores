import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { cream: "#faf7f1", cocoa: "#5b392d", sand: "#e9dfd2", ink: "#29231f" }, fontFamily: { serif: ["Georgia", "serif"] } } },
  plugins: []
};
export default config;
