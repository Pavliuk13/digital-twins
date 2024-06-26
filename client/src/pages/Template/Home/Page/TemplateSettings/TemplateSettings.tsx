import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useDispatch } from '@@store/index';
import { showModal } from '@@store/modals/slice';
import { useEditPermission } from '@@hooks/permissions/useEditPermission';

import { usePageContentContext } from '@@contexts/PageContentContext';

import CodeBlock from '@@features/CodeBlock';
import Typography from '@@components/ui/Typography';
import Image from '@@components/ui/Image';

import SettingsSvg from '@@assets/icons/settings.svg';

import { Hardware } from '@@types/hardware';
import { Template } from '@@types/template';
import { getHardwareSnippet } from '@@utils/hardware/getHardwareSnippet';

import { TemplateModalName } from '@@constants/modal';
import { ROUTES } from '@@constants/routes';

import styles from './TemplateSettings.module.scss';

function TemplateSettings() {
  const navigate = useNavigate();

  const { data, refetch } = usePageContentContext<Template>();

  const { createdBy } = data;

  const dispatch = useDispatch();

  const canEdit = useEditPermission(createdBy);

  const handleTemplateSettings = () => {
    dispatch(
      showModal(TemplateModalName, {
        data,
        onSubmit: refetch,
        onDelete: () => {
          navigate(ROUTES.TEMPLATES.INDEX);
        },
      }),
    );
  };

  const handleCopyCode = () => {
    toast.success('Sample code successfully copied');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <Typography variant="subheading2">Template settings</Typography>
          {data && (
            <>
              <Typography variant="bodyRegular" color="grey_200">
                {data?.connectionType}, {data?.hardware}
              </Typography>
              <Typography variant="note" color="grey_200">
                {data?.description}
              </Typography>
            </>
          )}
        </div>
        {canEdit && (
          <Image
            image={SettingsSvg}
            size={28}
            fill="grey_200"
            position="left_8"
            cursor="pointer"
            onClick={handleTemplateSettings}
          />
        )}
      </div>
      <div className={styles.divider} />
      <div className={styles.header}>
        <div>
          <Typography variant="subheading2">Firmware configuration</Typography>
          <Typography variant="bodyRegular" color="grey_200">
            Template ID and Template Name should be declared at the very top of
            the firmware code.
          </Typography>
        </div>
      </div>
      <CodeBlock
        customStyle={{
          maxHeight: '400px',
          overflow: 'auto',
          padding: '12px',
          borderRadius: '12px',
          marginTop: '12px',
        }}
        onCopy={handleCopyCode}
      >
        {getHardwareSnippet({ topic: `${Hardware[data?.hardware]}/deviceId` })}
      </CodeBlock>
    </div>
  );
}

export default memo(TemplateSettings);
