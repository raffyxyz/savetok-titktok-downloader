import React from 'react';
import {
  Group,
  Image,
  Text,
  ActionIcon,
  Box,
  Tooltip,
  ScrollArea,
} from '@mantine/core';
import { IconTrash, IconCopy, IconCircleMinus } from '@tabler/icons';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/dexie';
import { useHistory } from '../store/historyStore';

const History: React.FC = () => {
  const copyLink = useHistory((state) => state.copyLink);
  const deleteVideo = useHistory((state) => state.deleteVideo);
  const clearHistory = useHistory((state) => state.clearHistory);
  const trimTitle = useHistory((state) => state.trimTitle);

  const history = useLiveQuery(() =>
    db.history.orderBy('id').reverse().toArray()
  );

  const historyLength = history?.length;
  return (
    <>
      <Group position='right'>
        <Tooltip label='Delete history.' color='red' position='top' withArrow>
          <ActionIcon
            color='red'
            variant='transparent'
            mb={10}
            onClick={() => clearHistory(historyLength)}
          >
            <IconTrash size={18} />
          </ActionIcon>
        </Tooltip>
      </Group>

      <ScrollArea style={{ height: 450 }}>
        {history?.map((h: any) => (
          <Box
            key={h.id}
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
              textAlign: 'center',
              padding: theme.spacing.xl,
              borderRadius: theme.radius.md,
              cursor: 'pointer',
              marginBottom: '5px',

              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[5]
                    : theme.colors.gray[1],
              },
            })}
          >
            <Group position='apart'>
              <Image
                src={h.cover}
                radius='sm'
                fit='cover'
                height={40}
                width={50}
                alt='Video cover'
                withPlaceholder
              />
              <Tooltip
                multiline
                width={220}
                withArrow
                transition='fade'
                transitionDuration={200}
                color='grape'
                label={h.title}
              >
                <Text size='xs'>{trimTitle(h.title)}</Text>
              </Tooltip>
              <Group spacing={-1}>
                <ActionIcon color='blue' onClick={() => copyLink(h.url)}>
                  <IconCopy size={16} />
                </ActionIcon>
                <ActionIcon color='red' onClick={() => deleteVideo(h.id)}>
                  <IconCircleMinus size={16} />
                </ActionIcon>
              </Group>
            </Group>
          </Box>
        ))}
      </ScrollArea>
    </>
  );
};

export default History;
