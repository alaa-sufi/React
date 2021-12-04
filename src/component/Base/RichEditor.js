import React, { useCallback, useMemo } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, Slate, useSlate } from "slate-react";
import { createEditor, Editor, Transforms } from "slate";
import { withHistory } from "slate-history";


import {Box ,ToggleButton , Divider } from '@mui/material';

import { FormatBold  , FormatItalic, Code , LooksOne , LooksTwo ,Looks3 , FormatUnderlined , FormatQuote , FormatListNumbered , FormatListBulleted} from '@mui/icons-material';


// import ToggleButton from "@material-ui/lab/ToggleButton";
// import Divider from "@material-ui/core/Divider";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code"
};

const RichEditor = ({ value, setValue }) => {
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Box p={1} m={2} border={1} borderColor="grey.500" borderRadius={4}>
      <Slate
        editor={editor}
        value={value}
        onChange={value => {
          setValue(value);
        }}
      >
        <Toolbar>
          <MarkButton format="bold">
            <FormatBold />
          </MarkButton>
          <MarkButton format="italic">
            <FormatItalic />
          </MarkButton>
          <MarkButton format="underline">
            <FormatUnderlined />
          </MarkButton>
          
          <BlockButton format="heading-one">
            <LooksOne />
          </BlockButton>
          <BlockButton format="heading-two">
            <LooksTwo />
          </BlockButton>
          <BlockButton format="heading-three">
            <Looks3 />
          </BlockButton>
          {/* <BlockButton format="block-quote">
            <FormatQuote />
          </BlockButton> */}
          <BlockButton format="numbered-list">
            <FormatListNumbered />
          </BlockButton>
          <BlockButton format="bulleted-list">
            <FormatListBulleted />
          </BlockButton>
        </Toolbar>
        <Box pl={1}>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter some rich text…"
            spellCheck
            autoFocus
            onKeyDown={event => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}
          />
        </Box>
      </Slate>
    </Box>
  );
};

export const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
      case "heading-three":
        return <h3 {...attributes}>{children}</h3>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, children }) => {
  const editor = useSlate();
  return (
    <Box ml={1} mt={1}>
      <ToggleButton
        value={format}
        selected={isBlockActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault();
          toggleBlock(editor, format);
        }}
        style={{ lineHeight: 1 }}
      >
        {children}
      </ToggleButton>
    </Box>
  );
};

const MarkButton = ({ format, children }) => {
  const editor = useSlate();
  return (
    <Box ml={1} mt={1}>
      <ToggleButton
        value={format}
        selected={isMarkActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault();
          toggleMark(editor, format);
        }}
        style={{ lineHeight: 1 }}
      >
        {children}
      </ToggleButton>
    </Box>
  );
};

const Menu = React.forwardRef(({ children, ...props }, ref) => (
  <>
    <Box
      display="flex"
      direction="row"
      justify="flex-start"
      alignItems="center"
      flexWrap="wrap"
    >
      {children}
    </Box>
    <Box pt={2}>
      <Divider variant="middle" />
    </Box>
  </>
));

const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
  <Menu {...props} ref={ref} />
));

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format
  });
  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export default RichEditor;