import Modal from '@@features/Modal';
import ModalHeader from '@@features/Modal/ModalHeader';
import ModalBody from '@@features/Modal/ModalBody';
import ModalFooter from '@@features/Modal/ModalFooter';
import ConfirmButton from '@@features/Modal/shared/ConfirmButton';
import Typography from '@@components/ui/Typography';

interface ConfirmCloseModalProps {
  onConfirm?: () => void;
}

function ConfirmCloseModal(props: ConfirmCloseModalProps) {
  const { onConfirm, ...modalProps } = props;

  return (
    <Modal position="center" {...modalProps}>
      <ModalHeader divider={false}>
        <Typography variant="bodyBold">Cancel changes</Typography>
      </ModalHeader>

      <ModalBody>
        <Typography>
          The changes you made will not be saved. Continue?
        </Typography>
      </ModalBody>

      <ModalFooter withBackground={false}>
        <ConfirmButton onConfirm={onConfirm}>
          <span>Yes, don&apos;t save</span>
        </ConfirmButton>
      </ModalFooter>
    </Modal>
  );
}

export default ConfirmCloseModal;
