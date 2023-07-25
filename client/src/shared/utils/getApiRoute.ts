import apiRoutes from "@/api/routes";

type ApiRouteKey = keyof typeof apiRoutes;

const getApiRoute = (route: ApiRouteKey) => {
	return apiRoutes[route];
};

export default getApiRoute;
