import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Container,
  Title,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import Header from "./components/Header";
import Fields from "./components/Fields";

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          fontFamily: "Inter, sans-serif",
          headings: { fontFamily: "Inter, sans-serif" },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider position="bottom-center">
          <Container size="md" px="md">
            <Header />

            <Title order={3} align="center" sx={{ marginTop: "4em" }}>
              Tiktok Video Downloader
            </Title>
            <Title order={6} align="center">
              Download Tiktok Videos Without Watermark
            </Title>

            <Fields />
          </Container>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
