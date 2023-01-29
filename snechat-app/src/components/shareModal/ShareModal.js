import { Modal, useMantineTheme } from '@mantine/core';
import './ShareModal.css'
import PostShare from '../postSection/postShare/PostShare';

function ShareModal({shareModal,setShareModal}) {
  const theme = useMantineTheme();
  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='50%'
      opened={shareModal}
      onClose={()=>setShareModal(false)}  
    >
      <PostShare/>
    </Modal>
  );
}

export default ShareModal