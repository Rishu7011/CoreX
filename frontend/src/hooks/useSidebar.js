import useLocalStorage from "./useLocalStorage";
const useSidebar = () => {
  const [collapsed, setCollapsed] = useLocalStorage("sidebar-collapsed", false);
  return { collapsed, toggle: () => setCollapsed((c) => !c) };
};
export default useSidebar;