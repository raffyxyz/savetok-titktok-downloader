import React, { useState } from 'react';
import {
  Drawer,
  Group,
  Button,
  Anchor,
  Title,
  Text,
  Space,
  Divider,
  List,
  ThemeIcon,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons';
import { headerData } from '../data';

const Header: React.FC = () => {
  const [opened, setOpened] = useState(false);
  return (
    <Group position='apart' mt='md'>
      <Anchor underline={false} size={30} variant='text' weight='bold'>
        SaveTok
      </Anchor>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title='About'
        padding='xl'
        position='right'
        size='xl'
      >
        <Divider my='sm' />
        <Title order={2} color='grape'>
          SaveTok
        </Title>
        <Text>{headerData.subTitle}</Text>
        <Space h='lg' />
        <Text>{headerData.description}</Text>
        <Space h='lg' />

        {headerData.faq?.map((data: any, idx: number) => (
          <>
            <Title order={5}>{data.question}</Title>
            <Text>{data.answer}</Text>
            <Space h='lg' />
          </>
        ))}

        <Title order={5}>Tech used</Title>
        <List
          spacing='xs'
          size='sm'
          mt='xs'
          center
          icon={
            <ThemeIcon color='teal' size={16} radius='xl'>
              <IconCheck size={14} />
            </ThemeIcon>
          }
        >
          {headerData.tech?.map((data: any, idx: number) => (
            <List.Item key={idx + data}>{data}</List.Item>
          ))}
        </List>
        <Space h='xl' />
        <Title order={5}>Developed by</Title>
        <Text>{headerData.dev}</Text>
      </Drawer>
      <Button variant='light' color='grape' onClick={() => setOpened(true)}>
        About
      </Button>
    </Group>
  );
};

export default Header;
