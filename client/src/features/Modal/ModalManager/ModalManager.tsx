import { Suspense } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentModals } from '@@store/modals/selectors';

import { modalComponentLookupTable } from './utils';

function ModalManager() {
  const currentModals = useSelector(selectCurrentModals);
  console.log({ currentModals });

  return currentModals.map(
    ({ _modalId, modalType, modalProps = {} }, index) => {
      const ModalComponent = modalComponentLookupTable[modalType];

      if (!ModalComponent) {
        return null;
      }

      return (
        <Suspense key={_modalId} fallback={null}>
          <ModalComponent
            {...modalProps}
            type={modalType}
            isTopModal={currentModals.length - 1 === index}
          />
        </Suspense>
      );
    },
  );
}

export default ModalManager;
