import { ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  targetNode: ReactNode;
  children: ReactNode;
}

function Portal(props: PortalProps) {
  const { targetNode = document.body, children } = props;

  const element = useRef(document.createElement('div'));

  useEffect(() => {
    const { current } = element;

    targetNode.appendChild(current);

    return () => {
      targetNode.removeChild(current);
    };
  }, [targetNode]);

  return ReactDOM.createPortal(children, element.current);
}

export default Portal;
