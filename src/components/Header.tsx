import React, { useState } from "react";
import {
  useMantineColorScheme,
  Drawer,
  Group,
  ActionIcon,
  Button,
  Anchor,
  Title,
  Text,
  Space,
  Divider,
  List,
  ThemeIcon,
} from "@mantine/core";
import { IconCheck, IconSun, IconMoonStars } from "@tabler/icons";
import { headerData } from "../data";

const Header: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Group position="apart" mt="md">
      <Anchor underline={false} size={30} variant="text" weight="bold">
        TikTok
        <Text component="span" color="grape">
          Save
        </Text>
      </Anchor>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="About"
        padding="xl"
        position="right"
        size="xl"
      >
        <Divider my="sm" />
        <Title order={2}>
          TikTok
          <Text component="span" color="grape">
            Save
          </Text>
        </Title>
        <Text>{headerData.subTitle}</Text>
        <Space h="lg" />
        <Text>{headerData.description}</Text>
        <Space h="lg" />

        {headerData.faq?.map((data: any, idx: number) => (
          <div key={idx}>
            <Title order={5}>{data.question}</Title>
            <Text>{data.answer}</Text>
            <Space h="lg" />
          </div>
        ))}

        <Title order={5}>Tech used</Title>
        <List
          spacing="xs"
          size="sm"
          mt="xs"
          center
          icon={
            <ThemeIcon color="teal" size={16} radius="xl">
              <IconCheck size={14} />
            </ThemeIcon>
          }
        >
          {headerData.tech?.map((data: any, idx: number) => (
            <List.Item key={idx + data}>{data}</List.Item>
          ))}
        </List>
        <Space h="xl" />
        <Title order={5}>Developed by</Title>
        <Text>{headerData.dev}</Text>
      </Drawer>
      <Group>
        <ActionIcon
          variant="transparent"
          color={dark ? "yellow" : "dark"}
          onClick={() => toggleColorScheme()}
          title={dark ? "Light mode" : "Dark mode"}
        >
          {dark ? <IconSun /> : <IconMoonStars />}
        </ActionIcon>
        <Button variant="light" color="grape" onClick={() => setOpened(true)}>
          About
        </Button>
      </Group>
    </Group>
  );
};

export default Header;
