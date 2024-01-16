import React from "react";
import { Group, TextInput, Button, ActionIcon } from "@mantine/core";
import { IconLink, IconX } from "@tabler/icons";
import { useForm } from "@mantine/form";
import { useVideo } from "../store/videoStore";
import Result from "./Result";

const Fields: React.FC = () => {
  const video = useVideo((state) => state.video);
  const loading = useVideo((state) => state.loading);
  const notTiktokLink = useVideo((state) => state.notTiktokLink);
  const fetchVideo = useVideo((state) => state.fetchVideo);

  //use form validation
  const form = useForm({
    initialValues: {
      link: "",
    },

    validate: {
      link: (value) =>
        value.length === 0
          ? "Link should not be empty"
          : /^(ftp|http|https):\/\/[^ "]+$/.test(value)
          ? null
          : "Input is not a link",
    },
  });

  function handleClearInputBox() {
    form.reset();
  }
  return (
    <>
      <div style={{ marginTop: "4em" }}>
        <form
          onSubmit={form.onSubmit((values) => fetchVideo(values.link))}
          autoComplete="off"
        >
          <Group position="center" spacing="xs" align="flex-start">
            <TextInput
              placeholder="Paste link here"
              size="lg"
              sx={{ width: "600px" }}
              icon={<IconLink size={14} />}
              rightSection={
                form.values.link !== "" && (
                  <ActionIcon variant="transparent">
                    <IconX size={14} onClick={handleClearInputBox} />
                  </ActionIcon>
                )
              }
              {...form.getInputProps("link")}
            />
            <Button
              size="lg"
              color="grape"
              loading={loading}
              loaderPosition="right"
              type="submit"
            >
              Get Video
            </Button>
          </Group>
        </form>
      </div>

      <Result video={video} loader={loading} invalidLink={notTiktokLink} />
    </>
  );
};

export default Fields;
