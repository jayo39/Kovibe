import React, { useCallback, useRef, useState } from "react";
import { Lock, LockOpen, TextFields } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  LinkBubbleMenu,
  MenuButton,
  RichTextEditor,
  RichTextReadOnly,
  TableBubbleMenu,
  insertImages,
} from "mui-tiptap";

// Import your helper files
import EditorMenuControls from "./editorMenuControls";
import useExtensions from "./useExtensions";

function fileListToImageFiles(fileList) {
  return Array.from(fileList).filter((file) => {
    const mimeType = (file.type || "").toLowerCase();
    return mimeType.startsWith("image/");
  });
}

const MyEditor = () => {
  const extensions = useExtensions({
    placeholder: "내용을 입력해주세요...",
  });
  
  const rteRef = useRef(null);
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);
  const [submittedContent, setSubmittedContent] = useState("");

  const handleNewImageFiles = useCallback((files, insertPosition) => {
    if (!rteRef.current?.editor) return;

    const attributesForImageFiles = files.map((file) => ({
      src: URL.createObjectURL(file),
      alt: file.name,
    }));

    insertImages({
      images: attributesForImageFiles,
      editor: rteRef.current.editor,
      position: insertPosition,
    });
  }, []);

  const handleDrop = useCallback((view, event) => {
    if (!(event instanceof DragEvent) || !event.dataTransfer) return false;
    const imageFiles = fileListToImageFiles(event.dataTransfer.files);
    if (imageFiles.length > 0) {
      const insertPosition = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos;
      handleNewImageFiles(imageFiles, insertPosition);
      event.preventDefault();
      return true;
    }
    return false;
  }, [handleNewImageFiles]);

  const handlePaste = useCallback((_view, event) => {
    if (!event.clipboardData) return false;
    const pastedImageFiles = fileListToImageFiles(event.clipboardData.files);
    if (pastedImageFiles.length > 0) {
      handleNewImageFiles(pastedImageFiles);
      return true;
    }
    return false;
  }, [handleNewImageFiles]);

  return (
    <Box sx={{ width: "100%", margin: "0 auto"}}>
      <RichTextEditor
        ref={rteRef}
        extensions={extensions}
        content="" // Start empty
        editable={isEditable}
        editorProps={{
          handleDrop: handleDrop,
          handlePaste: handlePaste,
        }}
        renderControls={() => <EditorMenuControls />}
        RichTextFieldProps={{
          variant: "outlined",
          sx: {"& .ProseMirror": {minHeight: "300px", outline: "none"}},
          MenuBarProps: { hide: !showMenuBar },
          footer: (
            <Stack direction="row" spacing={2} sx={{ borderTop: "1px solid #ddd", py: 1, px: 1.5 }}>
              <MenuButton
                value="formatting"
                tooltipLabel={showMenuBar ? "Hide formatting" : "Show formatting"}
                size="small"
                onClick={() => setShowMenuBar((prev) => !prev)}
                selected={showMenuBar}
                IconComponent={TextFields}
              />
              <MenuButton
                value="editable"
                tooltipLabel={isEditable ? "Lock" : "Unlock"}
                size="small"
                onClick={() => setIsEditable((prev) => !prev)}
                selected={!isEditable}
                IconComponent={isEditable ? Lock : LockOpen}
              />
            </Stack>
          ),
        }}
      >
        {() => (
          <>
            <LinkBubbleMenu />
            <TableBubbleMenu />
          </>
        )}
      </RichTextEditor>

      {/* Preview Section */}
      {submittedContent && (
        <Box mt={4} p={2} border="1px dashed #ccc">
          <Typography variant="h6">Preview Result:</Typography>
          <RichTextReadOnly content={submittedContent} extensions={extensions} />
        </Box>
      )}
    </Box>
  );
};

export default MyEditor;