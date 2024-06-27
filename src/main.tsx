import { createRoot } from "react-dom/client";
// Axios
import axios from "axios";
import { Chart, registerables } from "chart.js";
import { QueryClient, QueryClientProvider } from "react-query";
// Apps
import "./_metronic/assets/fonticon/fonticon.css";
import "./_metronic/assets/keenicons/duotone/style.css";
import "./_metronic/assets/keenicons/outline/style.css";
import "./_metronic/assets/keenicons/solid/style.css";
import "./_metronic/assets/sass/style.react.scss";
import { MetronicI18nProvider } from "./_metronic/i18n/Metronici18n";
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import { Provider } from "react-redux";
import "./_metronic/assets/sass/style.scss";
import { AuthProvider, setupAxios } from "./app/modules/auth";
import { AppRoutes } from "./app/routing/AppRoutes";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
/**src/redux/store/index.tsx
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
setupAxios(axios);
Chart.register(...registerables);

const queryClient = new QueryClient();
const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MetronicI18nProvider>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </MetronicI18nProvider>
        </PersistGate>
      </Provider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
