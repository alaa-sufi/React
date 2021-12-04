import React, { PureComponent } from 'react';
import { Modal, Button } from "react-bootstrap";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'

export default class cropImage extends PureComponent {
  state = {
    src: null,
    show :false,
    set : false,
    crop: {
      unit: '%',
      width: 300,
      aspect: this.props.aspect,
      circularCrop :true
    }, 
    
  };
        
        handleClose = () => {this.setState({    show: false  });this.setState({    set: true   }); this.props.imgSrc(this.state.croppedImageUrl);  }
   handleShow = () => {this.setState({    show: true  });}

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      this.setState({    show: true  })
      reader.addEventListener('load', () =>
      {
        this.setState({ src: reader.result });
        // this.props.func(this.state.src);
      }
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });

    }
  }

  
  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            //reject(new Error('Canvas is empty'));
            console.error('Canvas is empty');
            return;
          }
          blob.name = fileName;
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(blob);
          resolve(this.fileUrl);
        },
        'image/jpeg',
        1
      );
    });
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
      <div className="">
        <div>
      <label className="label w-100 " data-toggle="tooltip" title data-original-title="Change your avatar">
  <img className="circle  radius-2 w-100" id="avatar"  style={{borderRadius : this.props.type == "circle" ? '50%' : '1rem' , objectFit:"cover"}} width={this.props.cropWidth} height={this.props.cropHeight} src={this.state.set ?  croppedImageUrl :this.props.defaultImage} alt="avatar" />
  <input type="file" className="sr-only d-none" id="input" name="image" accept="image/*" onChange={this.onSelectFile} />
  <input type="hidden" id="base-64" name="base64" />
</label>

<Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header >
          <Modal.Title><h5 className="fw-bold">Crop the image</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body className={this.props.type == "circle" ? "circle" : " "}>
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        {/* {croppedImageUrl && (
          <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
        )} */}
        </Modal.Body>
        <Modal.Footer>
          <Button className="" onClick={this.handleClose}>
          Cancel
          </Button>
          <Button className="" onClick={this.handleClose}>
          Crop
          </Button>
        </Modal.Footer>
      </Modal>




        </div>
     
      </div>
    );
  }
}

