import { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from '@@features/Modal';

import { Location } from '@@types/locations';

import LocationForm from './LocationForm';

import { getDefaultFormState } from './configs';
import { schema } from './schema';

interface LocationModalProps {
  data?: Location;
  onSubmit?: () => void;
  onDelete?: () => void;
}

function LocationModal(props: LocationModalProps) {
  const { data, onSubmit, onDelete, ...modalProps } = props;

  const formProps = useMemo(() => {
    return {
      defaultValues: getDefaultFormState(data),
      resolver: yupResolver(schema),
    };
  }, []);

  return (
    <Modal {...modalProps} position="right" formProps={formProps}>
      <LocationForm data={data} onSubmit={onSubmit} onDelete={onDelete} />
    </Modal>
  );
}

export default LocationModal;
