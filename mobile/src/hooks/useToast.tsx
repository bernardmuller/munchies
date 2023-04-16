import { useToast as NBuseToast } from "native-base";

const useToast = () => {
	const toast = NBuseToast();
	return toast;
};

export default useToast;
