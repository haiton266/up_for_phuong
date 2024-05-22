import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { PostCreateProduct } from '../../../../../Services/ProductService';
import { PostCategory } from '../../../../../Services/CategoryServices';
import { toast } from 'react-toastify';
import { ShowCategory } from '../../../../../Services/CategoryServices';
function ModalAddNew(props) {
  const { show, handleClose } = props;
  const [name, set_name] = useState('');
  const [icon, set_icon] = useState('');
 



  const handleSaveUser = async () => {
    try {
      // if (typename !== 'men' && typename !== 'women') {
      //   toast.error('Typename must be "men" or "women"');
      //   return;
      // }

    

      const res = await PostCategory(name,icon);

      if (res && res.data) {
        handleClose();
        set_name('');
        set_icon('');
        toast.success('Create success');
      } else {
        toast.error('Error!');
      }
    } catch (error) {
      toast.error('Error!');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={name}
                onChange={(event) => set_name(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Icon</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter price"
                value={icon}
                onChange={(event) => set_icon(event.target.value)}
              />
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNew;