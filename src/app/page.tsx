import { AppContainer } from "@/containers/RootContainer";
import { getStore } from "@/store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const store = await getStore();

  return <AppContainer initialState={store} />;
}
