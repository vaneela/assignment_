import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUser } from '../../actions/UserActions';
import { uploadImage } from '../../api/UploadRequest';
import './ProfileModal.css'

function ProfileModal({infoForm,setInfoForm,data}) {
  const theme = useMantineTheme();
  const {password,...other} = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const {user} = useSelector((state)=>state.AuthReducer.authData);

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleImageChange = (e)=>{
    if(e.target.files&&e.target.files[0]){
      let img = e.target.files[0];
      e.target.name === "profileImage" ? setProfileImage(img) : setCoverImage(img);
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    let userData = formData;
    if(profileImage){
      const data = new FormData();
      const filename = Date.now() + profileImage.name;
      data.append("name",filename);
      data.append("file",profileImage);
      userData.profileImage = filename;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    if(coverImage){
      const data = new FormData();
      const filename = Date.now() + coverImage.name;
      data.append("name",filename);
      data.append("file",coverImage);
      userData.coverImage = filename;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(updateUser(param.id,userData));
    setInfoForm(false);
  }

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='40%'
      opened={infoForm}
      onClose={()=>setInfoForm(false)}
      
    >
      <form className='infoForm'>
        <div style={{fontSize:'20px bolder'  }}>Your Info</div>
        <div>
          <input type='text' className='infoInput' name='firstname' value = {formData.firstname} placeholder='First Name'onChange={handleChange}></input>
          <input type='text' className='infoInput' name='lastname' value = {formData.lastname} placeholder='Last Name'onChange={handleChange}></input>
        </div>
        <div>
          <input type='text' className='infoInput' name='relationship' value = {formData.relationship} placeholder='relationship'onChange={handleChange}></input>
          <input type='text' className='infoInput' name='about' value = {formData.about} placeholder='About'onChange={handleChange}></input>
        </div>
        <div>
          <input type='text' className='infoInput' name='livesIn' value = {formData.livesIn} placeholder='Lives In'onChange={handleChange}></input>
          <input type='text' className='infoInput' name='worksAt' value = {formData.worksAt} placeholder='Works At'onChange={handleChange}></input>
        </div>
        <div>
          <label>Profile Image</label>
          <input type='file' className='infoInput' name='profileImage' onChange={handleImageChange}></input>
          <label>Cover Image</label>
          <input type='file' className='infoInput' name='coverImage' onChange={handleImageChange}></input>
        </div>
        <div className='infoForm-btns'>
          <button className='button save-btn' onClick={handleSubmit} >Save</button>
        </div>
      </form>
    </Modal>
  );
}

export default ProfileModal