import { useState } from "react";
const useOnboarding = () => {
  const [shown, setShown] = useState(() => !localStorage.getItem("onboarded"));
  const complete = () => { localStorage.setItem("onboarded","1"); setShown(false); };
  return { shown, complete };
};
export default useOnboarding;