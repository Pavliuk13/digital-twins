import { CSSProperties, ReactNode } from 'react';
import { CopyBlock as ReactCodeBlock, hybrid } from 'react-code-blocks';

interface CodeBlockProps {
  children: ReactNode;
  language: 'c';
  customStyle: CSSProperties;
  onCopy?: () => void;
}

function CodeBlock(props: CodeBlockProps) {
  const { children, language = 'c', customStyle, onCopy = () => {} } = props;

  return (
    <ReactCodeBlock
      text={children}
      language={language}
      theme={hybrid}
      showLineNumbers={false}
      wrapLongLines
      customStyle={customStyle}
      onCopy={onCopy}
    />
  );
}

export default CodeBlock;
