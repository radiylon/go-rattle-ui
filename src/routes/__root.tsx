import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import Header from "../components/Header";
import { ToastProvider } from "../components/ui";

export const Route = createRootRoute({
	component: () => (
		<ToastProvider>
			<Header />
			<Outlet />
			{!import.meta.env.PROD && (
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
			)}
		</ToastProvider>
	),
});
