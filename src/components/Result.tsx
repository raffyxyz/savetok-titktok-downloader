import React from 'react';
import {
  Center,
  Button,
  Tabs,
  Card,
  Text,
  Image,
  Skeleton,
  Alert,
  Progress,
  Group,
} from '@mantine/core';
import { IconReportSearch, IconAlertCircle, IconHistory } from '@tabler/icons';
import useDownloader from 'react-use-downloader';
import prettyBytes from 'pretty-bytes';
import History from './History';

interface ResultProps {
  video: any;
  loader: boolean;
  invalidLink: boolean;
}

const Result: React.FC<ResultProps> = ({ video, loader, invalidLink }) => {
  const noVideoData = Object.keys(video).length === 0;

  // Downloader
  const { percentage, download, isInProgress, size, elapsed, cancel } =
    useDownloader();

  //The best download implementation
  const downloadVideo = (url: string, filename: string) => {
    download(url, `SaveTok-${filename}.mp4`);
  };

  return (
    <Tabs
      defaultValue='result'
      keepMounted={false}
      color='grape'
      sx={{ margin: '2em auto', width: '300px' }}
    >
      <Tabs.List position='center'>
        <Tabs.Tab value='result' icon={<IconReportSearch size={14} />}>
          Result
        </Tabs.Tab>
        <Tabs.Tab value='history' icon={<IconHistory size={14} />}>
          History
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value='result' pt='xs'>
        {noVideoData ? null : (
          <Card shadow='sm' p='md' radius='md' withBorder>
            <Card.Section>
              <Image src={video.cover} height={200} alt='Norway' />
            </Card.Section>
            <Text weight={500} mt='md'>
              {video.author.nickname}
            </Text>
            <Text size='sm' color='dimmed'>
              {video.title}
            </Text>

            {/* Progress bar while downloading */}
            {isInProgress ? (
              <>
                <Progress mt='md' color='grape' value={percentage} />
                <Group position='apart'>
                  <Text fz='xs' c='dimmed'>
                    {prettyBytes(size)}
                  </Text>
                  <Text fz='xs' c='dimmed'>
                    {percentage}%
                  </Text>
                </Group>
              </>
            ) : null}

            <Center>
              {!isInProgress ? (
                <Button
                  color='grape'
                  mt='md'
                  onClick={() => downloadVideo(video.play, video.id)}
                  loaderPosition='right'
                  loading={isInProgress}
                >
                  Download
                </Button>
              ) : (
                <Button color='red' mt='md' onClick={() => cancel()}>
                  Cancel
                </Button>
              )}
            </Center>
          </Card>
        )}

        {loader ? (
          <Card shadow='sm' p='md' radius='md' withBorder>
            <Card.Section>
              <Skeleton height={200} />
            </Card.Section>
            <Skeleton height={8} mt='md' />
            <Skeleton height={8} mt='md' />
            <Skeleton height={8} mt='xs' />
            <Skeleton height={8} mt='xs' />
            <Center>
              <Skeleton height={8} mt='md' width='50%' />
            </Center>
          </Card>
        ) : null}

        {invalidLink ? (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title='Invalid link!'
            color='red'
            mt={50}
          >
            Link pasted is not a tiktok link.
          </Alert>
        ) : null}
      </Tabs.Panel>

      <Tabs.Panel value='history' pt='xs'>
        <History />
      </Tabs.Panel>
    </Tabs>
  );
};

export default Result;
