import { MantineProvider, Container, Title } from '@mantine/core';
import Header from './components/Header';

export default function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Quicksand, sans-serif',
        headings: { fontFamily: 'Quicksand, sans-serif' },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Container size='md' px='md'>
        <Header />

        <Title order={3} align='center' sx={{ marginTop: '4em' }}>
          Tiktok Video Downloader
        </Title>
        <Title order={6} align='center'>
          Download Tiktok Videos Without Watermark
        </Title>
      </Container>
    </MantineProvider>
  );
}
