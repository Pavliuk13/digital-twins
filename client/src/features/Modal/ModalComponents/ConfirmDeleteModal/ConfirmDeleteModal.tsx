import Modal from '@@features/Modal';
import ModalHeader from '@@features/Modal/ModalHeader';
import ModalBody from '@@features/Modal/ModalBody';
import ModalFooter from '@@features/Modal/ModalFooter';
import ConfirmButton from '@@features/Modal/shared/ConfirmButton';
import Typography from '@@components/ui/Typography';

interface ConfirmDeleteModalProps {
  title: string;
  description: string;
  onConfirm?: () => void;
}

function ConfirmDeleteModal(props: ConfirmDeleteModalProps) {
  const { title, description, onConfirm, ...modalProps } = props;

  return (
    <Modal position="center" {...modalProps}>
      <ModalHeader divider={false}>
        <Typography variant="bodyBold">{title}</Typography>
      </ModalHeader>

      <ModalBody>
        <Typography>{description}</Typography>
      </ModalBody>

      <ModalFooter withBackground={false}>
        <ConfirmButton onConfirm={onConfirm}>
          <span>Yes, delete</span>
        </ConfirmButton>
      </ModalFooter>
    </Modal>
  );
}

export default ConfirmDeleteModal;
